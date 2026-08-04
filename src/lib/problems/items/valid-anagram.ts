import type { Problem } from "../types";

const problem: Problem = {
  id: "valid-anagram",
  title: "Valid Anagram",
  difficulty: "Easy",
  topic: "String",
  summary: "Check whether one string is a rearrangement of another.",
  prompt:
    "Given two strings `s` and `t`, return `true` if `t` is an anagram of " +
    "`s` — that is, if it uses exactly the same letters the same number of " +
    "times — and `false` otherwise.",
  examples: [
    {
      input: 's = "anagram", t = "nagaram"',
      output: "true",
    },
    {
      input: 's = "rat", t = "car"',
      output: "false",
      explanation: "The letter counts differ, so one is not a rearrangement of the other.",
    },
  ],
  constraints: [
    "1 <= s.length, t.length <= 5 * 10^4",
    "s and t consist of lowercase English letters.",
  ],
  starters: {
    python: `def is_anagram(s, t):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(is_anagram("anagram", "nagaram"))  # expected True
`,
    javascript: `function isAnagram(s, t) {
  // Write your solution here
}

console.log(isAnagram("anagram", "nagaram")); // expected true
`,
    typescript: `function isAnagram(s: string, t: string): boolean {
  // Write your solution here
  return false;
}

console.log(isAnagram("anagram", "nagaram")); // expected true
`,
    java: `public class Main {
    static boolean isAnagram(String s, String t) {
        // Write your solution here
        return false;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string s, string t) {
    // Write your solution here
    return false;
}

int main() {
    // expected true
    cout << (isAnagram("anagram", "nagaram") ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
