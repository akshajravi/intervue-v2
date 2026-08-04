/**
 * Validates the problem bank and regenerates its derived files.
 *
 *   npm run validate:starters                  # everything, live Judge0 checks
 *   npm run validate:starters -- --write       # also rewrite catalog/index/load
 *   npm run validate:starters -- -p two-sum    # one problem (repeatable)
 *   npm run validate:starters -- -l java       # one language (repeatable)
 *   npm run validate:starters -- --static      # skip Judge0 entirely
 *   npm run validate:starters -- --force       # ignore the pass cache
 *
 * Why this exists: 75 problems x 5 languages is 375 starter programs, each of
 * which has to compile *and run* on Judge0. The traps are not obvious ones —
 * Java needs `public class Main`, and C++ under <bits/stdc++.h> collides with
 * names like std::merge. Finding those by hand doesn't scale past a few
 * problems.
 *
 * "Passing" means Judge0 returns Accepted (status 3): the example driver
 * compiled, ran, and exited 0. That is stronger than a compile check and is
 * exactly the promise the bank makes — hitting Run on an untouched editor
 * produces output instead of silence.
 */

import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { LANGUAGES, LANGUAGE_LIST, type LanguageId } from "../src/lib/languages";
import {
  JUDGE0_ACCEPTED,
  Judge0RateLimitError,
  b64decode,
  collectStderr,
  resolveLanguageId,
  submit,
} from "../src/lib/judge0";
import {
  DEFAULT_PROBLEM_ID,
  TOPICS,
  type Difficulty,
  type Problem,
} from "../src/lib/problems/types";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const ITEMS_DIR = join(ROOT, "src/lib/problems/items");
const CATALOG_FILE = join(ROOT, "src/lib/problems/catalog.ts");
const INDEX_FILE = join(ROOT, "src/lib/problems/index.ts");
const LOAD_FILE = join(ROOT, "src/lib/problems/load.ts");
const CACHE_FILE = join(ROOT, ".judge0-cache.json");

// interviews.problem_id is varchar(64) (src/db/schema.ts). Catch an over-long
// slug here rather than as a failed insert after a candidate's interview.
const MAX_ID_LENGTH = 64;
// ce.judge0.com is public, keyless and shared. One submission at a time with a
// gap, and back off hard on 429 — the validator must not be the reason the app
// gets throttled.
const SUBMIT_GAP_MS = 1500;
const RATE_LIMIT_BACKOFF_MS = 20_000;
const MAX_ATTEMPTS = 4;

const DIFFICULTY_ORDER: Difficulty[] = ["Easy", "Medium", "Hard"];

// ---------------------------------------------------------------- arguments

interface Args {
  write: boolean;
  staticOnly: boolean;
  force: boolean;
  problems: Set<string>;
  languages: Set<LanguageId>;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    write: false,
    staticOnly: false,
    force: false,
    problems: new Set(),
    languages: new Set(),
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--write" || arg === "-w") args.write = true;
    else if (arg === "--static" || arg === "-s") args.staticOnly = true;
    else if (arg === "--force" || arg === "-f") args.force = true;
    else if (arg === "--problem" || arg === "-p") args.problems.add(argv[++i]);
    else if (arg === "--language" || arg === "-l") {
      const id = argv[++i];
      if (!(id in LANGUAGES)) fail(`Unknown language "${id}"`);
      args.languages.add(id as LanguageId);
    } else fail(`Unknown argument "${arg}"`);
  }
  return args;
}

function fail(message: string): never {
  console.error(`\n  ${red("error")} ${message}\n`);
  process.exit(1);
}

// ------------------------------------------------------------------ loading

interface Item {
  file: string;
  slug: string;
  problem: Problem;
}

async function loadItems(): Promise<Item[]> {
  const files = (await readdir(ITEMS_DIR)).filter((f) => f.endsWith(".ts")).sort();
  const items: Item[] = [];
  for (const file of files) {
    const mod = (await import(pathToFileURL(join(ITEMS_DIR, file)).href)) as {
      default?: Problem;
    };
    if (!mod.default) fail(`${file} has no default export`);
    items.push({ file, slug: file.replace(/\.ts$/, ""), problem: mod.default });
  }
  return items;
}

