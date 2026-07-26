// Request/response contracts shared by the client pages and the API routes,
// so the two sides of each fetch can't drift apart.

import type { LanguageId } from "./languages";

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
