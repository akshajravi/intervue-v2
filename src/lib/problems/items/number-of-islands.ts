import type { Problem } from "../types";

const problem: Problem = {
  id: "number-of-islands",
  title: "Number of Islands",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Count connected regions of land in a grid.",
  prompt:
    "Given an `m x n` grid of '1's (land) and '0's (water), count the number " +
    "of islands.\n\n" +
    "An island is a group of land cells connected horizontally or vertically. " +
    "Assume everything outside the grid is water.",
  examples: [
    {
      input:
        'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
      output: "1",
      explanation: "All the land is connected into a single island.",
    },
    {
      input:
        'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
      output: "3",
    },
  ],
  constraints: [
    "m == grid.length, n == grid[i].length",
    "1 <= m, n <= 300",
    "grid[i][j] is '0' or '1'.",
  ],
  starters: {
    python: `def num_islands(grid):
    # Write your solution here
    pass


if __name__ == "__main__":
    grid = [
        ["1", "1", "0", "0", "0"],
        ["1", "1", "0", "0", "0"],
        ["0", "0", "1", "0", "0"],
        ["0", "0", "0", "1", "1"],
    ]
    print(num_islands(grid))  # expected 3
`,
    javascript: `function numIslands(grid) {
  // Write your solution here
}

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log(numIslands(grid)); // expected 3
`,
    typescript: `function numIslands(grid: string[][]): number {
  // Write your solution here
  return 0;
}

const grid = [
  ["1", "1", "0", "0", "0"],
  ["1", "1", "0", "0", "0"],
  ["0", "0", "1", "0", "0"],
  ["0", "0", "0", "1", "1"],
];
console.log(numIslands(grid)); // expected 3
`,
    java: `public class Main {
    static int numIslands(char[][] grid) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        char[][] grid = {
            {'1', '1', '0', '0', '0'},
            {'1', '1', '0', '0', '0'},
            {'0', '0', '1', '0', '0'},
            {'0', '0', '0', '1', '1'},
        };
        System.out.println(numIslands(grid)); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int numIslands(vector<vector<char>>& grid) {
    // Write your solution here
    return 0;
}

int main() {
    vector<vector<char>> grid = {
        {'1', '1', '0', '0', '0'},
        {'1', '1', '0', '0', '0'},
        {'0', '0', '1', '0', '0'},
        {'0', '0', '0', '1', '1'},
    };
    cout << numIslands(grid) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
