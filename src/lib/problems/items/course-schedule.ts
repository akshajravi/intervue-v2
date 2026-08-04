import type { Problem } from "../types";

const problem: Problem = {
  id: "course-schedule",
  title: "Course Schedule",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Decide whether prerequisites allow finishing every course.",
  prompt:
    "There are `numCourses` courses labelled 0 to numCourses - 1. " +
    "`prerequisites[i] = [a, b]` means you must take course `b` before " +
    "course `a`.\n\n" +
    "Return `true` if you can finish every course. This is really asking " +
    "whether the prerequisite graph contains a cycle.",
  examples: [
    {
      input: "numCourses = 2, prerequisites = [[1,0]]",
      output: "true",
      explanation: "Take 0, then 1.",
    },
    {
      input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
      output: "false",
      explanation: "Each course requires the other, so neither can be taken first.",
    },
  ],
  constraints: [
    "1 <= numCourses <= 2000",
    "0 <= prerequisites.length <= 5000",
    "All prerequisite pairs are distinct.",
  ],
  starters: {
    python: `def can_finish(num_courses, prerequisites):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(can_finish(2, [[1, 0]]))  # expected True
`,
    javascript: `function canFinish(numCourses, prerequisites) {
  // Write your solution here
}

console.log(canFinish(2, [[1, 0]])); // expected true
`,
    typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // Write your solution here
  return false;
}

console.log(canFinish(2, [[1, 0]])); // expected true
`,
    java: `public class Main {
    static boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        int[][] prerequisites = {{1, 0}};
        System.out.println(canFinish(2, prerequisites)); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    // Write your solution here
    return false;
}

int main() {
    vector<vector<int>> prerequisites = {{1, 0}};
    // expected true
    cout << (canFinish(2, prerequisites) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
