import type { Problem } from "../types";

const problem: Problem = {
  id: "non-overlapping-intervals",
  title: "Non-overlapping Intervals",
  difficulty: "Medium",
  topic: "Interval",
  summary: "Remove as few intervals as possible to kill all overlaps.",
  prompt:
    "Given an array of `intervals`, return the minimum number of intervals " +
    "you must remove so that none of the remaining ones overlap.\n\n" +
    "Intervals that only touch at an endpoint, like [1,2] and [2,3], do not " +
    "count as overlapping.",
  examples: [
    {
      input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
      output: "1",
      explanation: "Removing [1,3] leaves the rest non-overlapping.",
    },
    {
      input: "intervals = [[1,2],[1,2],[1,2]]",
      output: "2",
      explanation: "Two of the three identical intervals have to go.",
    },
  ],
  constraints: [
    "1 <= intervals.length <= 10^5",
    "intervals[i].length == 2",
    "-5 * 10^4 <= start < end <= 5 * 10^4",
  ],
  starters: {
    python: `def erase_overlap_intervals(intervals):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected 1
    print(erase_overlap_intervals([[1, 2], [2, 3], [3, 4], [1, 3]]))
`,
    javascript: `function eraseOverlapIntervals(intervals) {
  // Write your solution here
}

// expected 1
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
`,
    typescript: `function eraseOverlapIntervals(intervals: number[][]): number {
  // Write your solution here
  return 0;
}

// expected 1
console.log(eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));
`,
    java: `public class Main {
    static int eraseOverlapIntervals(int[][] intervals) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[][] intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
        System.out.println(eraseOverlapIntervals(intervals)); // expected 1
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int eraseOverlapIntervals(vector<vector<int>>& intervals) {
    // Write your solution here
    return 0;
}

int main() {
    vector<vector<int>> intervals = {{1, 2}, {2, 3}, {3, 4}, {1, 3}};
    cout << eraseOverlapIntervals(intervals) << "\\n";  // expected 1
    return 0;
}
`,
  },
};

export default problem;
