import type { Problem } from "../types";

const problem: Problem = {
  id: "coin-change",
  title: "Coin Change",
  difficulty: "Medium",
  topic: "Dynamic Programming",
  summary: "Make an amount with the fewest coins.",
  prompt:
    "You are given an array of `coins` denominations and an integer " +
    "`amount`.\n\n" +
    "Return the fewest coins needed to make up that amount, or -1 if it can't " +
    "be made. You have an unlimited number of each coin.",
  examples: [
    {
      input: "coins = [1, 2, 5], amount = 11",
      output: "3",
      explanation: "11 = 5 + 5 + 1.",
    },
    {
      input: "coins = [2], amount = 3",
      output: "-1",
      explanation: "An odd amount can't be made from 2s alone.",
    },
  ],
  constraints: [
    "1 <= coins.length <= 12",
    "1 <= coins[i] <= 2^31 - 1",
    "0 <= amount <= 10^4",
  ],
  starters: {
    python: `def coin_change(coins, amount):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(coin_change([1, 2, 5], 11))  # expected 3
`,
    javascript: `function coinChange(coins, amount) {
  // Write your solution here
}

console.log(coinChange([1, 2, 5], 11)); // expected 3
`,
    typescript: `function coinChange(coins: number[], amount: number): number {
  // Write your solution here
  return -1;
}

console.log(coinChange([1, 2, 5], 11)); // expected 3
`,
    java: `public class Main {
    static int coinChange(int[] coins, int amount) {
        // Write your solution here
        return -1;
    }

    public static void main(String[] args) {
        System.out.println(coinChange(new int[] {1, 2, 5}, 11)); // expected 3
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    // Write your solution here
    return -1;
}

int main() {
    vector<int> coins = {1, 2, 5};
    cout << coinChange(coins, 11) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
