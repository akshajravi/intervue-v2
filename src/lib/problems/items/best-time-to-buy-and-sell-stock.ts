import type { Problem } from "../types";

const problem: Problem = {
  id: "best-time-to-buy-and-sell-stock",
  title: "Best Time to Buy and Sell Stock",
  difficulty: "Easy",
  topic: "Array",
  summary: "Buy once and sell later for the largest possible profit.",
  prompt:
    "You are given an array `prices` where `prices[i]` is the price of a stock " +
    "on day `i`.\n\n" +
    "You may choose a single day to buy and a different, later day to sell. " +
    "Return the maximum profit you can make. If no profitable trade exists, " +
    "return 0.",
  examples: [
    {
      input: "prices = [7, 1, 5, 3, 6, 4]",
      output: "5",
      explanation: "Buy on day 1 at 1 and sell on day 4 at 6 for a profit of 5.",
    },
    {
      input: "prices = [7, 6, 4, 3, 1]",
      output: "0",
      explanation: "Prices only fall, so no trade is profitable.",
    },
  ],
  constraints: [
    "1 <= prices.length <= 10^5",
    "0 <= prices[i] <= 10^4",
    "You must buy before you sell.",
  ],
  starters: {
    python: `def max_profit(prices):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(max_profit([7, 1, 5, 3, 6, 4]))  # expected 5
`,
    javascript: `function maxProfit(prices) {
  // Write your solution here
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // expected 5
`,
    typescript: `function maxProfit(prices: number[]): number {
  // Write your solution here
  return 0;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4])); // expected 5
`,
    java: `public class Main {
    static int maxProfit(int[] prices) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        // expected 5
        System.out.println(maxProfit(new int[] {7, 1, 5, 3, 6, 4}));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    cout << maxProfit(prices) << "\\n";  // expected 5
    return 0;
}
`,
  },
};

export default problem;
