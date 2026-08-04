import type { Problem } from "../types";

const problem: Problem = {
  id: "minimum-window-substring",
  title: "Minimum Window Substring",
  difficulty: "Hard",
  topic: "String",
  summary: "Find the shortest window covering every character of a pattern.",
  prompt:
    "Given strings `s` and `t`, return the shortest substring of `s` that " +
    "contains every character of `t`, counting duplicates. If no such window " +
    "exists, return the empty string.\n\n" +
    "The answer is guaranteed to be unique.",
  examples: [
    {
      input: 's = "ADOBECODEBANC", t = "ABC"',
      output: '"BANC"',
      explanation: '"BANC" is the shortest window containing an A, a B and a C.',
    },
    {
      input: 's = "a", t = "aa"',
      output: '""',
      explanation: '"a" has only one a, so it can never cover two.',
    },
  ],
  constraints: [
    "1 <= s.length, t.length <= 10^5",
    "s and t consist of uppercase and lowercase English letters.",
  ],
  starters: {
    python: `def min_window(s, t):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(min_window("ADOBECODEBANC", "ABC"))  # expected "BANC"
`,
    javascript: `function minWindow(s, t) {
  // Write your solution here
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // expected "BANC"
`,
    typescript: `function minWindow(s: string, t: string): string {
  // Write your solution here
  return "";
}

console.log(minWindow("ADOBECODEBANC", "ABC")); // expected "BANC"
`,
    java: `public class Main {
    static String minWindow(String s, String t) {
        // Write your solution here
        return "";
    }

    public static void main(String[] args) {
        // expected "BANC"
        System.out.println(minWindow("ADOBECODEBANC", "ABC"));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

string minWindow(string s, string t) {
    // Write your solution here
    return "";
}

int main() {
    // expected "BANC"
    cout << minWindow("ADOBECODEBANC", "ABC") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
