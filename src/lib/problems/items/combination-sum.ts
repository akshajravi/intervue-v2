import type { Problem } from "../types";

const problem: Problem = {
  id: "combination-sum",
  title: "Combination Sum",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "List every multiset of candidates hitting a target.",
  prompt:
    "Given an array of distinct integers `candidates` and a `target`, return " +
    "all unique combinations of candidates that sum to the target.\n\n" +
    "The same candidate may be chosen any number of times. Two combinations " +
    "are the same if they use the same numbers the same number of times, " +
    "regardless of order.",
  examples: [
    {
      input: "candidates = [2, 3, 6, 7], target = 7",
      output: "[[2, 2, 3], [7]]",
      explanation: "2 may be reused, so 2+2+3 counts.",
    },
    {
      input: "candidates = [2], target = 1",
      output: "[]",
    },
  ],
  constraints: [
    "1 <= candidates.length <= 30",
    "2 <= candidates[i] <= 40",
    "All elements of candidates are distinct.",
    "1 <= target <= 40",
  ],
  starters: {
    python: `def combination_sum(candidates, target):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(combination_sum([2, 3, 6, 7], 7))  # expected [[2, 2, 3], [7]]
`,
    javascript: `function combinationSum(candidates, target) {
  // Write your solution here
}

// expected [ [ 2, 2, 3 ], [ 7 ] ]
console.log(combinationSum([2, 3, 6, 7], 7));
`,
    typescript: `function combinationSum(candidates: number[], target: number): number[][] {
  // Write your solution here
  return [];
}

// expected [ [ 2, 2, 3 ], [ 7 ] ]
console.log(combinationSum([2, 3, 6, 7], 7));
`,
    java: `import java.util.List;

public class Main {
    static List<List<Integer>> combinationSum(int[] candidates, int target) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        // expected [[2, 2, 3], [7]]
        System.out.println(combinationSum(new int[] {2, 3, 6, 7}, 7));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> candidates = {2, 3, 6, 7};
    // expected [2,2,3] [7]
    for (auto& c : combinationSum(candidates, 7)) {
        cout << "[";
        for (size_t i = 0; i < c.size(); i++) cout << (i ? "," : "") << c[i];
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
