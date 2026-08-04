import type { Problem } from "../types";

const problem: Problem = {
  id: "maximum-subarray",
  title: "Maximum Subarray",
  difficulty: "Medium",
  topic: "Array",
  summary: "Find the contiguous run with the largest sum.",
  prompt:
    "Given an integer array `nums`, find the contiguous subarray containing " +
    "at least one number that has the largest sum, and return that sum.",
  examples: [
    {
      input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]",
      output: "6",
      explanation: "The subarray [4, -1, 2, 1] sums to 6.",
    },
    {
      input: "nums = [-3, -1, -2]",
      output: "-1",
      explanation:
        "Every element is negative, so the best you can do is the single largest.",
    },
  ],
  constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
  starters: {
    python: `def max_sub_array(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # expected 6
`,
    javascript: `function maxSubArray(nums) {
  // Write your solution here
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // expected 6
`,
    typescript: `function maxSubArray(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // expected 6
`,
    java: `public class Main {
    static int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubArray(nums)); // expected 6
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << maxSubArray(nums) << "\\n";  // expected 6
    return 0;
}
`,
  },
};

export default problem;
