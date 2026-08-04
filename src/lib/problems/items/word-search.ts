import type { Problem } from "../types";

const problem: Problem = {
  id: "word-search",
  title: "Word Search",
  difficulty: "Medium",
  topic: "Matrix",
  summary: "Trace a word through adjacent cells of a letter grid.",
  prompt:
    "Given an `m x n` grid of characters `board` and a string `word`, return " +
    "`true` if the word can be traced through the grid.\n\n" +
    "Letters must be adjacent horizontally or vertically, and the same cell " +
    "may not be used twice in one word.",
  examples: [
    {
      input:
        'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
      output: "true",
      explanation: "A→B→C across the top, then down to C and along to E and D.",
    },
    {
      input:
        'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"',
      output: "false",
      explanation: "Reaching the second B would mean reusing the first one's cell.",
    },
  ],
  constraints: [
    "m == board.length, n == board[i].length",
    "1 <= m, n <= 6",
    "1 <= word.length <= 15",
    "board and word consist of English letters.",
  ],
  starters: {
    python: `def exist(board, word):
    # Write your solution here
    pass


if __name__ == "__main__":
    board = [
        ["A", "B", "C", "E"],
        ["S", "F", "C", "S"],
        ["A", "D", "E", "E"],
    ]
    print(exist(board, "ABCCED"))  # expected True
`,
    javascript: `function exist(board, word) {
  // Write your solution here
}

const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
console.log(exist(board, "ABCCED")); // expected true
`,
    typescript: `function exist(board: string[][], word: string): boolean {
  // Write your solution here
  return false;
}

const board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
console.log(exist(board, "ABCCED")); // expected true
`,
    java: `public class Main {
    static boolean exist(char[][] board, String word) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        char[][] board = {
            {'A', 'B', 'C', 'E'},
            {'S', 'F', 'C', 'S'},
            {'A', 'D', 'E', 'E'},
        };
        System.out.println(exist(board, "ABCCED")); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool exist(vector<vector<char>>& board, string word) {
    // Write your solution here
    return false;
}

int main() {
    vector<vector<char>> board = {
        {'A', 'B', 'C', 'E'},
        {'S', 'F', 'C', 'S'},
        {'A', 'D', 'E', 'E'},
    };
    // expected true
    cout << (exist(board, "ABCCED") ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
