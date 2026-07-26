// Streams the interviewer's reply as plain text. The client sends the full
// transcript plus a snapshot of the editor (and last run); we append that
// snapshot to the latest user turn so the model always sees current code.

import Anthropic from "@anthropic-ai/sdk";
import type { ChatRequest } from "@/lib/api";
import { getLanguage } from "@/lib/languages";
import { getProblem } from "@/lib/problems";
import { buildSystemPrompt, formatCandidateContext } from "@/lib/prompt";

const client = new Anthropic();

const MAX_TURNS = 200;

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status });
}

function mapApiError(err: unknown): Response {
  if (err instanceof Anthropic.AuthenticationError) {
    return jsonError(
      500,
      "The server's ANTHROPIC_API_KEY is missing or invalid. Check .env.local."
    );
  }
  if (err instanceof Anthropic.RateLimitError) {
    return jsonError(429, "The interviewer is rate-limited. Wait a moment and try again.");
  }
  if (err instanceof Anthropic.APIError) {
    return jsonError(502, `Interviewer request failed: ${err.message}`);
  }
  return jsonError(500, "The interviewer is unreachable right now. Try again.");
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
    body.messages.length === 0 ||
    body.messages.length > MAX_TURNS ||
    body.messages.some(
      (m) =>
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string"
    ) ||
    body.messages[0].role !== "user" ||
    typeof body.code !== "string"
  ) {
    return jsonError(400, "Malformed chat request.");
  }

  const problem = getProblem(body.problemId);
  const language = getLanguage(body.language);

  const messages: Anthropic.MessageParam[] = body.messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // Attach the editor snapshot to the latest user turn.
  const context = formatCandidateContext(body.code, language, body.lastRun ?? null);
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") {
      messages[i] = { role: "user", content: messages[i].content + context };
      break;
    }
  }

  // Thinking stays off for chat latency (omitted = off on Opus 4.8); the
  // end-of-interview evaluation is where deeper reasoning is enabled.
  const stream = client.messages.stream({
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: buildSystemPrompt(problem, language),
    messages,
  });

  // Pull the first event before committing to a 200, so auth/validation
  // failures surface as a proper error status instead of an empty stream.
  const iterator = stream[Symbol.asyncIterator]();
  let first: IteratorResult<Anthropic.MessageStreamEvent>;
  try {
    first = await iterator.next();
  } catch (err) {
    return mapApiError(err);
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (result: IteratorResult<Anthropic.MessageStreamEvent>) => {
        if (result.done) return;
        const event = result.value;
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(event.delta.text));
        }
      };
      try {
        push(first);
        let result = await iterator.next();
        while (!result.done) {
          push(result);
          result = await iterator.next();
        }
        controller.close();
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
