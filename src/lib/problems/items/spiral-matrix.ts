import type { Problem } from "../types";

const problem: Problem = {
  id: "spiral-matrix",
  title: "Spiral Matrix",
  difficulty: "Medium",
  topic: "Matrix",
  summary: "Read a matrix in clockwise spiral order.",
  prompt:
    "Given an `m x n` matrix, return all of its elements in clockwise spiral " +
    "order, starting from the top-left corner.",
  examples: [
    {
      input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]",
      explanation: "Across the top, down the right, back along the bottom, and inward.",
    },
    {
      input: "matrix = [[1,2],[3,4]]",
      output: "[1, 2, 4, 3]",
    },
  ],
  constraints: [
    "m == matrix.length, n == matrix[i].length",
    "1 <= m, n <= 10",
    "-100 <= matrix[i][j] <= 100",
  ],
  starters: {
    python: `def spiral_order(matrix):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected [1, 2, 3, 6, 9, 8, 7, 4, 5]
    print(spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
`,
    javascript: `function spiralOrder(matrix) {
  // Write your solution here
}

// expected [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
`,
    typescript: `function spiralOrder(matrix: number[][]): number[] {
  // Write your solution here
  return [];
}

// expected [ 1, 2, 3, 6, 9, 8, 7, 4, 5 ]
console.log(spiralOrder([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
`,
    java: `import java.util.List;

public class Main {
    static List<Integer> spiralOrder(int[][] matrix) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        // expected [1, 2, 3, 6, 9, 8, 7, 4, 5]
        System.out.println(spiralOrder(matrix));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& matrix) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    // expected 1 2 3 6 9 8 7 4 5
    for (int v : spiralOrder(matrix)) cout << v << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
