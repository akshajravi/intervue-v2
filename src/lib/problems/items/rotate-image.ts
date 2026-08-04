import type { Problem } from "../types";

const problem: Problem = {
  id: "rotate-image",
  title: "Rotate Image",
  difficulty: "Medium",
  topic: "Matrix",
  summary: "Turn a square matrix 90 degrees clockwise, in place.",
  prompt:
    "You are given an `n x n` matrix representing an image. Rotate it 90 " +
    "degrees clockwise, in place.\n\n" +
    "You may not allocate another matrix — modify the input directly.",
  examples: [
    {
      input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
      output: "[[7,4,1],[8,5,2],[9,6,3]]",
      explanation: "The first column, read bottom-to-top, becomes the first row.",
    },
    {
      input: "matrix = [[1,2],[3,4]]",
      output: "[[3,1],[4,2]]",
    },
  ],
  constraints: [
    "n == matrix.length == matrix[i].length",
    "1 <= n <= 20",
    "-1000 <= matrix[i][j] <= 1000",
  ],
  starters: {
    python: `def rotate(matrix):
    """Rotates matrix in place; returns nothing."""
    # Write your solution here
    pass


if __name__ == "__main__":
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    rotate(matrix)
    print(matrix)  # expected [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
`,
    javascript: `// Rotates matrix in place; returns nothing.
function rotate(matrix) {
  // Write your solution here
}

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
rotate(matrix);
// expected [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
console.log(matrix);
`,
    typescript: `// Rotates matrix in place; returns nothing.
function rotate(matrix: number[][]): void {
  // Write your solution here
}

const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
rotate(matrix);
// expected [ [ 7, 4, 1 ], [ 8, 5, 2 ], [ 9, 6, 3 ] ]
console.log(matrix);
`,
    java: `import java.util.Arrays;

public class Main {
    // Rotates matrix in place; returns nothing.
    static void rotate(int[][] matrix) {
        // Write your solution here
    }

    public static void main(String[] args) {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        rotate(matrix);
        // expected [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
        System.out.println(Arrays.deepToString(matrix));
    }
}
`,
    // rotateImage rather than rotate: <bits/stdc++.h> plus "using namespace
    // std" pulls in std::rotate, and the overload ambiguity that follows is a
    // miserable thing to debug under interview pressure.
    cpp: `#include <bits/stdc++.h>
using namespace std;

// Rotates matrix in place; returns nothing.
void rotateImage(vector<vector<int>>& matrix) {
    // Write your solution here
}

int main() {
    vector<vector<int>> matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    rotateImage(matrix);
    // expected [7,4,1] [8,5,2] [9,6,3]
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
