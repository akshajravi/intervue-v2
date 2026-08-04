import type { Problem } from "../types";

const problem: Problem = {
  id: "climbing-stairs",
  title: "Climbing Stairs",
  difficulty: "Easy",
  topic: "Dynamic Programming",
  summary: "Count the ways to climb n steps taking 1 or 2 at a time.",
  prompt:
    "You are climbing a staircase of `n` steps. Each move you may climb 1 or " +
    "2 steps.\n\n" +
    "Return the number of distinct ways to reach the top.",
  examples: [
    {
      input: "n = 2",
      output: "2",
      explanation: "1+1 and 2.",
    },
    {
      input: "n = 3",
      output: "3",
      explanation: "1+1+1, 1+2 and 2+1.",
    },
  ],
  constraints: ["1 <= n <= 45"],
  starters: {
    python: `def climb_stairs(n):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(climb_stairs(3))  # expected 3
`,
    javascript: `function climbStairs(n) {
  // Write your solution here
}

console.log(climbStairs(3)); // expected 3
`,
    typescript: `function climbStairs(n: number): number {
  // Write your solution here
  return 0;
}

console.log(climbStairs(3)); // expected 3
`,
    java: `public class Main {
    static int climbStairs(int n) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        System.out.println(climbStairs(3)); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int climbStairs(int n) {
    // Write your solution here
    return 0;
}

int main() {
    cout << climbStairs(3) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
