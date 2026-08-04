import type { Problem } from "../types";

const problem: Problem = {
  id: "counting-bits",
  title: "Counting Bits",
  difficulty: "Easy",
  topic: "Binary",
  summary: "Count the set bits of every number from 0 to n.",
  prompt:
    "Given an integer `n`, return an array `ans` of length `n + 1` where " +
    "`ans[i]` is the number of 1 bits in the binary representation of `i`.\n\n" +
    "Aim for a single pass — the answer for `i` can be built from an answer " +
    "you have already computed.",
  examples: [
    {
      input: "n = 2",
      output: "[0, 1, 1]",
      explanation: "0 is 0b0, 1 is 0b1, 2 is 0b10.",
    },
    {
      input: "n = 5",
      output: "[0, 1, 1, 2, 1, 2]",
    },
  ],
  constraints: ["0 <= n <= 10^5"],
  starters: {
    python: `def count_bits(n):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(count_bits(5))  # expected [0, 1, 1, 2, 1, 2]
`,
    javascript: `function countBits(n) {
  // Write your solution here
}

console.log(countBits(5)); // expected [ 0, 1, 1, 2, 1, 2 ]
`,
    typescript: `function countBits(n: number): number[] {
  // Write your solution here
  return [];
}

console.log(countBits(5)); // expected [ 0, 1, 1, 2, 1, 2 ]
`,
    java: `import java.util.Arrays;

public class Main {
    static int[] countBits(int n) {
        // Write your solution here
        return new int[] {};
    }

    public static void main(String[] args) {
        // expected [0, 1, 1, 2, 1, 2]
        System.out.println(Arrays.toString(countBits(5)));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> countBits(int n) {
    // Write your solution here
    return {};
}

int main() {
    // expected 0 1 1 2 1 2
    for (int v : countBits(5)) cout << v << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
