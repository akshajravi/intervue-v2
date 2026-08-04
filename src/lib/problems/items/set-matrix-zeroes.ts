import type { Problem } from "../types";

const problem: Problem = {
  id: "set-matrix-zeroes",
  title: "Set Matrix Zeroes",
  difficulty: "Medium",
  topic: "Matrix",
  summary: "Blank out the row and column of every zero, in place.",
  prompt:
    "Given an `m x n` integer matrix, if an element is 0, set its entire row " +
    "and its entire column to 0. Do it in place.\n\n" +
    "The obvious solution uses O(m + n) extra space; there is a way to do it " +
    "with O(1).",
  examples: [
    {
      input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
      output: "[[1,0,1],[0,0,0],[1,0,1]]",
      explanation: "The single 0 blanks out row 1 and column 1.",
    },
    {
      input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]",
      output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]",
    },
  ],
  constraints: [
    "m == matrix.length, n == matrix[0].length",
    "1 <= m, n <= 200",
    "-2^31 <= matrix[i][j] <= 2^31 - 1",
  ],
  starters: {
    python: `def set_zeroes(matrix):
    """Modifies matrix in place; returns nothing."""
    # Write your solution here
    pass


if __name__ == "__main__":
    matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    set_zeroes(matrix)
    print(matrix)  # expected [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
`,
    javascript: `// Modifies matrix in place; returns nothing.
function setZeroes(matrix) {
  // Write your solution here
}

const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
setZeroes(matrix);
// expected [ [ 1, 0, 1 ], [ 0, 0, 0 ], [ 1, 0, 1 ] ]
console.log(matrix);
`,
    typescript: `// Modifies matrix in place; returns nothing.
function setZeroes(matrix: number[][]): void {
  // Write your solution here
}

const matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
setZeroes(matrix);
// expected [ [ 1, 0, 1 ], [ 0, 0, 0 ], [ 1, 0, 1 ] ]
console.log(matrix);
`,
    java: `import java.util.Arrays;

public class Main {
    // Modifies matrix in place; returns nothing.
    static void setZeroes(int[][] matrix) {
        // Write your solution here
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
        setZeroes(matrix);
        // expected [[1, 0, 1], [0, 0, 0], [1, 0, 1]]
        System.out.println(Arrays.deepToString(matrix));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Modifies matrix in place; returns nothing.
void setZeroes(vector<vector<int>>& matrix) {
    // Write your solution here
}

int main() {
    vector<vector<int>> matrix = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
    setZeroes(matrix);
    // expected [1,0,1] [0,0,0] [1,0,1]
    for (auto& row : matrix) {
        cout << "[";
        for (size_t i = 0; i < row.size(); i++) cout << (i ? "," : "") << row[i];
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
