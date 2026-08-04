import type { Problem } from "../types";

const problem: Problem = {
  id: "unique-paths",
  title: "Unique Paths",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Count the routes across a grid moving only right and down.",
  prompt:
    "A robot starts in the top-left corner of an `m x n` grid and wants to " +
    "reach the bottom-right corner. It can only move right or down.\n\n" +
    "Return the number of distinct paths.",
  examples: [
    {
      input: "m = 3, n = 7",
      output: "28",
    },
    {
      input: "m = 3, n = 2",
      output: "3",
      explanation: "Down-down-right, down-right-down and right-down-down.",
    },
  ],
  constraints: [
    "1 <= m, n <= 100",
    "The answer is guaranteed to fit in a 32-bit integer.",
  ],
  starters: {
    python: `def unique_paths(m, n):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(unique_paths(3, 7))  # expected 28
`,
    javascript: `function uniquePaths(m, n) {
  // Write your solution here
}

console.log(uniquePaths(3, 7)); // expected 28
`,
    typescript: `function uniquePaths(m: number, n: number): number {
  // Write your solution here
  return 0;
}

console.log(uniquePaths(3, 7)); // expected 28
`,
    java: `public class Main {
    static int uniquePaths(int m, int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(uniquePaths(3, 7)); // expected 28
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int uniquePaths(int m, int n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << uniquePaths(3, 7) << "\\n";  // expected 28
    return 0;
}
`,
  },
};

export default problem;
