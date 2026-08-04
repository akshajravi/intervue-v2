import type { Problem } from "../types";

const problem: Problem = {
  id: "number-of-connected-components",
  title: "Number of Connected Components in an Undirected Graph",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Count the separate pieces of an undirected graph.",
  prompt:
    "You are given `n` nodes labelled 0 to n - 1 and a list of undirected " +
    "`edges`.\n\n" +
    "Return the number of connected components. An isolated node is a " +
    "component of its own.",
  examples: [
    {
      input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
      output: "2",
      explanation: "{0,1,2} form one component and {3,4} the other.",
    },
    {
      input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
      output: "1",
    },
  ],
  constraints: [
    "1 <= n <= 2000",
    "0 <= edges.length <= 5000",
    "There are no self-loops or repeated edges.",
  ],
  starters: {
    python: `def count_components(n, edges):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(count_components(5, [[0, 1], [1, 2], [3, 4]]))  # expected 2
`,
    javascript: `function countComponents(n, edges) {
  // Write your solution here
}

console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]])); // expected 2
`,
    typescript: `function countComponents(n: number, edges: number[][]): number {
  // Write your solution here
  return 0;
}

console.log(countComponents(5, [[0, 1], [1, 2], [3, 4]])); // expected 2
`,
    java: `public class Main {
    static int countComponents(int n, int[][] edges) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[][] edges = {{0, 1}, {1, 2}, {3, 4}};
        System.out.println(countComponents(5, edges)); // expected 2
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int countComponents(int n, vector<vector<int>>& edges) {
    // Write your solution here
    return 0;
}

int main() {
    vector<vector<int>> edges = {{0, 1}, {1, 2}, {3, 4}};
    cout << countComponents(5, edges) << "\\n";  // expected 2
    return 0;
}
`,
  },
};

export default problem;
