// Produces the end-of-interview report. Unlike /api/chat, latency matters
// less than quality here: thinking is on (adaptive) and the response is
// constrained to EVALUATION_SCHEMA via structured outputs so it always parses.

import Anthropic from "@anthropic-ai/sdk";
import { auth } from "@clerk/nextjs/server";
import type { ChatRequest } from "@/lib/api";
import { getLanguage } from "@/lib/languages";
import { getProblem } from "@/lib/problems";
import {
  buildEvaluationPrompt,
  EVALUATION_SCHEMA,
  formatCandidateContext,
  type Evaluation,
} from "@/lib/prompt";
import { checkLimit, evaluateLimit } from "@/lib/ratelimit";

const client = new Anthropic();

// Pinned rather than left to the platform default (currently 300s): thinking
// plus a long transcript is the one call here that can genuinely run minutes,
// and a future default change shouldn't silently truncate it.
export const maxDuration = 300;

// Mirrors the cap in /api/chat. This route is the expensive one — 16k tokens
// with thinking on — so an unbounded transcript is worth rejecting outright.
const MAX_TURNS = 200;

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request): Promise<Response> {
  // The most expensive call in the app — 16k tokens with thinking on. Gate
  // before parsing the body so an unauthenticated request costs us nothing.
  const { userId } = await auth();
  if (!userId) {
    return jsonError(401, "Your session expired. Sign in again to be evaluated.");
  }

  const limited = await checkLimit(evaluateLimit, userId, "evaluation");
  if (limited) return limited;

  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
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
    typeof body.code !== "string"
  ) {
    return jsonError(400, "Malformed evaluate request.");
  }

  const problem = getProblem(body.problemId);
  const language = getLanguage(body.language);

  // Close the transcript with a final user turn carrying the final code, so
  // the evaluator always grades what's actually in the editor.
  const messages: Anthropic.MessageParam[] = [
    ...body.messages.map((m) => ({ role: m.role, content: m.content })),
    {
      role: "user" as const,
      content:
        "(The candidate has ended the interview. Their final editor state follows.)" +
        formatCandidateContext(body.code, language, body.lastRun ?? null),
    },
  ];

  try {
    // Streamed server-side to dodge HTTP timeouts while thinking runs; the
    // client just gets the finished JSON.
    const stream = client.messages.stream({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system: buildEvaluationPrompt(problem, language),
      output_config: {
        format: {
          type: "json_schema",
          schema: EVALUATION_SCHEMA as unknown as Record<string, unknown>,
        },
      },
      messages,
    });
    const final = await stream.finalMessage();

    if (final.stop_reason === "refusal") {
      return jsonError(502, "The evaluator declined to grade this interview.");
    }
    const text = final.content.find((b) => b.type === "text")?.text;
    if (!text) {
      return jsonError(502, "The evaluator returned an empty report.");
    }
    const evaluation = JSON.parse(text) as Evaluation;
    return Response.json(evaluation);
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      return jsonError(
        500,
        "The server's ANTHROPIC_API_KEY is missing or invalid. Check .env.local."
      );
    }
    if (err instanceof Anthropic.RateLimitError) {
      return jsonError(429, "The evaluator is rate-limited. Try again shortly.");
    }
    if (err instanceof Anthropic.APIError) {
      return jsonError(502, `Evaluation failed: ${err.message}`);
    }
    return jsonError(500, "Evaluation failed unexpectedly. Try again.");
  }
}
