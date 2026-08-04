import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-increasing-subsequence",
  title: "Longest Increasing Subsequence",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Measure the longest strictly increasing subsequence.",
  prompt:
    "Given an integer array `nums`, return the length of the longest " +
    "strictly increasing subsequence.\n\n" +
    "A subsequence keeps the original order but may skip elements. The " +
    "O(n^2) solution is a fine start; there is an O(n log n) one.",
  examples: [
    {
      input: "nums = [10, 9, 2, 5, 3, 7, 101, 18]",
      output: "4",
      explanation: "[2, 3, 7, 101] has length 4.",
    },
    {
      input: "nums = [7, 7, 7, 7]",
      output: "1",
      explanation: "Strictly increasing, so equal values can't extend a run.",
    },
  ],
  constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
  starters: {
    python: `def length_of_lis(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(length_of_lis([10, 9, 2, 5, 3, 7, 101, 18]))  # expected 4
`,
    javascript: `function lengthOfLIS(nums) {
  // Write your solution here
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // expected 4
`,
    typescript: `function lengthOfLIS(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // expected 4
`,
    java: `public class Main {
    static int lengthOfLIS(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[] nums = {10, 9, 2, 5, 3, 7, 101, 18};
        System.out.println(lengthOfLIS(nums)); // expected 4
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLIS(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {10, 9, 2, 5, 3, 7, 101, 18};
    cout << lengthOfLIS(nums) << "\\n";  // expected 4
    return 0;
}
`,
  },
};

export default problem;
