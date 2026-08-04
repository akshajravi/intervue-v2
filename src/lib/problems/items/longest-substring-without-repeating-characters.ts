import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-substring-without-repeating-characters",
  title: "Longest Substring Without Repeating Characters",
  difficulty: "Medium",
  topic: "String",
  summary: "Measure the longest window with no repeated character.",
  prompt:
    "Given a string `s`, return the length of the longest substring that " +
    "contains no repeated characters.\n\n" +
    "A substring is a contiguous run of characters — not a subsequence.",
  examples: [
    {
      input: 's = "abcabcbb"',
      output: "3",
      explanation: 'The answer is "abc", with length 3.',
    },
    {
      input: 's = "bbbbb"',
      output: "1",
      explanation: 'The answer is "b".',
    },
  ],
  constraints: [
    "0 <= s.length <= 5 * 10^4",
    "s consists of English letters, digits, symbols and spaces.",
  ],
  starters: {
    python: `def length_of_longest_substring(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(length_of_longest_substring("abcabcbb"))  # expected 3
`,
    javascript: `function lengthOfLongestSubstring(s) {
  // Write your solution here
}

console.log(lengthOfLongestSubstring("abcabcbb")); // expected 3
`,
    typescript: `function lengthOfLongestSubstring(s: string): number {
  // Write your solution here
  return 0;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // expected 3
`,
    java: `public class Main {
    static int lengthOfLongestSubstring(String s) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb") << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
