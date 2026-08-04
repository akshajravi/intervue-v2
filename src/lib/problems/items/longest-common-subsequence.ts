import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-common-subsequence",
  title: "Longest Common Subsequence",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Measure the longest subsequence shared by two strings.",
  prompt:
    "Given two strings `text1` and `text2`, return the length of their " +
    "longest common subsequence, or 0 if there isn't one.\n\n" +
    "A subsequence keeps relative order but may skip characters; it does not " +
    "have to be contiguous.",
  examples: [
    {
      input: 'text1 = "abcde", text2 = "ace"',
      output: "3",
      explanation: '"ace" appears in both, in order.',
    },
    {
      input: 'text1 = "abc", text2 = "def"',
      output: "0",
    },
  ],
  constraints: [
    "1 <= text1.length, text2.length <= 1000",
    "Both strings consist of lowercase English characters.",
  ],
  starters: {
    python: `def longest_common_subsequence(text1, text2):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(longest_common_subsequence("abcde", "ace"))  # expected 3
`,
    javascript: `function longestCommonSubsequence(text1, text2) {
  // Write your solution here
}

console.log(longestCommonSubsequence("abcde", "ace")); // expected 3
`,
    typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  // Write your solution here
  return 0;
}

console.log(longestCommonSubsequence("abcde", "ace")); // expected 3
`,
    java: `public class Main {
    static int longestCommonSubsequence(String text1, String text2) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(longestCommonSubsequence("abcde", "ace")); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int longestCommonSubsequence(string text1, string text2) {
    // Write your solution here
    return 0;
}

int main() {
    cout << longestCommonSubsequence("abcde", "ace") << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
