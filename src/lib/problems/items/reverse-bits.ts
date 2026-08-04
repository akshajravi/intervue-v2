import type { Problem } from "../types";

const problem: Problem = {
  id: "reverse-bits",
  title: "Reverse Bits",
  difficulty: "Easy",
  topic: "Binary",
  summary: "Reverse the 32 bits of an unsigned integer.",
  prompt:
    "Given an unsigned 32-bit integer `n`, reverse the order of its bits and " +
    "return the resulting number.\n\n" +
    "The width is always 32 bits, so leading zeros participate in the " +
    "reversal.",
  examples: [
    {
      input: "n = 43261596",
      output: "964176192",
      explanation:
        "00000010100101000001111010011100 reversed is 00111001011110000010100101000000.",
    },
    {
      input: "n = 1",
      output: "2147483648",
      explanation: "The lone low bit ends up in the highest position.",
    },
  ],
  constraints: ["0 <= n <= 2^32 - 1"],
  starters: {
    python: `def reverse_bits(n):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(reverse_bits(43261596))  # expected 964176192
`,
    javascript: `function reverseBits(n) {
  // Write your solution here
  // JS bitwise ops are signed 32-bit; >>> 0 brings a result back to unsigned.
}

console.log(reverseBits(43261596)); // expected 964176192
`,
    typescript: `function reverseBits(n: number): number {
  // Write your solution here
  // JS bitwise ops are signed 32-bit; >>> 0 brings a result back to unsigned.
  return 0;
}

console.log(reverseBits(43261596)); // expected 964176192
`,
    java: `public class Main {
    // Java has no unsigned int: build the result with >>> and print it via
    // Integer.toUnsignedString.
    static int reverseBits(int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        // expected 964176192
        System.out.println(Integer.toUnsignedString(reverseBits(43261596)));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

uint32_t reverseBits(uint32_t n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << reverseBits(43261596) << "\\n";  // expected 964176192
    return 0;
}
`,
  },
};

export default problem;
