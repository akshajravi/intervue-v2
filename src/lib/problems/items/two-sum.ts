import type { Problem } from "../types";

const problem: Problem = {
  id: "two-sum",
  title: "Two Sum",
  difficulty: "Easy",
  topic: "Array",
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
  starters: {
    python: `def two_sum(nums, target):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(two_sum([2, 7, 11, 15], 9))  # expected [0, 1]
`,
    javascript: `function twoSum(nums, target) {
  // Write your solution here
}

console.log(twoSum([2, 7, 11, 15], 9)); // expected [ 0, 1 ]
`,
    typescript: `function twoSum(nums: number[], target: number): number[] {
  // Write your solution here
  return [];
}

console.log(twoSum([2, 7, 11, 15], 9)); // expected [ 0, 1 ]
`,
    java: `import java.util.Arrays;

public class Main {
    static int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[] {};
    }

    public static void main(String[] args) {
        // expected [0, 1]
        System.out.println(Arrays.toString(twoSum(new int[] {2, 7, 11, 15}, 9)));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    vector<int> ans = twoSum(nums, 9);  // expected [0, 1]
    for (int i : ans) cout << i << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
