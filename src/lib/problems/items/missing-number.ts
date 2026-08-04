import type { Problem } from "../types";

const problem: Problem = {
  id: "missing-number",
  title: "Missing Number",
  difficulty: "Easy",
  topic: "Binary",
  summary: "Find the one value missing from 0..n.",
  prompt:
    "Given an array `nums` containing `n` distinct numbers drawn from the " +
    "range `[0, n]`, return the one number in that range that is missing.\n\n" +
    "Try to do it in O(n) time and O(1) extra space.",
  examples: [
    {
      input: "nums = [3, 0, 1]",
      output: "2",
      explanation: "n = 3, so the range is [0,3] and 2 never appears.",
    },
    {
      input: "nums = [0, 1]",
      output: "2",
      explanation: "n = 2, and 2 is the missing value.",
    },
  ],
  constraints: [
    "n == nums.length",
    "1 <= n <= 10^4",
    "0 <= nums[i] <= n",
    "All the numbers of nums are unique.",
  ],
  starters: {
    python: `def missing_number(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(missing_number([3, 0, 1]))  # expected 2
`,
    javascript: `function missingNumber(nums) {
  // Write your solution here
}

console.log(missingNumber([3, 0, 1])); // expected 2
`,
    typescript: `function missingNumber(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(missingNumber([3, 0, 1])); // expected 2
`,
    java: `public class Main {
    static int missingNumber(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(missingNumber(new int[] {3, 0, 1})); // expected 2
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int missingNumber(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {3, 0, 1};
    cout << missingNumber(nums) << "\\n";  // expected 2
    return 0;
}
`,
  },
};

export default problem;
