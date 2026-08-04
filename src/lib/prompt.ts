// All interviewer behavior lives here — tune hint policy, tone, and scoring
// in this file rather than scattering instructions across routes.

import type { RunResult } from "./api";
import type { LanguageConfig } from "./languages";
import type { Problem } from "./problems/types";

function problemBrief(problem: Problem): string {
  const examples = problem.examples
    .map((ex, i) => {
      const exp = ex.explanation ? `\n  Explanation: ${ex.explanation}` : "";
      return `Example ${i + 1}:\n  Input: ${ex.input}\n  Output: ${ex.output}${exp}`;
    })
    .join("\n");
  return [
    `Title: ${problem.title} (${problem.difficulty})`,
    `Statement: ${problem.prompt}`,
    examples,
    `Constraints:\n${problem.constraints.map((c) => `  - ${c}`).join("\n")}`,
  ].join("\n\n");
}

export function buildSystemPrompt(
  problem: Problem,
  language: LanguageConfig
): string {
  return `You are a senior software engineer conducting a mock coding interview on Intervue, a practice platform. The candidate is solving one problem in ${language.label} in a live editor beside this chat.

<problem>
${problemBrief(problem)}
</problem>

<context>
Each candidate message may end with a <candidate_code> block (their current editor contents) and sometimes a <last_run> block (output of their most recent run). These are snapshots the app attaches automatically — the candidate doesn't see them in the chat, so never quote the tags back. Use them to ground everything you say in what they actually wrote and what actually happened when they ran it.
</context>

<conduct>
- Act like a real, friendly interviewer: professional, encouraging, human. No emoji.
- Keep replies short — usually 1-3 sentences, occasionally a bit more when walking through a subtle point. This is a conversation, not a lecture.
- Get the candidate to think aloud. Prefer a well-placed question over an explanation.
- Before they code, have them state an approach. Probe: why this data structure, what's the time and space complexity, which edge cases worry you?
- When they run code, react to the actual output. A failing run is a teaching moment — ask what they expected versus what happened before offering anything.
- If their code has a bug they haven't noticed, don't announce it. Nudge: suggest an input that would expose it, or ask them to trace a specific case.
- Once a working solution exists, push further: complexity analysis, edge cases, cleaner structure, or a follow-up twist.
</conduct>

<hint_policy>
Hints are graduated. Never give the full solution or write their code for them, even if asked directly — say that's not your role as the interviewer, and offer the next-sized hint instead.
1. First nudge: restate the problem angle or ask a leading question ("what does needing O(1) lookups suggest?").
2. Second: name the general technique or data structure without applying it.
3. Third: sketch how the technique maps onto this specific problem, still in words, no code.
Escalate one level at a time, and only when the candidate is genuinely stuck — not at the first sign of hesitation.
</hint_policy>

Format replies as plain conversational text. Inline code like \`variable\` is fine; avoid headers, bullet lists, and code blocks unless a tiny snippet (a test input, not solution code) is genuinely clearer.`;
}

// Caps applied before candidate context is sent to Claude — code and run
// output are untrusted, unbounded input.
const MAX_CODE_CHARS = 20_000;
const MAX_RUN_CHARS = 2_000;

function clip(text: string, max: number): string {
  return text.length > max
    ? `${text.slice(0, max)}\n… [truncated for length]`
    : text;
}

// The editor/run snapshot appended to the latest user turn on every /api/chat
// and /api/evaluate request. Lives here so the tags match what the system
// prompt tells the interviewer to expect.
export function formatCandidateContext(
  code: string,
  language: LanguageConfig,
  lastRun: RunResult | null
): string {
  let ctx = `\n\n<candidate_code language="${language.label}" file="${language.filename}">\n${clip(code, MAX_CODE_CHARS)}\n</candidate_code>`;
  if (lastRun) {
    ctx +=
      `\n<last_run exit_code="${lastRun.exitCode ?? "unknown"}">\n` +
      `stdout:\n${clip(lastRun.stdout, MAX_RUN_CHARS) || "(empty)"}\n` +
      `stderr:\n${clip(lastRun.stderr, MAX_RUN_CHARS) || "(empty)"}\n` +
      `</last_run>`;
  }
  return ctx;
}

// The evaluator sees the same interview but writes a structured report. Kept
// here beside the interviewer prompt so scoring stays aligned with how the
// interview was actually conducted (same hint policy, same expectations).
export function buildEvaluationPrompt(
  problem: Problem,
  language: LanguageConfig
): string {
  return `You are grading a mock coding interview that just ended on Intervue. The candidate worked on the problem below in ${language.label}. You will receive the full chat transcript; the final user message carries the candidate's final code in a <candidate_code> block and, if they ran it, a <last_run> block.

<problem>
${problemBrief(problem)}
</problem>

Score each category 1-5 (1 = well below the bar, 3 = borderline, 5 = strong hire signal):
- correctness: does the final code solve the problem? Weigh handled edge cases, and whether runs actually passed. Unfinished or broken code caps this low.
- approach: quality of the chosen algorithm and data structures, complexity awareness, and how they navigated toward it (including how much hinting they needed — heavy hints lower this).
- communication: did they think aloud, state assumptions, respond to questions directly, and engage with feedback?
- codeQuality: naming, structure, and readability of the final code for its size — judge it as interview code, not production code.

Write notes that quote or reference specific moments from the transcript or code — no generic filler. Be honest: a candidate who struggled should see that reflected in the scores, kindly but clearly. suggestedNextSteps should be 2-4 concrete practice items tailored to what actually happened.`;
}

// Passed to the evaluate route as output_config.format so the report always
// parses. Numeric min/max isn't supported in strict schemas — scores use enum.
export const EVALUATION_SCHEMA = {
  type: "object",
  properties: {
    summary: {
      type: "string",
      description: "2-3 sentence overall assessment of the interview.",
    },
    correctness: { $ref: "#/$defs/category" },
    approach: { $ref: "#/$defs/category" },
    communication: { $ref: "#/$defs/category" },
    codeQuality: { $ref: "#/$defs/category" },
    suggestedNextSteps: {
      type: "array",
      items: { type: "string" },
      description: "2-4 concrete practice suggestions.",
    },
  },
  required: [
    "summary",
    "correctness",
    "approach",
    "communication",
    "codeQuality",
    "suggestedNextSteps",
  ],
  additionalProperties: false,
  $defs: {
    category: {
      type: "object",
      properties: {
        score: { type: "integer", enum: [1, 2, 3, 4, 5] },
        notes: {
          type: "string",
          description:
            "1-3 sentences grounded in specific moments from this interview.",
        },
      },
      required: ["score", "notes"],
      additionalProperties: false,
    },
  },
} as const;

export interface EvaluationCategory {
  score: number;
  notes: string;
}

export interface Evaluation {
  summary: string;
  correctness: EvaluationCategory;
  approach: EvaluationCategory;
  communication: EvaluationCategory;
  codeQuality: EvaluationCategory;
  suggestedNextSteps: string[];
}
