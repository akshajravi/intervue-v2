import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-consecutive-sequence",
  title: "Longest Consecutive Sequence",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Find the longest run of consecutive integers in any order.",
  prompt:
    "Given an unsorted array of integers `nums`, return the length of the " +
    "longest sequence of consecutive integers it contains.\n\n" +
    "The numbers need not be adjacent in the array. Your algorithm must run " +
    "in O(n) time, so sorting is out.",
  examples: [
    {
      input: "nums = [100, 4, 200, 1, 3, 2]",
      output: "4",
      explanation: "The run 1, 2, 3, 4 has length 4.",
    },
    {
      input: "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
      output: "9",
      explanation: "0 through 8, with the duplicate 0 counting once.",
    },
  ],
  constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
  starters: {
    python: `def longest_consecutive(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # expected 4
`,
    javascript: `function longestConsecutive(nums) {
  // Write your solution here
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // expected 4
`,
    typescript: `function longestConsecutive(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // expected 4
`,
    java: `public class Main {
    static int longestConsecutive(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[] nums = {100, 4, 200, 1, 3, 2};
        System.out.println(longestConsecutive(nums)); // expected 4
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int longestConsecutive(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {100, 4, 200, 1, 3, 2};
    cout << longestConsecutive(nums) << "\\n";  // expected 4
    return 0;
}
`,
  },
};

export default problem;
