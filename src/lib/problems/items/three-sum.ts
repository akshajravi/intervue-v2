import type { Problem } from "../types";

const problem: Problem = {
  id: "three-sum",
  title: "3Sum",
  difficulty: "Medium",
  topic: "Array",
  summary: "Find every unique triple that sums to zero.",
  prompt:
    "Given an integer array `nums`, return all unique triples " +
    "`[nums[i], nums[j], nums[k]]` such that `i`, `j` and `k` are distinct " +
    "indices and the three values sum to zero.\n\n" +
    "The solution set must not contain duplicate triples. The triples and the " +
    "values inside them may be returned in any order.",
  examples: [
    {
      input: "nums = [-1, 0, 1, 2, -1, -4]",
      output: "[[-1, -1, 2], [-1, 0, 1]]",
      explanation:
        "Both triples sum to zero. The two -1s are at different indices, so " +
        "[-1, -1, 2] is valid, but it may only appear once.",
    },
    {
      input: "nums = [0, 1, 1]",
      output: "[]",
      explanation: "No triple sums to zero.",
    },
  ],
  constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
  starters: {
    python: `def three_sum(nums):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected [[-1, -1, 2], [-1, 0, 1]]
    print(three_sum([-1, 0, 1, 2, -1, -4]))
`,
    javascript: `function threeSum(nums) {
  // Write your solution here
}

// expected [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
`,
    typescript: `function threeSum(nums: number[]): number[][] {
  // Write your solution here
  return [];
}

// expected [ [ -1, -1, 2 ], [ -1, 0, 1 ] ]
console.log(threeSum([-1, 0, 1, 2, -1, -4]));
`,
    java: `import java.util.List;

public class Main {
    static List<List<Integer>> threeSum(int[] nums) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        // expected [[-1, -1, 2], [-1, 0, 1]]
        System.out.println(threeSum(new int[] {-1, 0, 1, 2, -1, -4}));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> threeSum(vector<int>& nums) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {-1, 0, 1, 2, -1, -4};
    // expected [-1,-1,2] [-1,0,1]
    for (auto& t : threeSum(nums)) {
        cout << "[" << t[0] << "," << t[1] << "," << t[2] << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
