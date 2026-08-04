import type { Problem } from "../types";

const problem: Problem = {
  id: "word-search-ii",
  title: "Word Search II",
  difficulty: "Hard",
  topic: "Tree",
  summary: "Find every dictionary word hidden in a letter grid.",
  prompt:
    "Given an `m x n` board of characters and a list of `words`, return all " +
    "the words that can be traced through the board.\n\n" +
    "Letters must be adjacent horizontally or vertically, and a cell may not " +
    "be reused within a single word. Searching each word independently is too " +
    "slow — a trie over the word list lets one traversal chase them all.",
  examples: [
    {
      input:
        'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ' +
        'words = ["oath","pea","eat","rain"]',
      output: '["oath", "eat"]',
      explanation: "The words may be returned in any order.",
    },
    {
      input: 'board = [["a","b"],["c","d"]], words = ["abcb"]',
      output: "[]",
      explanation: "Tracing abcb would reuse the cell holding b.",
    },
  ],
  constraints: [
    "m == board.length, n == board[i].length",
    "1 <= m, n <= 12",
    "1 <= words.length <= 3 * 10^4",
    "1 <= words[i].length <= 10",
    "All words are unique and consist of lowercase English letters.",
  ],
  starters: {
    python: `def find_words(board, words):
    # Write your solution here
    pass


if __name__ == "__main__":
    board = [
        ["o", "a", "a", "n"],
        ["e", "t", "a", "e"],
        ["i", "h", "k", "r"],
        ["i", "f", "l", "v"],
    ]
    # expected ['oath', 'eat'] in some order
    print(find_words(board, ["oath", "pea", "eat", "rain"]))
`,
    javascript: `function findWords(board, words) {
  // Write your solution here
}

const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
// expected [ 'oath', 'eat' ] in some order
console.log(findWords(board, ["oath", "pea", "eat", "rain"]));
`,
    typescript: `function findWords(board: string[][], words: string[]): string[] {
  // Write your solution here
  return [];
}

const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
// expected [ 'oath', 'eat' ] in some order
console.log(findWords(board, ["oath", "pea", "eat", "rain"]));
`,
    java: `import java.util.List;

public class Main {
    static List<String> findWords(char[][] board, String[] words) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        char[][] board = {
            {'o', 'a', 'a', 'n'},
            {'e', 't', 'a', 'e'},
            {'i', 'h', 'k', 'r'},
            {'i', 'f', 'l', 'v'},
        };
        String[] words = {"oath", "pea", "eat", "rain"};
        // expected [oath, eat] in some order
        System.out.println(findWords(board, words));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
    // Write your solution here
    return {};
}

int main() {
    vector<vector<char>> board = {
        {'o', 'a', 'a', 'n'},
        {'e', 't', 'a', 'e'},
        {'i', 'h', 'k', 'r'},
        {'i', 'f', 'l', 'v'},
    };
    vector<string> words = {"oath", "pea", "eat", "rain"};
    // expected oath eat in some order
    for (auto& w : findWords(board, words)) cout << w << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
