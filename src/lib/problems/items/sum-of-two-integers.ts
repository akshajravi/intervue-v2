import type { Problem } from "../types";

const problem: Problem = {
  id: "sum-of-two-integers",
  title: "Sum of Two Integers",
  difficulty: "Medium",
  topic: "Binary",
  summary: "Add two numbers without using + or -.",
  prompt:
    "Given two integers `a` and `b`, return their sum without using the `+` " +
    "or `-` operators.\n\n" +
    "Use bitwise operations: XOR gives the sum of each bit ignoring carries, " +
    "and AND shifted left gives the carries.",
  examples: [
    {
      input: "a = 1, b = 2",
      output: "3",
    },
    {
      input: "a = -2, b = 3",
      output: "1",
      explanation: "Negative inputs are in scope, so two's complement matters.",
    },
  ],
  constraints: ["-1000 <= a, b <= 1000", "You may not use the + or - operators."],
  starters: {
    python: `def get_sum(a, b):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(get_sum(1, 2))  # expected 3
`,
    javascript: `function getSum(a, b) {
  // Write your solution here
}

console.log(getSum(1, 2)); // expected 3
`,
    typescript: `function getSum(a: number, b: number): number {
  // Write your solution here
  return 0;
}

console.log(getSum(1, 2)); // expected 3
`,
    java: `public class Main {
    static int getSum(int a, int b) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(getSum(1, 2)); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int getSum(int a, int b) {
    // Write your solution here
    return 0;
}

int main() {
    cout << getSum(1, 2) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
