// Produces the end-of-interview report. Unlike /api/chat, latency matters
// less than quality here: thinking is on (adaptive) and the response is
// constrained to EVALUATION_SCHEMA via structured outputs so it always parses.

import Anthropic from "@anthropic-ai/sdk";
import type { ChatRequest } from "@/lib/api";
import { getLanguage } from "@/lib/languages";
import { getProblem } from "@/lib/problems";
import {
  buildEvaluationPrompt,
  EVALUATION_SCHEMA,
  formatCandidateContext,
  type Evaluation,
} from "@/lib/prompt";

const client = new Anthropic();

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

export async function POST(req: Request): Promise<Response> {
  let body: ChatRequest;
  try {
    body = (await req.json()) as ChatRequest;
  } catch {
    return jsonError(400, "Invalid JSON body.");
  }

  if (
    !Array.isArray(body.messages) ||
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
