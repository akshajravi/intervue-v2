import type { Problem } from "../types";

const problem: Problem = {
  id: "pacific-atlantic-water-flow",
  title: "Pacific Atlantic Water Flow",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Find cells that drain to both oceans.",
  prompt:
    "You are given an `m x n` grid of heights. The Pacific touches the top " +
    "and left edges; the Atlantic touches the bottom and right edges.\n\n" +
    "Water flows from a cell to a neighbour of equal or lower height. Return " +
    "the coordinates of every cell from which water can reach both oceans.",
  examples: [
    {
      input:
        "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
      output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
      explanation: "The coordinates may be returned in any order.",
    },
    {
      input: "heights = [[1]]",
      output: "[[0,0]]",
      explanation: "The single cell touches every edge.",
    },
  ],
  constraints: [
    "m == heights.length, n == heights[i].length",
    "1 <= m, n <= 200",
    "0 <= heights[i][j] <= 10^5",
  ],
  starters: {
    python: `def pacific_atlantic(heights):
    # Write your solution here
    pass


if __name__ == "__main__":
    heights = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1],
        [6, 7, 1, 4, 5],
        [5, 1, 1, 2, 4],
    ]
    # expected [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] in some order
    print(pacific_atlantic(heights))
`,
    javascript: `function pacificAtlantic(heights) {
  // Write your solution here
}

const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];
// expected [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] in some order
console.log(pacificAtlantic(heights));
`,
    typescript: `function pacificAtlantic(heights: number[][]): number[][] {
  // Write your solution here
  return [];
}

const heights = [
  [1, 2, 2, 3, 5],
  [3, 2, 3, 4, 4],
  [2, 4, 5, 3, 1],
  [6, 7, 1, 4, 5],
  [5, 1, 1, 2, 4],
];
// expected [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]] in some order
console.log(pacificAtlantic(heights));
`,
    java: `import java.util.List;

public class Main {
    static List<List<Integer>> pacificAtlantic(int[][] heights) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        int[][] heights = {
            {1, 2, 2, 3, 5},
            {3, 2, 3, 4, 4},
            {2, 4, 5, 3, 1},
            {6, 7, 1, 4, 5},
            {5, 1, 1, 2, 4},
        };
        // expected [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] in some order
        System.out.println(pacificAtlantic(heights));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> heights = {
        {1, 2, 2, 3, 5},
        {3, 2, 3, 4, 4},
        {2, 4, 5, 3, 1},
        {6, 7, 1, 4, 5},
        {5, 1, 1, 2, 4},
    };
    // expected [0,4] [1,3] [1,4] [2,2] [3,0] [3,1] [4,0] in some order
    for (auto& c : pacificAtlantic(heights)) cout << "[" << c[0] << "," << c[1] << "] ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
