import type { Problem } from "../types";

const problem: Problem = {
  id: "house-robber",
  title: "House Robber",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Take the most money without robbing adjacent houses.",
  prompt:
    "Each house on a street holds some amount of money, given by `nums`. " +
    "Robbing two adjacent houses triggers the alarm.\n\n" +
    "Return the maximum amount you can take without ever robbing two " +
    "neighbours.",
  examples: [
    {
      input: "nums = [1, 2, 3, 1]",
      output: "4",
      explanation: "Rob house 0 and house 2 for 1 + 3 = 4.",
    },
    {
      input: "nums = [2, 7, 9, 3, 1]",
      output: "12",
      explanation: "Rob houses 0, 2 and 4 for 2 + 9 + 1 = 12.",
    },
  ],
  constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
  starters: {
    python: `def rob(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(rob([2, 7, 9, 3, 1]))  # expected 12
`,
    javascript: `function rob(nums) {
  // Write your solution here
}

console.log(rob([2, 7, 9, 3, 1])); // expected 12
`,
    typescript: `function rob(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(rob([2, 7, 9, 3, 1])); // expected 12
`,
    java: `public class Main {
    static int rob(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[] {2, 7, 9, 3, 1})); // expected 12
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int rob(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {2, 7, 9, 3, 1};
    cout << rob(nums) << "\\n";  // expected 12
    return 0;
}
`,
  },
};

export default problem;
