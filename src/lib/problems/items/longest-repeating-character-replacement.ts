import type { Problem } from "../types";

const problem: Problem = {
  id: "longest-repeating-character-replacement",
  title: "Longest Repeating Character Replacement",
  difficulty: "Medium",
  topic: "String",
  summary: "Grow the longest single-letter run using k replacements.",
  prompt:
    "You are given a string `s` of uppercase English letters and an integer " +
    "`k`. You may choose any `k` positions in the string and change each to " +
    "any uppercase letter.\n\n" +
    "Return the length of the longest substring containing a single repeated " +
    "letter that you can produce this way.",
  examples: [
    {
      input: 's = "ABAB", k = 2',
      output: "4",
      explanation: 'Replace the two A\'s with B\'s to get "BBBB".',
    },
    {
      input: 's = "AABABBA", k = 1',
      output: "4",
      explanation:
        'Replace the middle A to get "AABBBBA", whose longest run is "BBBB".',
    },
  ],
  constraints: [
    "1 <= s.length <= 10^5",
    "s consists of uppercase English letters.",
    "0 <= k <= s.length",
  ],
  starters: {
    python: `def character_replacement(s, k):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(character_replacement("ABAB", 2))  # expected 4
`,
    javascript: `function characterReplacement(s, k) {
  // Write your solution here
}

console.log(characterReplacement("ABAB", 2)); // expected 4
`,
    typescript: `function characterReplacement(s: string, k: number): number {
  // Write your solution here
  return 0;
}

console.log(characterReplacement("ABAB", 2)); // expected 4
`,
    java: `public class Main {
    static int characterReplacement(String s, int k) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(characterReplacement("ABAB", 2)); // expected 4
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int characterReplacement(string s, int k) {
    // Write your solution here
    return 0;
}

int main() {
    cout << characterReplacement("ABAB", 2) << "\\n";  // expected 4
    return 0;
}
`,
  },
};

export default problem;
