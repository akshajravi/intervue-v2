import type { Problem } from "../types";

const problem: Problem = {
  id: "number-of-1-bits",
  title: "Number of 1 Bits",
  difficulty: "Easy",
  topic: "Binary",
  summary: "Count the set bits in an unsigned 32-bit integer.",
  prompt:
    "Given an unsigned 32-bit integer `n`, return the number of bits set to " +
    "1 in its binary representation (its Hamming weight).",
  examples: [
    {
      input: "n = 11",
      output: "3",
      explanation: "11 is 00000000000000000000000000001011, which has three 1 bits.",
    },
    {
      input: "n = 128",
      output: "1",
      explanation: "128 is 00000000000000000000000010000000.",
    },
  ],
  constraints: ["0 <= n <= 2^32 - 1"],
  starters: {
    python: `def hamming_weight(n):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(hamming_weight(11))  # expected 3
`,
    javascript: `function hammingWeight(n) {
  // Write your solution here
}

console.log(hammingWeight(11)); // expected 3
`,
    typescript: `function hammingWeight(n: number): number {
  // Write your solution here
  return 0;
}

console.log(hammingWeight(11)); // expected 3
`,
    java: `public class Main {
    // n arrives as a signed int holding the 32 bits of an unsigned value, so
    // use >>> rather than >> when shifting.
    static int hammingWeight(int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(hammingWeight(11)); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int hammingWeight(uint32_t n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << hammingWeight(11) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
