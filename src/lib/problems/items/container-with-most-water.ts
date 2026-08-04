import type { Problem } from "../types";

const problem: Problem = {
  id: "container-with-most-water",
  title: "Container With Most Water",
  difficulty: "Medium",
  topic: "Array",
  summary: "Pick two lines that hold the most water between them.",
  prompt:
    "You are given an integer array `height` of length n. The i-th vertical " +
    "line runs from `(i, 0)` to `(i, height[i])`.\n\n" +
    "Pick two lines that, together with the x-axis, hold the most water, and " +
    "return that maximum area. The container cannot be tilted, so its height " +
    "is the shorter of the two lines and its width is the distance between " +
    "them.",
  examples: [
    {
      input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]",
      output: "49",
      explanation:
        "The lines at index 1 and index 8 give min(8, 7) * (8 - 1) = 49.",
    },
    {
      input: "height = [1, 1]",
      output: "1",
    },
  ],
  constraints: [
    "2 <= height.length <= 10^5",
    "0 <= height[i] <= 10^4",
  ],
  starters: {
    python: `def max_area(height):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # expected 49
`,
    javascript: `function maxArea(height) {
  // Write your solution here
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // expected 49
`,
    typescript: `function maxArea(height: number[]): number {
  // Write your solution here
  return 0;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // expected 49
`,
    java: `public class Main {
    static int maxArea(int[] height) {
        // Write your solution here
        return 0;
    }

    public static void main(String[] args) {
        int[] height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println(maxArea(height)); // expected 49
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& height) {
    // Write your solution here
    return 0;
}

int main() {
    vector<int> height = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << maxArea(height) << "\\n";  // expected 49
    return 0;
}
`,
  },
};

export default problem;
