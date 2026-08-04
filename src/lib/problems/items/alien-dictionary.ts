import type { Problem } from "../types";

const problem: Problem = {
  id: "alien-dictionary",
  title: "Alien Dictionary",
  difficulty: "Hard",
  topic: "Graph",
  summary: "Recover a letter ordering from a sorted word list.",
  prompt:
    "You are given a list of `words` from an alien language, sorted according " +
    "to that language's alphabet.\n\n" +
    "Return a string of the language's letters in order. If the ordering is " +
    "ambiguous, any valid ordering is fine; if the input is inconsistent, " +
    "return the empty string.",
  examples: [
    {
      input: 'words = ["wrt", "wrf", "er", "ett", "rftt"]',
      output: '"wertf"',
      explanation:
        '"wrt" before "wrf" gives t < f; "wrf" before "er" gives w < e, and so on.',
    },
    {
      input: 'words = ["abc", "ab"]',
      output: '""',
      explanation: "A prefix sorting after the longer word is impossible.",
    },
  ],
  constraints: [
    "1 <= words.length <= 100",
    "1 <= words[i].length <= 100",
    "words[i] consists of lowercase English letters.",
  ],
  starters: {
    python: `def alien_order(words):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(alien_order(["wrt", "wrf", "er", "ett", "rftt"]))  # expected "wertf"
`,
    javascript: `function alienOrder(words) {
  // Write your solution here
}

console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // expected "wertf"
`,
    typescript: `function alienOrder(words: string[]): string {
  // Write your solution here
  return "";
}

console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // expected "wertf"
`,
    java: `public class Main {
    static String alienOrder(String[] words) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        String[] words = {"wrt", "wrf", "er", "ett", "rftt"};
        System.out.println(alienOrder(words)); // expected "wertf"
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

string alienOrder(vector<string>& words) {
    // Write your solution here
    return "";
}

int main() {
    vector<string> words = {"wrt", "wrf", "er", "ett", "rftt"};
    cout << alienOrder(words) << "\\n";  // expected "wertf"
    return 0;
}
`,
  },
};

export default problem;
