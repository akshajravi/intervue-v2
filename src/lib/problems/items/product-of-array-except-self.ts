import type { Problem } from "../types";

const problem: Problem = {
  id: "product-of-array-except-self",
  title: "Product of Array Except Self",
  difficulty: "Medium",
  topic: "Array",
  summary: "Build the products of every element except the current one.",
  prompt:
    "Given an integer array `nums`, return an array `answer` where " +
    "`answer[i]` is the product of every element of `nums` except " +
    "`nums[i]`.\n\n" +
    "Solve it without using division, and in O(n) time.",
  examples: [
    {
      input: "nums = [1, 2, 3, 4]",
      output: "[24, 12, 8, 6]",
      explanation: "answer[0] = 2*3*4 = 24, answer[1] = 1*3*4 = 12, and so on.",
    },
    {
      input: "nums = [-1, 1, 0, -3, 3]",
      output: "[0, 0, 9, 0, 0]",
      explanation: "Every product that includes the 0 is 0.",
    },
  ],
  constraints: [
    "2 <= nums.length <= 10^5",
    "-30 <= nums[i] <= 30",
    "Every prefix and suffix product fits in a 32-bit integer.",
  ],
  starters: {
    python: `def product_except_self(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(product_except_self([1, 2, 3, 4]))  # expected [24, 12, 8, 6]
`,
    javascript: `function productExceptSelf(nums) {
  // Write your solution here
}

// expected [ 24, 12, 8, 6 ]
console.log(productExceptSelf([1, 2, 3, 4]));
`,
    typescript: `function productExceptSelf(nums: number[]): number[] {
  // Write your solution here
  return [];
}

// expected [ 24, 12, 8, 6 ]
console.log(productExceptSelf([1, 2, 3, 4]));
`,
    java: `import java.util.Arrays;

public class Main {
    static int[] productExceptSelf(int[] nums) {
        // Write your solution here
        return new int[] {};
    }

    public static void main(String[] args) {
        // expected [24, 12, 8, 6]
        System.out.println(Arrays.toString(productExceptSelf(new int[] {1, 2, 3, 4})));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {1, 2, 3, 4};
    // expected 24 12 8 6
    for (int v : productExceptSelf(nums)) cout << v << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
