// The whole problem bank, eagerly. This is the *server* entry point.
//
// `server-only` is the point of the file: every problem's prompt, examples and
// five starters add up to hundreds of kilobytes, and the one thing that must
// never happen is a client component importing it by reflex. Doing so is now a
// build error instead of a silent bundle regression. Client code has two
// smaller doors: `catalog.ts` (list metadata) and `load.ts` (one problem, code
// split).
//
// GENERATED BLOCK: the imports and PROBLEMS array below are rewritten by
// `npm run validate:starters -- --write`. Don't hand-edit them; add a file to
// `items/` and rerun.

import "server-only";

import { DEFAULT_PROBLEM_ID, type Problem } from "./types";

// --- generated:imports ---
import addAndSearchWord from "./items/add-and-search-word";
import alienDictionary from "./items/alien-dictionary";
import bestTimeToBuyAndSellStock from "./items/best-time-to-buy-and-sell-stock";
import binaryTreeLevelOrderTraversal from "./items/binary-tree-level-order-traversal";
import binaryTreeMaximumPathSum from "./items/binary-tree-maximum-path-sum";
import climbingStairs from "./items/climbing-stairs";
import cloneGraph from "./items/clone-graph";
import coinChange from "./items/coin-change";
import combinationSum from "./items/combination-sum";
import constructBinaryTreeFromPreorderAndInorder from "./items/construct-binary-tree-from-preorder-and-inorder";
import containerWithMostWater from "./items/container-with-most-water";
import containsDuplicate from "./items/contains-duplicate";
import countingBits from "./items/counting-bits";
import courseSchedule from "./items/course-schedule";
import decodeWays from "./items/decode-ways";
import encodeAndDecodeStrings from "./items/encode-and-decode-strings";
import findMedianFromDataStream from "./items/find-median-from-data-stream";
import findMinimumInRotatedSortedArray from "./items/find-minimum-in-rotated-sorted-array";
import graphValidTree from "./items/graph-valid-tree";
import groupAnagrams from "./items/group-anagrams";
import houseRobber from "./items/house-robber";
import houseRobberIi from "./items/house-robber-ii";
import implementTriePrefixTree from "./items/implement-trie-prefix-tree";
import insertInterval from "./items/insert-interval";
import invertBinaryTree from "./items/invert-binary-tree";
import jumpGame from "./items/jump-game";
import kthSmallestElementInABst from "./items/kth-smallest-element-in-a-bst";
import linkedListCycle from "./items/linked-list-cycle";
import longestCommonSubsequence from "./items/longest-common-subsequence";
import longestConsecutiveSequence from "./items/longest-consecutive-sequence";
import longestIncreasingSubsequence from "./items/longest-increasing-subsequence";
import longestPalindromicSubstring from "./items/longest-palindromic-substring";
import longestRepeatingCharacterReplacement from "./items/longest-repeating-character-replacement";
import longestSubstringWithoutRepeatingCharacters from "./items/longest-substring-without-repeating-characters";
import lowestCommonAncestorOfABst from "./items/lowest-common-ancestor-of-a-bst";
import lruCache from "./items/lru-cache";
import maximumDepthOfBinaryTree from "./items/maximum-depth-of-binary-tree";
import maximumProductSubarray from "./items/maximum-product-subarray";
import maximumSubarray from "./items/maximum-subarray";
import meetingRooms from "./items/meeting-rooms";
import meetingRoomsIi from "./items/meeting-rooms-ii";
import mergeIntervals from "./items/merge-intervals";
import mergeKSortedLists from "./items/merge-k-sorted-lists";
import mergeTwoSortedLists from "./items/merge-two-sorted-lists";
import minimumWindowSubstring from "./items/minimum-window-substring";
import missingNumber from "./items/missing-number";
import nonOverlappingIntervals from "./items/non-overlapping-intervals";
import numberOf1Bits from "./items/number-of-1-bits";
import numberOfConnectedComponents from "./items/number-of-connected-components";
import numberOfIslands from "./items/number-of-islands";
import pacificAtlanticWaterFlow from "./items/pacific-atlantic-water-flow";
import palindromicSubstrings from "./items/palindromic-substrings";
import productOfArrayExceptSelf from "./items/product-of-array-except-self";
import removeNthNodeFromEndOfList from "./items/remove-nth-node-from-end-of-list";
import reorderList from "./items/reorder-list";
import reverseBits from "./items/reverse-bits";
import reverseLinkedList from "./items/reverse-linked-list";
import rotateImage from "./items/rotate-image";
import sameTree from "./items/same-tree";
import searchInRotatedSortedArray from "./items/search-in-rotated-sorted-array";
import serializeAndDeserializeBinaryTree from "./items/serialize-and-deserialize-binary-tree";
import setMatrixZeroes from "./items/set-matrix-zeroes";
import spiralMatrix from "./items/spiral-matrix";
import subtreeOfAnotherTree from "./items/subtree-of-another-tree";
import sumOfTwoIntegers from "./items/sum-of-two-integers";
import threeSum from "./items/three-sum";
import topKFrequentElements from "./items/top-k-frequent-elements";
import twoSum from "./items/two-sum";
import uniquePaths from "./items/unique-paths";
import validAnagram from "./items/valid-anagram";
import validPalindrome from "./items/valid-palindrome";
import validParentheses from "./items/valid-parentheses";
import validateBinarySearchTree from "./items/validate-binary-search-tree";
import wordBreak from "./items/word-break";
import wordSearch from "./items/word-search";
import wordSearchIi from "./items/word-search-ii";
// --- /generated:imports ---

