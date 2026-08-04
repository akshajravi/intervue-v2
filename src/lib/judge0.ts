// Client for the public Judge0 CE instance (ce.judge0.com).
//
// Extracted from `api/run/route.ts` so the starter validator
// (`scripts/validate-starters.ts`) submits through exactly the same call shape
// the app uses — a validator that talks to Judge0 differently is validating
// something the candidate will never run.
//
// This module knows about Judge0 and nothing else: no auth, no size caps, no
// truncation. Those are HTTP concerns and stay in the route.

const JUDGE0 = "https://ce.judge0.com";

export interface Judge0Language {
  id: number;
  name: string;
}

export interface Judge0Submission {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  exit_code: number | null;
  status: { id: number; description: string };
}

// Judge0's status ids. 3 is the only one that means "it ran and exited 0";
// anything above is a runtime error, timeout or sandbox notice.
export const JUDGE0_ACCEPTED = 3;

/** Thrown for a 429 so callers can back off rather than treat it as failure. */
export class Judge0RateLimitError extends Error {
  constructor() {
    super("Judge0 rate limit");
    this.name = "Judge0RateLimitError";
  }
}

/** Judge0 answered, but not with a submission — distinct from "unreachable". */
export class Judge0HttpError extends Error {
  constructor(readonly status: number) {
    super(`Judge0 returned ${status}`);
    this.name = "Judge0HttpError";
  }
}

// Language ids are resolved once per process; the promise doubles as an
// in-flight lock so concurrent runs don't fan out duplicate fetches.
let languagesPromise: Promise<Judge0Language[]> | null = null;

export async function resolveLanguageId(namePrefix: string): Promise<number> {
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
  const matches = (await languagesPromise).filter((l) => l.name.startsWith(namePrefix));
  if (matches.length === 0) {
    throw new Error(`No Judge0 language matches "${namePrefix}"`);
  }
  // Higher ids track newer versions within a language family.
  return Math.max(...matches.map((l) => l.id));
}

const b64encode = (text: string) => Buffer.from(text, "utf8").toString("base64");
export const b64decode = (text: string | null) =>
  text ? Buffer.from(text, "base64").toString("utf8") : "";

/**
 * Runs one submission synchronously. base64 keeps arbitrary program output
 * survivable; `wait=true` means no token polling.
 *
 * @throws {Judge0RateLimitError} on 429
 */
export async function submit(opts: {
  languageId: number;
  sourceCode: string;
  stdin?: string;
}): Promise<Judge0Submission> {
  const res = await fetch(
    `${JUDGE0}/submissions?base64_encoded=true&wait=true&fields=stdout,stderr,compile_output,message,exit_code,status`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: opts.languageId,
        source_code: b64encode(opts.sourceCode),
        stdin: opts.stdin ?? "",
      }),
    }
  );
  if (res.status === 429) throw new Judge0RateLimitError();
  if (!res.ok) throw new Judge0HttpError(res.status);
  return (await res.json()) as Judge0Submission;
}

/**
 * Folds Judge0's three failure channels into one stderr stream: compile errors
 * arrive in `compile_output`, and sandbox notices (time limit exceeded and
 * friends) only in `status.description`.
 */
export function collectStderr(submission: Judge0Submission): string {
  let text = b64decode(submission.stderr);
  const compileOutput = b64decode(submission.compile_output);
  if (compileOutput) {
    text = text ? `${compileOutput}\n${text}` : compileOutput;
  }
  if (!text && (submission.status?.id ?? 0) > JUDGE0_ACCEPTED) {
    text = submission.status.description;
  }
  return text;
}
