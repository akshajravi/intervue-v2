import type { Problem } from "../types";

const problem: Problem = {
  id: "top-k-frequent-elements",
  title: "Top K Frequent Elements",
  difficulty: "Medium",
  topic: "Heap",
  summary: "Return the k values that appear most often.",
  prompt:
    "Given an integer array `nums` and an integer `k`, return the `k` most " +
    "frequent elements.\n\n" +
    "You may return the answer in any order. Aim for better than O(n log n).",
  examples: [
    {
      input: "nums = [1, 1, 1, 2, 2, 3], k = 2",
      output: "[1, 2]",
      explanation: "1 appears three times and 2 appears twice.",
    },
    {
      input: "nums = [1], k = 1",
      output: "[1]",
    },
  ],
  constraints: [
    "1 <= nums.length <= 10^5",
    "1 <= k <= the number of distinct elements in nums",
    "The answer is guaranteed to be unique.",
  ],
  starters: {
    python: `def top_k_frequent(nums, k):
    # Write your solution here
    pass


if __name__ == "__main__":
    print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))  # expected [1, 2]
`,
    javascript: `function topKFrequent(nums, k) {
  // Write your solution here
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // expected [ 1, 2 ]
`,
    typescript: `function topKFrequent(nums: number[], k: number): number[] {
  // Write your solution here
  return [];
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2)); // expected [ 1, 2 ]
`,
    java: `import java.util.Arrays;

public class Main {
    static int[] topKFrequent(int[] nums, int k) {
        // Write your solution here
        return new int[] {};
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 1, 2, 2, 3};
        // expected [1, 2]
        System.out.println(Arrays.toString(topKFrequent(nums, 2)));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // Write your solution here
    return {};
}

int main() {
    vector<int> nums = {1, 1, 1, 2, 2, 3};
    // expected 1 2
    for (int v : topKFrequent(nums, 2)) cout << v << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
