import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-palindromic-substring",
  title: "Longest Palindromic Substring",
  difficulty: "Medium",
  topic: "String",
  summary: "Return the longest substring that reads the same both ways.",
  prompt:
    "Given a string `s`, return the longest substring of `s` that is a " +
    "palindrome.\n\n" +
    "If several substrings tie for longest, returning any one of them is fine.",
  examples: [
    {
      input: 's = "babad"',
      output: '"bab"',
      explanation: '"aba" is also a valid answer.',
    },
    {
      input: 's = "cbbd"',
      output: '"bb"',
    },
  ],
  constraints: [
    "1 <= s.length <= 1000",
    "s consists of digits and English letters.",
  ],
  starters: {
    python: `def longest_palindrome(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(longest_palindrome("babad"))  # expected "bab" (or "aba")
`,
    javascript: `function longestPalindrome(s) {
  // Write your solution here
}

console.log(longestPalindrome("babad")); // expected "bab" (or "aba")
`,
    typescript: `function longestPalindrome(s: string): string {
  // Write your solution here
  return "";
}

console.log(longestPalindrome("babad")); // expected "bab" (or "aba")
`,
    java: `public class Main {
    static String longestPalindrome(String s) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        // expected "bab" (or "aba")
        System.out.println(longestPalindrome("babad"));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

string longestPalindrome(string s) {
    // Write your solution here
    return "";
}

int main() {
    // expected "bab" (or "aba")
    cout << longestPalindrome("babad") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
