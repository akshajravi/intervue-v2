// Proxies code execution to the public Judge0 CE instance (ce.judge0.com).
// The roadmap originally called for Piston, but emkc.org went whitelist-only
// on 2026-02-15; Judge0 CE is the keyless replacement. It's still a shared
// sandbox — the client keeps Run single-flight, execution runs under Judge0's
// own CPU/wall-clock limits, and this route truncates oversized output.

import type { RunRequest, RunResult } from "@/lib/api";
import { getLanguage, LANGUAGES } from "@/lib/languages";

const JUDGE0 = "https://ce.judge0.com";
const MAX_CODE_BYTES = 100_000;
const MAX_OUTPUT_CHARS = 10_000;

interface Judge0Language {
  id: number;
  name: string;
}

interface Judge0Submission {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  exit_code: number | null;
  status: { id: number; description: string };
}

// Language ids are resolved once per server process; the promise doubles as
// an in-flight lock so concurrent runs don't fan out duplicate fetches.
let languagesPromise: Promise<Judge0Language[]> | null = null;

async function resolveLanguageId(namePrefix: string): Promise<number> {
  if (!languagesPromise) {
    languagesPromise = fetch(`${JUDGE0}/languages`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Judge0 languages request failed (${res.status})`);
        return (await res.json()) as Judge0Language[];
      })
      .catch((err) => {
        // Don't cache a failure — allow the next run to retry.
        languagesPromise = null;
        throw err;
      });
  }
  const matches = (await languagesPromise).filter((l) =>
    l.name.startsWith(namePrefix)
  );
  if (matches.length === 0) {
    throw new Error(`No Judge0 language matches "${namePrefix}"`);
  }
  // Higher ids track newer versions within a language family.
  return Math.max(...matches.map((l) => l.id));
}

const b64encode = (text: string) => Buffer.from(text, "utf8").toString("base64");
const b64decode = (text: string | null) =>
  text ? Buffer.from(text, "base64").toString("utf8") : "";

function clip(text: string): { text: string; truncated: boolean } {
  if (text.length <= MAX_OUTPUT_CHARS) return { text, truncated: false };
  return {
    text: `${text.slice(0, MAX_OUTPUT_CHARS)}\n… [output truncated]`,
    truncated: true,
  };
}

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let body: RunRequest;
  try {
    body = (await req.json()) as RunRequest;
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  if (typeof body.code !== "string" || !(body.language in LANGUAGES)) {
    return jsonError(400, "Malformed run request.");
  }
  if (body.code.length > MAX_CODE_BYTES) {
    return jsonError(413, "Code is too large to run.");
  }

  const language = getLanguage(body.language);

  let submission: Judge0Submission;
  try {
    const languageId = await resolveLanguageId(language.judge0);
    // base64 keeps arbitrary program output survivable; wait=true makes the
    // call synchronous so no token polling is needed.
    const res = await fetch(
      `${JUDGE0}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,message,exit_code,status`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id: languageId,
          source_code: b64encode(body.code),
          stdin: "",
        }),
      }
    );
    if (res.status === 429) {
      return jsonError(429, "The code runner is busy. Wait a second and run again.");
    }
    if (!res.ok) {
      return jsonError(502, `The code runner returned an error (${res.status}).`);
    }
    submission = (await res.json()) as Judge0Submission;
  } catch {
    return jsonError(502, "Could not reach the code runner. Check your connection and retry.");
  }

  const statusId = submission.status?.id ?? 0;
  const stdout = clip(b64decode(submission.stdout));
  // Compile errors and sandbox notices (e.g. time limit exceeded) surface in
  // dedicated fields — fold them into stderr so the console shows one stream.
  let stderrText = b64decode(submission.stderr);
  const compileOutput = b64decode(submission.compile_output);
  if (compileOutput) {
    stderrText = stderrText ? `${compileOutput}\n${stderrText}` : compileOutput;
  }
  if (!stderrText && statusId > 3) {
    stderrText = submission.status.description;
  }
  const stderr = clip(stderrText);

  const result: RunResult = {
    stdout: stdout.text,
    stderr: stderr.text,
    exitCode: submission.exit_code ?? (statusId === 3 ? 0 : null),
    truncated: stdout.truncated || stderr.truncated,
  };
  return Response.json(result);
}
