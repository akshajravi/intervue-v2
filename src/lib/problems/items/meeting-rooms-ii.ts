import type { Problem } from "../types";

const problem: Problem = {
  id: "meeting-rooms-ii",
  title: "Meeting Rooms II",
  difficulty: "Medium",
  topic: "Interval",
  summary: "Count the fewest rooms that fit every meeting.",
  prompt:
    "Given an array of meeting time `intervals` where " +
    "`intervals[i] = [start_i, end_i]`, return the minimum number of " +
    "conference rooms required to hold all of them.\n\n" +
    "A room frees up the moment a meeting ends, so a meeting starting exactly " +
    "then can reuse it.",
  examples: [
    {
      input: "intervals = [[0,30],[5,10],[15,20]]",
      output: "2",
      explanation:
        "[0,30] occupies one room the whole time; [5,10] and [15,20] share a second.",
    },
    {
      input: "intervals = [[7,10],[2,4]]",
      output: "1",
    },
  ],
  constraints: [
    "1 <= intervals.length <= 10^4",
    "0 <= start_i < end_i <= 10^6",
  ],
  starters: {
    python: `def min_meeting_rooms(intervals):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected 2
    print(min_meeting_rooms([[0, 30], [5, 10], [15, 20]]))
`,
    javascript: `function minMeetingRooms(intervals) {
  // Write your solution here
}

// expected 2
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]));
`,
    typescript: `function minMeetingRooms(intervals: number[][]): number {
  // Write your solution here
  return 0;
}

// expected 2
console.log(minMeetingRooms([[0, 30], [5, 10], [15, 20]]));
`,
    java: `public class Main {
    static int minMeetingRooms(int[][] intervals) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};
        System.out.println(minMeetingRooms(intervals)); // expected 2
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int minMeetingRooms(vector<vector<int>>& intervals) {
    // Write your solution here
    return 0;
}

int main() {
    vector<vector<int>> intervals = {{0, 30}, {5, 10}, {15, 20}};
    cout << minMeetingRooms(intervals) << "\\n";  // expected 2
    return 0;
}
`,
  },
};

export default problem;
