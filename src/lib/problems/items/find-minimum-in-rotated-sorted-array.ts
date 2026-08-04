import type { Problem } from "../types";

const problem: Problem = {
  id: "find-minimum-in-rotated-sorted-array",
  title: "Find Minimum in Rotated Sorted Array",
  difficulty: "Medium",
  topic: "Binary",
  summary: "Locate the smallest value in a sorted array that has been rotated.",
  prompt:
    "An ascending array of unique integers has been rotated between 1 and n " +
    "times. For example, `[0,1,2,4,5,6,7]` rotated four times becomes " +
    "`[4,5,6,7,0,1,2]`.\n\n" +
    "Given the rotated array `nums`, return its minimum element. Your " +
    "algorithm must run in O(log n) time.",
  examples: [
    {
      input: "nums = [4, 5, 6, 7, 0, 1, 2]",
      output: "0",
      explanation: "The original array was [0,1,2,4,5,6,7], rotated four times.",
    },
    {
      input: "nums = [11, 13, 15, 17]",
      output: "11",
      explanation: "Rotating n times leaves the array unchanged.",
    },
  ],
  constraints: [
    "1 <= nums.length <= 5000",
    "-5000 <= nums[i] <= 5000",
    "All integers in nums are unique.",
  ],
  starters: {
    python: `def find_min(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(find_min([4, 5, 6, 7, 0, 1, 2]))  # expected 0
`,
    javascript: `function findMin(nums) {
  // Write your solution here
}

console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // expected 0
`,
    typescript: `function findMin(nums: number[]): number {
  // Write your solution here
  return 0;
}

console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // expected 0
`,
    java: `public class Main {
    static int findMin(int[] nums) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(findMin(new int[] {4, 5, 6, 7, 0, 1, 2})); // expected 0
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int findMin(vector<int>& nums) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << findMin(nums) << "\\n";  // expected 0
    return 0;
}
`,
  },
};

export default problem;
