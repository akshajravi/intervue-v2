import type { Problem } from "../types";

const problem: Problem = {
  id: "insert-interval",
  title: "Insert Interval",
  difficulty: "Medium",
  topic: "Interval",
  summary: "Slot a new interval into a sorted list, merging as needed.",
  prompt:
    "You are given a list of non-overlapping `intervals`, sorted by start " +
    "time, and a `newInterval` to add.\n\n" +
    "Insert `newInterval` so the list stays sorted and non-overlapping, " +
    "merging where necessary, and return the result.",
  examples: [
    {
      input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
      output: "[[1,5],[6,9]]",
      explanation: "[2,5] overlaps [1,3], so the two merge into [1,5].",
    },
    {
      input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
      output: "[[1,2],[3,10],[12,16]]",
      explanation: "[4,8] overlaps [3,5], [6,7] and [8,10].",
    },
  ],
  constraints: [
    "0 <= intervals.length <= 10^4",
    "intervals is sorted by start and has no overlaps",
    "0 <= start <= end <= 10^5",
  ],
  starters: {
    python: `def insert(intervals, new_interval):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(insert([[1, 3], [6, 9]], [2, 5]))  # expected [[1, 5], [6, 9]]
`,
    javascript: `function insert(intervals, newInterval) {
  // Write your solution here
}

// expected [ [ 1, 5 ], [ 6, 9 ] ]
console.log(insert([[1, 3], [6, 9]], [2, 5]));
`,
    typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Write your solution here
  return [];
}

// expected [ [ 1, 5 ], [ 6, 9 ] ]
console.log(insert([[1, 3], [6, 9]], [2, 5]));
`,
    java: `import java.util.Arrays;

public class Main {
    static int[][] insert(int[][] intervals, int[] newInterval) {
        // Write your solution here
        return new int[][] {};
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 3}, {6, 9}};
        // expected [[1, 5], [6, 9]]
        System.out.println(Arrays.deepToString(insert(intervals, new int[] {2, 5})));
    }
}
`,
    // insertInterval rather than insert: every std container has an `insert`
    // member, and an unqualified free function of the same name under
    // "using namespace std" is a confusing thing to debug mid-interview.
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> insertInterval(vector<vector<int>>& intervals, vector<int>& newInterval) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> intervals = {{1, 3}, {6, 9}};
    vector<int> newInterval = {2, 5};
    // expected [1,5] [6,9]
    for (auto& iv : insertInterval(intervals, newInterval)) {
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
