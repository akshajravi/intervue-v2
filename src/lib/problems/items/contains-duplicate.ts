import type { Problem } from "../types";

const problem: Problem = {
  id: "contains-duplicate",
  title: "Contains Duplicate",
  difficulty: "Easy",
  topic: "Array",
  summary: "Decide whether any value appears more than once.",
  prompt:
    "Given an integer array `nums`, return `true` if any value appears at " +
    "least twice, and `false` if every element is distinct.",
  examples: [
    {
      input: "nums = [1, 2, 3, 1]",
      output: "true",
      explanation: "1 appears at index 0 and index 3.",
    },
    {
      input: "nums = [1, 2, 3, 4]",
      output: "false",
    },
  ],
  constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
  starters: {
    python: `def contains_duplicate(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(contains_duplicate([1, 2, 3, 1]))  # expected True
`,
    javascript: `function containsDuplicate(nums) {
  // Write your solution here
}

console.log(containsDuplicate([1, 2, 3, 1])); // expected true
`,
    typescript: `function containsDuplicate(nums: number[]): boolean {
  // Write your solution here
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1])); // expected true
`,
    java: `public class Main {
    static boolean containsDuplicate(int[] nums) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        // expected true
        System.out.println(containsDuplicate(new int[] {1, 2, 3, 1}));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool containsDuplicate(vector<int>& nums) {
    // Write your solution here
    return false;
}

int main() {
    vector<int> nums = {1, 2, 3, 1};
    // expected true
    cout << (containsDuplicate(nums) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
