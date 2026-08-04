// One problem, on demand. This is the *client* entry point.
//
// Each entry below is a separate `import()`, so the bundler code-splits every
// problem into its own chunk and /interview downloads exactly the one the
// candidate picked instead of the whole bank.
//
// The signature is deliberately async even though the data is local: when the
// bank moves to Postgres, this function's body becomes the query and nothing
// that calls it has to change.
//
// GENERATED BLOCK: `LOADERS` is rewritten by
// `npm run validate:starters -- --write`. Don't hand-edit it.

import { DEFAULT_PROBLEM_ID, type Problem } from "./types";

type Loader = () => Promise<{ default: Problem }>;

const LOADERS: Record<string, Loader> = {
  // --- generated:loaders ---
  "add-and-search-word": () => import("./items/add-and-search-word"),
  "alien-dictionary": () => import("./items/alien-dictionary"),
  "best-time-to-buy-and-sell-stock": () => import("./items/best-time-to-buy-and-sell-stock"),
  "binary-tree-level-order-traversal": () => import("./items/binary-tree-level-order-traversal"),
  "binary-tree-maximum-path-sum": () => import("./items/binary-tree-maximum-path-sum"),
  "climbing-stairs": () => import("./items/climbing-stairs"),
  "clone-graph": () => import("./items/clone-graph"),
  "coin-change": () => import("./items/coin-change"),
  "combination-sum": () => import("./items/combination-sum"),
  "construct-binary-tree-from-preorder-and-inorder": () => import("./items/construct-binary-tree-from-preorder-and-inorder"),
  "container-with-most-water": () => import("./items/container-with-most-water"),
  "contains-duplicate": () => import("./items/contains-duplicate"),
  "counting-bits": () => import("./items/counting-bits"),
  "course-schedule": () => import("./items/course-schedule"),
  "decode-ways": () => import("./items/decode-ways"),
  "encode-and-decode-strings": () => import("./items/encode-and-decode-strings"),
  "find-median-from-data-stream": () => import("./items/find-median-from-data-stream"),
  "find-minimum-in-rotated-sorted-array": () => import("./items/find-minimum-in-rotated-sorted-array"),
  "graph-valid-tree": () => import("./items/graph-valid-tree"),
  "group-anagrams": () => import("./items/group-anagrams"),
  "house-robber": () => import("./items/house-robber"),
  "house-robber-ii": () => import("./items/house-robber-ii"),
  "implement-trie-prefix-tree": () => import("./items/implement-trie-prefix-tree"),
  "insert-interval": () => import("./items/insert-interval"),
  "invert-binary-tree": () => import("./items/invert-binary-tree"),
  "jump-game": () => import("./items/jump-game"),
  "kth-smallest-element-in-a-bst": () => import("./items/kth-smallest-element-in-a-bst"),
  "linked-list-cycle": () => import("./items/linked-list-cycle"),
  "longest-common-subsequence": () => import("./items/longest-common-subsequence"),
  "longest-consecutive-sequence": () => import("./items/longest-consecutive-sequence"),
  "longest-increasing-subsequence": () => import("./items/longest-increasing-subsequence"),
  "longest-palindromic-substring": () => import("./items/longest-palindromic-substring"),
  "longest-repeating-character-replacement": () => import("./items/longest-repeating-character-replacement"),
  "longest-substring-without-repeating-characters": () => import("./items/longest-substring-without-repeating-characters"),
  "lowest-common-ancestor-of-a-bst": () => import("./items/lowest-common-ancestor-of-a-bst"),
  "lru-cache": () => import("./items/lru-cache"),
  "maximum-depth-of-binary-tree": () => import("./items/maximum-depth-of-binary-tree"),
  "maximum-product-subarray": () => import("./items/maximum-product-subarray"),
  "maximum-subarray": () => import("./items/maximum-subarray"),
  "meeting-rooms": () => import("./items/meeting-rooms"),
  "meeting-rooms-ii": () => import("./items/meeting-rooms-ii"),
  "merge-intervals": () => import("./items/merge-intervals"),
  "merge-k-sorted-lists": () => import("./items/merge-k-sorted-lists"),
  "merge-two-sorted-lists": () => import("./items/merge-two-sorted-lists"),
  "minimum-window-substring": () => import("./items/minimum-window-substring"),
  "missing-number": () => import("./items/missing-number"),
  "non-overlapping-intervals": () => import("./items/non-overlapping-intervals"),
  "number-of-1-bits": () => import("./items/number-of-1-bits"),
  "number-of-connected-components": () => import("./items/number-of-connected-components"),
  "number-of-islands": () => import("./items/number-of-islands"),
  "pacific-atlantic-water-flow": () => import("./items/pacific-atlantic-water-flow"),
  "palindromic-substrings": () => import("./items/palindromic-substrings"),
  "product-of-array-except-self": () => import("./items/product-of-array-except-self"),
  "remove-nth-node-from-end-of-list": () => import("./items/remove-nth-node-from-end-of-list"),
  "reorder-list": () => import("./items/reorder-list"),
  "reverse-bits": () => import("./items/reverse-bits"),
  "reverse-linked-list": () => import("./items/reverse-linked-list"),
  "rotate-image": () => import("./items/rotate-image"),
  "same-tree": () => import("./items/same-tree"),
  "search-in-rotated-sorted-array": () => import("./items/search-in-rotated-sorted-array"),
  "serialize-and-deserialize-binary-tree": () => import("./items/serialize-and-deserialize-binary-tree"),
  "set-matrix-zeroes": () => import("./items/set-matrix-zeroes"),
  "spiral-matrix": () => import("./items/spiral-matrix"),
  "subtree-of-another-tree": () => import("./items/subtree-of-another-tree"),
  "sum-of-two-integers": () => import("./items/sum-of-two-integers"),
  "three-sum": () => import("./items/three-sum"),
  "top-k-frequent-elements": () => import("./items/top-k-frequent-elements"),
  "two-sum": () => import("./items/two-sum"),
  "unique-paths": () => import("./items/unique-paths"),
  "valid-anagram": () => import("./items/valid-anagram"),
  "valid-palindrome": () => import("./items/valid-palindrome"),
  "valid-parentheses": () => import("./items/valid-parentheses"),
  "validate-binary-search-tree": () => import("./items/validate-binary-search-tree"),
  "word-break": () => import("./items/word-break"),
  "word-search": () => import("./items/word-search"),
  "word-search-ii": () => import("./items/word-search-ii"),
  // --- /generated:loaders ---
};

// Mirrors `getProblem`'s silent fallback so a stale sessionStorage selection
// opens the default problem rather than a broken page. `/history/[id]` still
// detects the substitution by comparing ids.
export async function loadProblem(id: string | null | undefined): Promise<Problem> {
  const loader = (id ? LOADERS[id] : undefined) ?? LOADERS[DEFAULT_PROBLEM_ID];
  return (await loader()).default;
}