/**
 * The order problems appear in the generated files: topic, then difficulty,
 * then title. Deterministic so the generator's output is diffable and a new
 * problem doesn't reshuffle the rest.
 */
function sortItems(items: Item[]): Item[] {
  return [...items].sort((a, b) => {
    const t = TOPICS.indexOf(a.problem.topic) - TOPICS.indexOf(b.problem.topic);
    if (t !== 0) return t;
    const d =
      DIFFICULTY_ORDER.indexOf(a.problem.difficulty) -
      DIFFICULTY_ORDER.indexOf(b.problem.difficulty);
    if (d !== 0) return d;
    return a.problem.title.localeCompare(b.problem.title);
  });
}

// ------------------------------------------------------------ static checks

function staticCheck(items: Item[]): string[] {
  const problems: string[] = [];
  const seen = new Map<string, string>();

  for (const { file, slug, problem: p } of items) {
    const where = `items/${file}`;
    if (p.id !== slug) problems.push(`${where}: id "${p.id}" doesn't match the filename`);
    if (p.id.length > MAX_ID_LENGTH) {
      problems.push(
        `${where}: id is ${p.id.length} chars; interviews.problem_id is varchar(${MAX_ID_LENGTH})`
      );
    }
    if (!/^[a-z0-9-]+$/.test(p.id)) problems.push(`${where}: id must be a lowercase slug`);
    const prior = seen.get(p.id);
    if (prior) problems.push(`${where}: duplicate id, also in ${prior}`);
    seen.set(p.id, where);

    if (!p.title.trim()) problems.push(`${where}: empty title`);
    if (!p.summary.trim()) problems.push(`${where}: empty summary`);
    if (!p.prompt.trim()) problems.push(`${where}: empty prompt`);
    if (p.examples.length < 1) problems.push(`${where}: needs at least one example`);
    if (p.constraints.length < 1) problems.push(`${where}: needs at least one constraint`);

    for (const lang of LANGUAGE_LIST) {
      const src = p.starters[lang.id];
      if (!src || !src.trim()) {
        problems.push(`${where}: missing ${lang.id} starter`);
        continue;
      }
      // Judge0 compiles Java as Main.java (see languages.ts's `filename`), so
      // anything else is an immediate compile error.
      if (lang.id === "java" && !src.includes("public class Main")) {
        problems.push(`${where}: java starter must declare \`public class Main\``);
      }
    }
  }

  if (!items.some((i) => i.problem.id === DEFAULT_PROBLEM_ID)) {
    problems.push(
      `DEFAULT_PROBLEM_ID is "${DEFAULT_PROBLEM_ID}" but items/ has no such problem`
    );
  }
  return problems;
}

// -------------------------------------------------------------- generation

const q = (s: string) => JSON.stringify(s);

/** `two-sum` -> `twoSum`, with a prefix if the slug would start with a digit. */
function identifier(slug: string): string {
  const camel = slug.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());
  return /^[0-9]/.test(camel) ? `p${camel[0].toUpperCase()}${camel.slice(1)}` : camel;
}

const CATALOG_HEADER = `// GENERATED FILE — do not hand-edit.
// Rewritten by \`npm run validate:starters -- --write\`, which also fails the
// run when this file has drifted from \`items/\`.
//
// The picker needs id/title/difficulty/topic/summary and nothing else. Keeping
// that in its own literal is what lets /start list every problem without the
// prompts and 5 starters apiece riding along in the client bundle.

import type { ProblemMeta } from "./types";

export const PROBLEM_CATALOG: ProblemMeta[] = [
`;

const CATALOG_FOOTER = `];

const BY_ID = new Map(PROBLEM_CATALOG.map((p) => [p.id, p]));

export function getProblemMeta(id: string | null | undefined): ProblemMeta | undefined {
  return id ? BY_ID.get(id) : undefined;
}
`;

