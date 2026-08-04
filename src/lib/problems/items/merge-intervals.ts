import type { Problem } from "../types";

const problem: Problem = {
  id: "merge-intervals",
  title: "Merge Intervals",
  difficulty: "Medium",
  topic: "Interval",
  summary: "Collapse a set of overlapping intervals into the minimal set.",
  prompt:
    "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, " +
    "merge all overlapping intervals and return an array of the " +
    "non-overlapping intervals that cover all the intervals in the input.",
  examples: [
    {
      input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
      output: "[[1,6],[8,10],[15,18]]",
      explanation: "[1,3] and [2,6] overlap, so they merge into [1,6].",
    },
    {
      input: "intervals = [[1,4],[4,5]]",
      output: "[[1,5]]",
      explanation: "Intervals [1,4] and [4,5] are considered overlapping.",
    },
  ],
  constraints: [
    "1 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i <= end_i <= 10^4",
  ],
  starters: {
    python: `def merge(intervals):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected [[1, 6], [8, 10], [15, 18]]
    print(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
`,
    javascript: `function merge(intervals) {
  // Write your solution here
}

// expected [ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
`,
    typescript: `function merge(intervals: number[][]): number[][] {
  // Write your solution here
  return [];
}

// expected [ [ 1, 6 ], [ 8, 10 ], [ 15, 18 ] ]
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
`,
    java: `import java.util.Arrays;

public class Main {
    static int[][] merge(int[][] intervals) {
        // Write your solution here
        return new int[][] {};
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
        // expected [[1, 6], [8, 10], [15, 18]]
        System.out.println(Arrays.deepToString(merge(intervals)));
    }
}
`,
    // Named mergeIntervals, not merge: <bits/stdc++.h> plus "using namespace
    // std" pulls in std::merge, and sharing the name invites a confusing
    // overload-resolution error the moment a candidate calls it differently.
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> mergeIntervals(vector<vector<int>>& intervals) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> intervals = {{1, 3}, {2, 6}, {8, 10}, {15, 18}};
    // expected [1,6] [8,10] [15,18]
    for (auto& iv : mergeIntervals(intervals)) {
        cout << "[" << iv[0] << "," << iv[1] << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
