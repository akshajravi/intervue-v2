import type { Problem } from "../types";

const problem: Problem = {
  id: "graph-valid-tree",
  title: "Graph Valid Tree",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Check whether an undirected graph is exactly a tree.",
  prompt:
    "You are given `n` nodes labelled 0 to n - 1 and a list of undirected " +
    "`edges`. Return `true` if these edges form a valid tree.\n\n" +
    "A tree is connected and has no cycles — which, for n nodes, means " +
    "exactly n - 1 edges plus connectivity.",
  examples: [
    {
      input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
      output: "true",
    },
    {
      input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
      output: "false",
      explanation: "1 → 2 → 3 → 1 is a cycle.",
    },
  ],
  constraints: [
    "1 <= n <= 2000",
    "0 <= edges.length <= 5000",
    "There are no self-loops or repeated edges.",
  ],
  starters: {
    python: `def valid_tree(n, edges):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(valid_tree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]))  # expected True
`,
    javascript: `function validTree(n, edges) {
  // Write your solution here
}

// expected true
console.log(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]));
`,
    typescript: `function validTree(n: number, edges: number[][]): boolean {
  // Write your solution here
  return false;
}

// expected true
console.log(validTree(5, [[0, 1], [0, 2], [0, 3], [1, 4]]));
`,
    java: `public class Main {
    static boolean validTree(int n, int[][] edges) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        int[][] edges = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};
        System.out.println(validTree(5, edges)); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool validTree(int n, vector<vector<int>>& edges) {
    // Write your solution here
    return false;
}

int main() {
    vector<vector<int>> edges = {{0, 1}, {0, 2}, {0, 3}, {1, 4}};
    // expected true
    cout << (validTree(5, edges) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
