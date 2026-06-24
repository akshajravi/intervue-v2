// The problem bank. This is just data — expand it freely.
//
// `prompt` is the candidate-facing statement (kept plain so it renders fine as
// text or lightly formatted markdown). `examples` are concrete I/O pairs the
// problem panel and the interviewer can both reference.

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  // One-line hook shown in lists.
  summary: string;
  // Full statement shown in the problem panel.
  prompt: string;
  examples: ProblemExample[];
  constraints: string[];
}

export const PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    summary: "Find the two indices whose values add up to a target.",
    prompt:
      "Given an array of integers `nums` and an integer `target`, return the " +
      "indices of the two numbers such that they add up to `target`.\n\n" +
      "You may assume that each input has exactly one solution, and you may not " +
      "use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] == 9, so we return [0, 1].",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Exactly one valid answer exists.",
    ],
  },
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    summary: "Collapse a set of overlapping intervals into the minimal set.",
    prompt:
      "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, " +
      "merge all overlapping intervals and return an array of the " +
      "non-overlapping intervals that cover all the intervals in the input.",
    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]",
        explanation: "[1,3] and [2,6] overlap, so they merge into [1,6].",
      },
      {
        input: "intervals = [[1,4],[4,5]]",
        output: "[[1,5]]",
        explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
      },
    ],
    constraints: [
      "1 <= intervals.length <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Hard",
    summary: "Design a cache that evicts the least-recently-used entry.",
    prompt:
      "Design a data structure for a Least Recently Used (LRU) cache. " +
      "Implement the `LRUCache` class:\n\n" +
      "- `LRUCache(capacity)` initializes the cache with a positive `capacity`.\n" +
      "- `get(key)` returns the value of the key if it exists, otherwise -1.\n" +
      "- `put(key, value)` updates or inserts the value. If the cache exceeds " +
      "`capacity`, evict the least recently used key.\n\n" +
      "Both `get` and `put` must run in O(1) average time.",
    examples: [
      {
        input:
          'LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)',
        output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
        explanation:
          "put(3,3) evicts key 2; put(4,4) evicts key 1 (least recently used).",
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "At most 2 * 10^5 calls to get and put.",
    ],
  },
];

export const DEFAULT_PROBLEM_ID = PROBLEMS[0].id;

export function getProblem(id: string | null | undefined): Problem {
  return PROBLEMS.find((p) => p.id === id) ?? PROBLEMS[0];
}
