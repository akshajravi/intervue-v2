import type { Problem } from "../types";

const problem: Problem = {
  id: "decode-ways",
  title: "Decode Ways",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Count the readings of a digit string as A–Z.",
  prompt:
    "Letters map to numbers as A = 1 through Z = 26. Given a string `s` of " +
    "digits, count the ways it can be decoded back into letters.\n\n" +
    "A leading zero is never valid, so \"06\" cannot be read as 6.",
  examples: [
    {
      input: 's = "226"',
      output: "3",
      explanation: '"BZ" (2 26), "VF" (22 6) and "BBF" (2 2 6).',
    },
    {
      input: 's = "06"',
      output: "0",
      explanation: "No letter maps to a number with a leading zero.",
    },
  ],
  constraints: ["1 <= s.length <= 100", "s consists of digits only."],
  starters: {
    python: `def num_decodings(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(num_decodings("226"))  # expected 3
`,
    javascript: `function numDecodings(s) {
  // Write your solution here
}

console.log(numDecodings("226")); // expected 3
`,
    typescript: `function numDecodings(s: string): number {
  // Write your solution here
  return 0;
}

console.log(numDecodings("226")); // expected 3
`,
    java: `public class Main {
    static int numDecodings(String s) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(numDecodings("226")); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int numDecodings(string s) {
    // Write your solution here
    return 0;
}

int main() {
    cout << numDecodings("226") << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