function renderCatalog(items: Item[]): string {
  const entries = items
    .map(({ problem: p }) =>
      [
        "  {",
        `    id: ${q(p.id)},`,
        `    title: ${q(p.title)},`,
        `    difficulty: ${q(p.difficulty)},`,
        `    topic: ${q(p.topic)},`,
        `    summary: ${q(p.summary)},`,
        "  },",
      ].join("\n")
    )
    .join("\n");
  return `${CATALOG_HEADER}${entries}\n${CATALOG_FOOTER}`;
}

/**
 * Replaces the body between `// --- generated:<name> ---` markers, leaving the
 * hand-written parts of the file alone.
 */
function replaceBlock(source: string, name: string, body: string): string {
  const open = `// --- generated:${name} ---`;
  const close = `// --- /generated:${name} ---`;
  const start = source.indexOf(open);
  const end = source.indexOf(close);
  if (start === -1 || end === -1) fail(`Missing "${name}" generated block`);
  // Keep whatever indentation the closing marker already had — these blocks
  // sit inside array and object literals, and rewriting it to column 0 makes
  // the generator fight the formatter forever.
  const closeIndent = source.slice(source.lastIndexOf("\n", end) + 1, end);
  return `${source.slice(0, start + open.length)}\n${body}\n${closeIndent}${source.slice(end)}`;
}

function renderIndex(source: string, items: Item[]): string {
  const imports = [...items]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(({ slug }) => `import ${identifier(slug)} from "./items/${slug}";`)
    .join("\n");
  const list = items.map(({ slug }) => `  ${identifier(slug)},`).join("\n");
  return replaceBlock(replaceBlock(source, "imports", imports), "list", list);
}

function renderLoad(source: string, items: Item[]): string {
  const loaders = [...items]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map(({ slug }) => `  ${q(slug)}: () => import("./items/${slug}"),`)
    .join("\n");
  return replaceBlock(source, "loaders", loaders);
}

// ------------------------------------------------------------- judge0 pass

type Cache = Record<string, true>;

function loadCache(): Cache {
  if (!existsSync(CACHE_FILE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_FILE, "utf8")) as Cache;
  } catch {
    return {};
  }
}

const cacheKey = (id: string, lang: LanguageId, source: string) =>
  `${id}:${lang}:${createHash("sha256").update(source).digest("hex").slice(0, 16)}`;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface RunOutcome {
  ok: boolean;
  detail: string;
  emptyStdout: boolean;
}

async function runStarter(languageId: number, source: string): Promise<RunOutcome> {
  for (let attempt = 1; ; attempt++) {
    try {
      const submission = await submit({ languageId, sourceCode: source });
      const statusId = submission.status?.id ?? 0;
      const stdout = b64decode(submission.stdout);
      if (statusId === JUDGE0_ACCEPTED) {
        return { ok: true, detail: "", emptyStdout: stdout.length === 0 };
      }
      const stderr = collectStderr(submission).trim();
      return {
        ok: false,
        detail: `${submission.status?.description ?? "unknown status"}${
          stderr ? `\n${indent(stderr)}` : ""
        }`,
        emptyStdout: stdout.length === 0,
      };
    } catch (err) {
      if (attempt >= MAX_ATTEMPTS) {
        return { ok: false, detail: `judge0 unreachable: ${String(err)}`, emptyStdout: false };
      }
      const wait =
        err instanceof Judge0RateLimitError ? RATE_LIMIT_BACKOFF_MS * attempt : 2000 * attempt;
      console.log(`      rate limited / errored, retrying in ${wait / 1000}s…`);
      await sleep(wait);
    }
  }
}

const indent = (text: string) =>
  text
    .split("\n")
    .slice(0, 12)
    .map((l) => `      ${l}`)
    .join("\n");

// ---------------------------------------------------------------- reporting

const useColor = process.stdout.isTTY;
const paint = (code: string) => (s: string) => (useColor ? `[${code}m${s}[0m` : s);
const red = paint("31");
const green = paint("32");
const yellow = paint("33");
const dim = paint("2");

