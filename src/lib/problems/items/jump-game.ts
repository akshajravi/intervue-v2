import type { Problem } from "../types";

const problem: Problem = {
  id: "jump-game",
  title: "Jump Game",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Decide whether you can reach the end of the array.",
  prompt:
    "You start at index 0 of an array `nums`, where `nums[i]` is the maximum " +
    "number of steps you may jump forward from position `i`.\n\n" +
    "Return `true` if you can reach the last index.",
  examples: [
    {
      input: "nums = [2, 3, 1, 1, 4]",
      output: "true",
      explanation: "Jump 1 to index 1, then 3 to the last index.",
    },
    {
      input: "nums = [3, 2, 1, 0, 4]",
      output: "false",
      explanation: "Every route lands on the 0 at index 3 and stalls there.",
    },
  ],
  constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
  starters: {
    python: `def can_jump(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(can_jump([2, 3, 1, 1, 4]))  # expected True
`,
    javascript: `function canJump(nums) {
  // Write your solution here
}

console.log(canJump([2, 3, 1, 1, 4])); // expected true
`,
    typescript: `function canJump(nums: number[]): boolean {
  // Write your solution here
  return false;
}

console.log(canJump([2, 3, 1, 1, 4])); // expected true
`,
    java: `public class Main {
    static boolean canJump(int[] nums) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(canJump(new int[] {2, 3, 1, 1, 4})); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool canJump(vector<int>& nums) {
    // Write your solution here
    return false;
}

int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    // expected true
    cout << (canJump(nums) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
