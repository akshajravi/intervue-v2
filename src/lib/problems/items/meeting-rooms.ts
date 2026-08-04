import type { Problem } from "../types";

const problem: Problem = {
  id: "meeting-rooms",
  title: "Meeting Rooms",
  difficulty: "Easy",
  topic: "Interval",
  summary: "Decide whether one person can attend every meeting.",
  prompt:
    "Given an array of meeting time `intervals` where " +
    "`intervals[i] = [start_i, end_i]`, determine whether a person could " +
    "attend all of them.\n\n" +
    "A meeting that ends exactly when the next begins is fine.",
  examples: [
    {
      input: "intervals = [[0,30],[5,10],[15,20]]",
      output: "false",
      explanation: "[0,30] overlaps both of the others.",
    },
    {
      input: "intervals = [[7,10],[2,4]]",
      output: "true",
      explanation: "The two meetings don't overlap.",
    },
  ],
  constraints: [
    "0 <= intervals.length <= 10^4",
    "intervals[i].length == 2",
    "0 <= start_i < end_i <= 10^6",
  ],
  starters: {
    python: `def can_attend_meetings(intervals):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected False
    print(can_attend_meetings([[0, 30], [5, 10], [15, 20]]))
`,
    javascript: `function canAttendMeetings(intervals) {
  // Write your solution here
}

// expected false
console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]]));
`,
    typescript: `function canAttendMeetings(intervals: number[][]): boolean {
  // Write your solution here
  return false;
}

// expected false
console.log(canAttendMeetings([[0, 30], [5, 10], [15, 20]]));
`,
    java: `public class Main {
    static boolean canAttendMeetings(int[][] intervals) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        int[][] intervals = {{0, 30}, {5, 10}, {15, 20}};
        System.out.println(canAttendMeetings(intervals)); // expected false
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool canAttendMeetings(vector<vector<int>>& intervals) {
    // Write your solution here
    return false;
}

int main() {
    vector<vector<int>> intervals = {{0, 30}, {5, 10}, {15, 20}};
    // expected false
    cout << (canAttendMeetings(intervals) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
