import type { Problem } from "../types";

const problem: Problem = {
  id: "search-in-rotated-sorted-array",
  title: "Search in Rotated Sorted Array",
  difficulty: "Medium",
  topic: "Binary",
  summary: "Binary-search a sorted array that has been rotated at an unknown pivot.",
  prompt:
    "An ascending array of distinct integers was rotated at some unknown " +
    "pivot, so `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`.\n\n" +
    "Given the rotated array `nums` and an integer `target`, return the index " +
    "of `target`, or -1 if it isn't present. Your algorithm must run in " +
    "O(log n) time.",
  examples: [
    {
      input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0",
      output: "4",
      explanation: "0 sits at index 4 of the rotated array.",
    },
    {
      input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 3",
      output: "-1",
    },
  ],
  constraints: [
    "1 <= nums.length <= 5000",
    "-10^4 <= nums[i] <= 10^4",
    "All values of nums are unique.",
    "-10^4 <= target <= 10^4",
  ],
  starters: {
    python: `def search_rotated(nums, target):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(search_rotated([4, 5, 6, 7, 0, 1, 2], 0))  # expected 4
`,
    javascript: `function searchRotated(nums, target) {
  // Write your solution here
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // expected 4
`,
    typescript: `function searchRotated(nums: number[], target: number): number {
  // Write your solution here
  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // expected 4
`,
    java: `public class Main {
    static int searchRotated(int[] nums, int target) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {4, 5, 6, 7, 0, 1, 2};
        System.out.println(searchRotated(nums, 0)); // expected 4
    }
}
`,
    // Named searchRotated rather than search: <bits/stdc++.h> with "using
    // namespace std" brings in std::search, and an unqualified call to a
    // same-named function is an overload-resolution trap.
    cpp: `#include <bits/stdc++.h>
using namespace std;

int searchRotated(vector<int>& nums, int target) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> nums = {4, 5, 6, 7, 0, 1, 2};
    cout << searchRotated(nums, 0) << "\\n";  // expected 4
    return 0;
}
`,
  },
};

export default problem;
