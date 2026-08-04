import type { Problem } from "../types";

const problem: Problem = {
  id: "maximum-product-subarray",
  title: "Maximum Product Subarray",
  difficulty: "Medium",
  topic: "Array",
  summary: "Find the contiguous run with the largest product.",
  prompt:
    "Given an integer array `nums`, find the contiguous subarray containing " +
    "at least one number that has the largest product, and return that " +
    "product.\n\n" +
    "Note that a pair of negatives can turn a small product into a large one.",
  examples: [
    {
      input: "nums = [2, 3, -2, 4]",
      output: "6",
      explanation: "The subarray [2, 3] has the largest product, 6.",
    },
    {
      input: "nums = [-2, 0, -1]",
      output: "0",
      explanation: "[-2, 0, -1] is not a valid answer; the best run is just [0].",
    },
  ],
  constraints: [
    "1 <= nums.length <= 2 * 10^4",
    "-10 <= nums[i] <= 10",
    "Every prefix product fits in a 32-bit integer.",
  ],
  starters: {
    python: `def max_product(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(max_product([2, 3, -2, 4]))  # expected 6
`,
    javascript: `function maxProduct(nums) {
  // Write your solution here
}

console.log(maxProduct([2, 3, -2, 4])); // expected 6
`,
    typescript: `function maxProduct(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(maxProduct([2, 3, -2, 4])); // expected 6
`,
    java: `public class Main {
    static int maxProduct(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(maxProduct(new int[] {2, 3, -2, 4})); // expected 6
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int maxProduct(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {2, 3, -2, 4};
    cout << maxProduct(nums) << "\\n";  // expected 6
    return 0;
}
`,
  },
};

export default problem;
