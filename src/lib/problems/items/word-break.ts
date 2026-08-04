import type { Problem } from "../types";

const problem: Problem = {
  id: "word-break",
  title: "Word Break",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Decide whether a string splits into dictionary words.",
  prompt:
    "Given a string `s` and a dictionary `wordDict`, return `true` if `s` can " +
    "be segmented into a sequence of one or more dictionary words.\n\n" +
    "Words may be reused any number of times.",
  examples: [
    {
      input: 's = "leetcode", wordDict = ["leet", "code"]',
      output: "true",
      explanation: '"leetcode" splits into "leet" and "code".',
    },
    {
      input: 's = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]',
      output: "false",
      explanation: "Every greedy split leaves an unusable remainder.",
    },
  ],
  constraints: [
    "1 <= s.length <= 300",
    "1 <= wordDict.length <= 1000",
    "1 <= wordDict[i].length <= 20",
    "s and wordDict[i] consist of lowercase English letters.",
  ],
  starters: {
    python: `def word_break(s, word_dict):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(word_break("leetcode", ["leet", "code"]))  # expected True
`,
    javascript: `function wordBreak(s, wordDict) {
  // Write your solution here
}

console.log(wordBreak("leetcode", ["leet", "code"])); // expected true
`,
    typescript: `function wordBreak(s: string, wordDict: string[]): boolean {
  // Write your solution here
  return false;
}

console.log(wordBreak("leetcode", ["leet", "code"])); // expected true
`,
    java: `import java.util.List;

public class Main {
    static boolean wordBreak(String s, List<String> wordDict) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        // expected true
        System.out.println(wordBreak("leetcode", List.of("leet", "code")));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool wordBreak(string s, vector<string>& wordDict) {
    // Write your solution here
    return false;
}

int main() {
    vector<string> wordDict = {"leet", "code"};
    // expected true
    cout << (wordBreak("leetcode", wordDict) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
