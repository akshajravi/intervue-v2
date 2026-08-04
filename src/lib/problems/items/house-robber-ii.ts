import type { Problem } from "../types";

const problem: Problem = {
  id: "house-robber-ii",
  title: "House Robber II",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Same rules, but the street is a circle.",
  prompt:
    "The houses are arranged in a circle, so the first and last are " +
    "neighbours. Robbing two adjacent houses still triggers the alarm.\n\n" +
    "Given `nums`, return the maximum amount you can rob.",
  examples: [
    {
      input: "nums = [2, 3, 2]",
      output: "3",
      explanation:
        "Robbing houses 0 and 2 is not allowed — they're adjacent on the circle.",
    },
    {
      input: "nums = [1, 2, 3, 1]",
      output: "4",
      explanation: "Rob house 0 and house 2 for 1 + 3 = 4.",
    },
  ],
  constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
  starters: {
    python: `def rob(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(rob([2, 3, 2]))  # expected 3
`,
    javascript: `function rob(nums) {
  // Write your solution here
}

console.log(rob([2, 3, 2])); // expected 3
`,
    typescript: `function rob(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(rob([2, 3, 2])); // expected 3
`,
    java: `public class Main {
    static int rob(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(rob(new int[] {2, 3, 2})); // expected 3
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
    vector<int> nums = {2, 3, 2};
    cout << rob(nums) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
