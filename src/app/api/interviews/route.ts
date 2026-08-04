// Persists one finished interview. Called by the client right after a
// successful /api/evaluate, so the payload is the evaluate request plus the
// report it produced.
//
// There is no GET here on purpose: /history reads the database directly from
// server components, which skips an HTTP hop and a second auth check.

import { auth } from "@clerk/nextjs/server";
import type { SaveInterviewRequest, SaveInterviewResponse } from "@/lib/api";
import { db } from "@/db";
import { interviews } from "@/db/schema";
import { getLanguage, LANGUAGES } from "@/lib/languages";
import { getProblem } from "@/lib/problems";

// Mirrors the caps on /api/chat and /api/evaluate.
const MAX_TURNS = 200;
// Vercel rejects request bodies over 4.5 MB outright; this cuts in first so an
// oversized transcript gets a readable message instead of a platform error.
const MAX_PAYLOAD_BYTES = 1_000_000;

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

// Postgres rejects NUL bytes in both text and jsonb. Monaco will happily hold
// one that was pasted in, and the insert would then fail with 22021 — which
// reads to the candidate as "saving is broken".
const stripNul = (text: string) => text.replace(/\0/g, "");

function isEvaluationShaped(value: unknown): boolean {
  if (typeof value !== "object" || value === null) return false;
  const e = value as Record<string, unknown>;
  const category = (v: unknown) =>
    typeof v === "object" &&
    v !== null &&
    typeof (v as Record<string, unknown>).score === "number" &&
    typeof (v as Record<string, unknown>).notes === "string";
  return (
    typeof e.summary === "string" &&
    category(e.correctness) &&
    category(e.approach) &&
    category(e.communication) &&
    category(e.codeQuality) &&
    Array.isArray(e.suggestedNextSteps) &&
    e.suggestedNextSteps.every((s) => typeof s === "string")
  );
}

export async function POST(req: Request): Promise<Response> {
  const { userId } = await auth();
  if (!userId) {
    return jsonError(401, "Your session expired. Sign in again to save this report.");
  }

  const raw = await req.text();
  if (raw.length > MAX_PAYLOAD_BYTES) {
    return jsonError(413, "This interview is too large to save.");
  }

  let body: SaveInterviewRequest;
  try {
    body = JSON.parse(raw) as SaveInterviewRequest;
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  if (
    !Array.isArray(body.messages) ||
    body.messages.length > MAX_TURNS ||
    body.messages.some(
      (m) =>
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string"
    ) ||
    typeof body.code !== "string" ||
    !(body.language in LANGUAGES) ||
    !isEvaluationShaped(body.evaluation)
  ) {
    return jsonError(400, "Malformed save request.");
  }

  // Resolved server-side rather than taken from the client: the title and
  // difficulty are what /history renders, so they must not be attacker-set.
  const problem = getProblem(body.problemId);
  const language = getLanguage(body.language);

  try {
    const [row] = await db
      .insert(interviews)
      .values({
        userId,
        problemId: problem.id,
        problemTitle: problem.title,
        difficulty: problem.difficulty,
        language: language.id,
        transcript: body.messages.map(({ role, content }) => ({
          role,
          content: stripNul(content),
        })),
        code: stripNul(body.code),
        evaluation: body.evaluation,
        lastRun: body.lastRun ?? null,
      })
      .returning({ id: interviews.id });

    return Response.json({ id: row.id } satisfies SaveInterviewResponse);
  } catch {
    return jsonError(500, "Could not save this interview. Try again.");
  }
}
