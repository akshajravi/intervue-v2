import type { Problem } from "../types";

const problem: Problem = {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  difficulty: "Easy",
  topic: "String",
  summary: "Decide whether a string of brackets is properly nested.",
  prompt:
    "Given a string `s` containing only the characters `(`, `)`, `{`, `}`, " +
    "`[` and `]`, decide whether it is valid.\n\n" +
    "A string is valid when every open bracket is closed by the same type of " +
    "bracket, brackets close in the correct order, and every closing bracket " +
    "has a matching opening bracket before it.",
  examples: [
    {
      input: 's = "()[]{}"',
      output: "true",
    },
    {
      input: 's = "(]"',
      output: "false",
      explanation: "The `(` is closed by a `]`, which is the wrong type.",
    },
  ],
  constraints: [
    "1 <= s.length <= 10^4",
    "s consists only of the characters ()[]{}.",
  ],
  starters: {
    python: `def is_valid(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(is_valid("()[]{}"))  # expected True
`,
    javascript: `function isValid(s) {
  // Write your solution here
}

console.log(isValid("()[]{}")); // expected true
`,
    typescript: `function isValid(s: string): boolean {
  // Write your solution here
  return false;
}

console.log(isValid("()[]{}")); // expected true
`,
    java: `public class Main {
    static boolean isValid(String s) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isValid("()[]{}")); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    // Write your solution here
    return false;
}

int main() {
    // expected true
    cout << (isValid("()[]{}") ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
