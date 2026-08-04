// Request/response contracts shared by the client pages and the API routes,
// so the two sides of each fetch can't drift apart.

import type { LanguageId } from "./languages";
import type { Evaluation } from "./prompt";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Sent to /api/chat and /api/evaluate. The server appends the code snapshot
// (and last run output, if any) to the latest user turn — see lib/prompt.ts.
export interface ChatRequest {
  messages: ChatMessage[];
  problemId: string;
  language: LanguageId;
  code: string;
  lastRun: RunResult | null;
}

// Sent to /api/interviews once an evaluation comes back. It extends ChatRequest
// so the client can reuse the very payload it just posted to /api/evaluate,
// plus the report that came back. problemTitle/difficulty are deliberately
// absent — the server resolves those itself rather than trusting display text.
export interface SaveInterviewRequest extends ChatRequest {
  evaluation: Evaluation;
}

export interface SaveInterviewResponse {
  id: string;
}

export interface RunRequest {
  language: LanguageId;
  code: string;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  // True when stdout/stderr were cut down to size server-side.
  truncated: boolean;
}