export const PROBLEMS: Problem[] = [
  // --- generated:list ---
  bestTimeToBuyAndSellStock,
  containsDuplicate,
  twoSum,
  threeSum,
  containerWithMostWater,
  maximumProductSubarray,
  maximumSubarray,
  productOfArrayExceptSelf,
  validAnagram,
  validPalindrome,
  validParentheses,
  encodeAndDecodeStrings,
  groupAnagrams,
  longestPalindromicSubstring,
  longestRepeatingCharacterReplacement,
  longestSubstringWithoutRepeatingCharacters,
  palindromicSubstrings,
  minimumWindowSubstring,
  countingBits,
  missingNumber,
  numberOf1Bits,
  reverseBits,
  findMinimumInRotatedSortedArray,
  searchInRotatedSortedArray,
  sumOfTwoIntegers,
  climbingStairs,
  coinChange,
  combinationSum,
  decodeWays,
  houseRobber,
  houseRobberIi,
  jumpGame,
  longestCommonSubsequence,
  longestIncreasingSubsequence,
  uniquePaths,
  wordBreak,
  meetingRooms,
  insertInterval,
  meetingRoomsIi,
  mergeIntervals,
  nonOverlappingIntervals,
  linkedListCycle,
  mergeTwoSortedLists,
  reverseLinkedList,
  removeNthNodeFromEndOfList,
  reorderList,
  mergeKSortedLists,
  rotateImage,
  setMatrixZeroes,
  spiralMatrix,
  wordSearch,
  invertBinaryTree,
  maximumDepthOfBinaryTree,
  sameTree,
  subtreeOfAnotherTree,
  addAndSearchWord,
  binaryTreeLevelOrderTraversal,
  constructBinaryTreeFromPreorderAndInorder,
  implementTriePrefixTree,
  kthSmallestElementInABst,
  lowestCommonAncestorOfABst,
  validateBinarySearchTree,
  binaryTreeMaximumPathSum,
  serializeAndDeserializeBinaryTree,
  wordSearchIi,
  cloneGraph,
  courseSchedule,
  graphValidTree,
  longestConsecutiveSequence,
  numberOfConnectedComponents,
  numberOfIslands,
  pacificAtlanticWaterFlow,
  alienDictionary,
  topKFrequentElements,
  findMedianFromDataStream,
  lruCache,
  // --- /generated:list ---
];

export { DEFAULT_PROBLEM_ID };
export type { Difficulty, Problem, ProblemExample, ProblemMeta, Topic } from "./types";

const BY_ID = new Map(PROBLEMS.map((p) => [p.id, p]));

// Unknown ids resolve to the default problem rather than throwing: a stale
// sessionStorage selection or a retired problem should still open an
// interview. `/history/[id]` detects the substitution by comparing the
// resolved id against the stored one.
export function getProblem(id: string | null | undefined): Problem {
  return (
    (id ? BY_ID.get(id) : undefined) ??
    BY_ID.get(DEFAULT_PROBLEM_ID) ??
    PROBLEMS[0]
  );
}
