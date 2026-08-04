// Proxies code execution to the public Judge0 CE instance (ce.judge0.com).
// The roadmap originally called for Piston, but emkc.org went whitelist-only
// on 2026-02-15; Judge0 CE is the keyless replacement. It's still a shared
// sandbox — the client keeps Run single-flight, execution runs under Judge0's
// own CPU/wall-clock limits, and this route truncates oversized output.
//
// The Judge0 API itself lives in `src/lib/judge0.ts`, shared with the starter
// validator. What stays here is the HTTP contract: auth, size caps, truncation.

import { auth } from "@clerk/nextjs/server";
import type { RunRequest, RunResult } from "@/lib/api";
import { getLanguage, LANGUAGES } from "@/lib/languages";
import {
  b64decode,
  collectStderr,
  JUDGE0_ACCEPTED,
  Judge0HttpError,
  Judge0RateLimitError,
  resolveLanguageId,
  submit,
  type Judge0Submission,
} from "@/lib/judge0";

const MAX_CODE_BYTES = 100_000;
const MAX_OUTPUT_CHARS = 10_000;

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
  // Judge0 CE costs us nothing, but an open proxy onto a keyless public
  // sandbox abuses someone else's service. Gate it too.
  const { userId } = await auth();
  if (!userId) {
    return jsonError(401, "Your session expired. Sign in again to run code.");
  }

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
    submission = await submit({ languageId, sourceCode: body.code });
  } catch (err) {
    if (err instanceof Judge0RateLimitError) {
      return jsonError(429, "The code runner is busy. Wait a second and run again.");
    }
    if (err instanceof Judge0HttpError) {
      return jsonError(502, `The code runner returned an error (${err.status}).`);
    }
    return jsonError(502, "Could not reach the code runner. Check your connection and retry.");
  }

  const statusId = submission.status?.id ?? 0;
  const stdout = clip(b64decode(submission.stdout));
  const stderr = clip(collectStderr(submission));

  const result: RunResult = {
    stdout: stdout.text,
    stderr: stderr.text,
    exitCode: submission.exit_code ?? (statusId === JUDGE0_ACCEPTED ? 0 : null),
    truncated: stdout.truncated || stderr.truncated,
  };
  return Response.json(result);
}