// --------------------------------------------------------------------- main

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const allItems = await loadItems();
  if (allItems.length === 0) fail("No problems found in src/lib/problems/items");

  console.log(`\n  ${allItems.length} problems in the bank\n`);

  // 1. Static checks — cheap, and they run over the whole bank regardless of
  //    any --problem filter, because generation below depends on all of it.
  const staticProblems = staticCheck(allItems);
  if (staticProblems.length > 0) {
    console.error(`  ${red("static checks failed")}`);
    for (const p of staticProblems) console.error(`    - ${p}`);
    process.exit(1);
  }
  console.log(`  ${green("✓")} static checks`);

  // 2. Generated files. Regenerating and diffing is what keeps catalog.ts
  //    honest about items/ — the picker reads the catalog, not the bank.
  const sorted = sortItems(allItems);
  const targets: { file: string; label: string; next: string }[] = [];
  targets.push({ file: CATALOG_FILE, label: "catalog.ts", next: renderCatalog(sorted) });
  const indexNow = await readFile(INDEX_FILE, "utf8");
  targets.push({ file: INDEX_FILE, label: "index.ts", next: renderIndex(indexNow, sorted) });
  const loadNow = await readFile(LOAD_FILE, "utf8");
  targets.push({ file: LOAD_FILE, label: "load.ts", next: renderLoad(loadNow, sorted) });

  const stale: string[] = [];
  for (const t of targets) {
    const current = await readFile(t.file, "utf8").catch(() => "");
    if (current === t.next) continue;
    if (args.write) {
      await writeFile(t.file, t.next, "utf8");
      console.log(`  ${green("✓")} wrote ${t.label}`);
    } else {
      stale.push(t.label);
    }
  }
  if (stale.length > 0) {
    console.error(
      `\n  ${red("out of date")}: ${stale.join(", ")} — rerun with --write\n`
    );
    process.exit(1);
  }
  if (!args.write) console.log(`  ${green("✓")} generated files up to date`);

  if (args.staticOnly) {
    console.log(`\n  ${dim("--static: skipped Judge0")}\n`);
    return;
  }

  // 3. Live Judge0 checks.
  const items = args.problems.size
    ? sorted.filter((i) => args.problems.has(i.problem.id))
    : sorted;
  if (args.problems.size && items.length !== args.problems.size) {
    const found = new Set(items.map((i) => i.problem.id));
    fail(`No such problem: ${[...args.problems].filter((p) => !found.has(p)).join(", ")}`);
  }
  const languages = LANGUAGE_LIST.filter(
    (l) => args.languages.size === 0 || args.languages.has(l.id)
  );

  const cache = args.force ? {} : loadCache();
  const languageIds = new Map<LanguageId, number>();
  for (const lang of languages) {
    languageIds.set(lang.id, await resolveLanguageId(lang.judge0));
  }

  const failures: string[] = [];
  const warnings: string[] = [];
  let checked = 0;
  let skipped = 0;

  for (const { problem: p } of items) {
    const pending = languages.filter(
      (l) => !cache[cacheKey(p.id, l.id, p.starters[l.id])]
    );
    skipped += languages.length - pending.length;
    if (pending.length === 0) continue;

    console.log(`\n  ${p.title} ${dim(`(${p.id})`)}`);
    for (const lang of pending) {
      const source = p.starters[lang.id];
      process.stdout.write(`    ${lang.label.padEnd(11)}`);
      const outcome = await runStarter(languageIds.get(lang.id)!, source);
      checked++;
      if (outcome.ok) {
        console.log(green("accepted"));
        cache[cacheKey(p.id, lang.id, source)] = true;
        // Not a failure: an empty-result stub can legitimately print just a
        // newline. Truly zero bytes means the driver never printed.
        if (outcome.emptyStdout) {
          warnings.push(`${p.id} / ${lang.id}: ran but printed nothing`);
        }
      } else {
        console.log(red("FAILED"));
        console.log(indent(outcome.detail));
        failures.push(`${p.id} / ${lang.id}`);
      }
      await writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
      await sleep(SUBMIT_GAP_MS);
    }
  }

  console.log(
    `\n  ${checked} submitted, ${skipped} cached, ${failures.length} failed\n`
  );
  for (const w of warnings) console.log(`  ${yellow("warn")} ${w}`);
  if (failures.length > 0) {
    console.error(`  ${red("failing starters")}: ${failures.join(", ")}\n`);
    process.exit(1);
  }
  console.log(`  ${green("✓")} every starter compiles and runs\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
