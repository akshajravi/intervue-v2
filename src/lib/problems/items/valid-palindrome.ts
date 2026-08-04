import type { Problem } from "../types";

const problem: Problem = {
  id: "valid-palindrome",
  title: "Valid Palindrome",
  difficulty: "Easy",
  topic: "String",
  summary: "Check for a palindrome, ignoring case and punctuation.",
  prompt:
    "A phrase is a palindrome if, after lowercasing it and removing every " +
    "character that isn't a letter or digit, it reads the same forwards and " +
    "backwards.\n\n" +
    "Given a string `s`, return `true` if it is a palindrome and `false` " +
    "otherwise.",
  examples: [
    {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" reads the same in both directions.',
    },
    {
      input: 's = "race a car"',
      output: "false",
      explanation: '"raceacar" is not a palindrome.',
    },
  ],
  constraints: [
    "1 <= s.length <= 2 * 10^5",
    "s consists of printable ASCII characters.",
  ],
  starters: {
    python: `def is_palindrome(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(is_palindrome("A man, a plan, a canal: Panama"))  # expected True
`,
    javascript: `function isPalindrome(s) {
  // Write your solution here
}

// expected true
console.log(isPalindrome("A man, a plan, a canal: Panama"));
`,
    typescript: `function isPalindrome(s: string): boolean {
  // Write your solution here
  return false;
}

// expected true
console.log(isPalindrome("A man, a plan, a canal: Panama"));
`,
    java: `public class Main {
    static boolean isPalindrome(String s) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        // expected true
        System.out.println(isPalindrome("A man, a plan, a canal: Panama"));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(string s) {
    // Write your solution here
    return false;
}

int main() {
    // expected true
    cout << (isPalindrome("A man, a plan, a canal: Panama") ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
