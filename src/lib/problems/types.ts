// Shape of a problem in the bank. Split out from the bank itself so client
// components and server code can import the types without pulling in 75
// problems' worth of prompts and starter code.

import type { LanguageId } from "../languages";

export type Difficulty = "Easy" | "Medium" | "Hard";

// The Blind 75's own grouping, plus "Design" for the handful of
// implement-a-data-structure problems that sit outside it.
export type Topic =
  | "Array"
  | "String"
  | "Binary"
  | "Dynamic Programming"
  | "Graph"
  | "Interval"
  | "Linked List"
  | "Matrix"
  | "Tree"
  | "Heap"
  | "Design";

// Display order for the picker's topic filter — declaration order of a union
// isn't available at runtime, and alphabetical would scatter the array/string
// warm-up problems through the middle of the list.
export const TOPICS: Topic[] = [
  "Array",
  "String",
  "Binary",
  "Dynamic Programming",
  "Interval",
  "Linked List",
  "Matrix",
  "Tree",
  "Graph",
  "Heap",
  "Design",
];

// The problem every unknown id falls back to. Pinned by id rather than taken
// from position 0 of a generated, sorted list — the fallback is load-bearing
// (see `getProblem`), so it shouldn't move when a new problem sorts above it.
export const DEFAULT_PROBLEM_ID = "two-sum";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

// Everything the picker needs and nothing it doesn't. `catalog.ts` is an array
// of these, which is why /start can list all 75 without shipping the bank.
export interface ProblemMeta {
  id: string;
  title: string;
  difficulty: Difficulty;
  topic: Topic;
  // One-line hook shown in lists.
  summary: string;
}

export interface Problem extends ProblemMeta {
  // Full statement shown in the problem panel.
  prompt: string;
  examples: ProblemExample[];
  constraints: string[];
  // Seed code, per language. Deliberately a full Record rather than a Partial
  // with a generic fallback: the signature has to match the names the prompt
  // uses, and a fallback is exactly how every problem ended up opening with a
  // parameterless `solution()`. Adding a language or a problem without real
  // signatures is now a type error.
  //
  // Each one ends with a driver that runs the first example, so hitting Run on
  // an untouched editor produces output instead of silence.
  starters: Record<LanguageId, string>;
}
