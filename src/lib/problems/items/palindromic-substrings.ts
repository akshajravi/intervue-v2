import type { Problem } from "../types";

const problem: Problem = {
  id: "palindromic-substrings",
  title: "Palindromic Substrings",
  difficulty: "Medium",
  topic: "String",
  summary: "Count every palindromic substring, including single letters.",
  prompt:
    "Given a string `s`, return the number of palindromic substrings it " +
    "contains.\n\n" +
    "Two substrings count separately if they start or end at different " +
    "positions, even when they consist of the same characters.",
  examples: [
    {
      input: 's = "abc"',
      output: "3",
      explanation: 'The three single characters "a", "b" and "c".',
    },
    {
      input: 's = "aaa"',
      output: "6",
      explanation: '"a", "a", "a", "aa", "aa" and "aaa".',
    },
  ],
  constraints: [
    "1 <= s.length <= 1000",
    "s consists of lowercase English letters.",
  ],
  starters: {
    python: `def count_substrings(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(count_substrings("abc"))  # expected 3
`,
    javascript: `function countSubstrings(s) {
  // Write your solution here
}

console.log(countSubstrings("abc")); // expected 3
`,
    typescript: `function countSubstrings(s: string): number {
  // Write your solution here
  return 0;
}

console.log(countSubstrings("abc")); // expected 3
`,
    java: `public class Main {
    static int countSubstrings(String s) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(countSubstrings("abc")); // expected 3
    }
}
`,
    // countSubstrings rather than count: <bits/stdc++.h> plus "using namespace
    // std" brings std::count into scope, and sharing the name is an
    // overload-resolution trap.
    cpp: `#include <bits/stdc++.h>
using namespace std;

int countSubstrings(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << countSubstrings("abc") << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
