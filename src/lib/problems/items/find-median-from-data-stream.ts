import type { Problem } from "../types";

const problem: Problem = {
  id: "find-median-from-data-stream",
  title: "Find Median from Data Stream",
  difficulty: "Hard",
  topic: "Heap",
  summary: "Keep a running median as numbers arrive one at a time.",
  prompt:
    "Design a structure that tracks the median of a stream of numbers. " +
    "Implement the `MedianFinder` class:\n\n" +
    "- `MedianFinder()` initialises an empty structure.\n" +
    "- `addNum(num)` adds a number to the stream.\n" +
    "- `findMedian()` returns the median of every number added so far.\n\n" +
    "With an even count the median is the mean of the two middle values. " +
    "`addNum` should be better than O(n).",
  examples: [
    {
      input: "MedianFinder(); addNum(1); addNum(2); findMedian(); addNum(3); findMedian()",
      output: "[null, null, null, 1.5, null, 2.0]",
      explanation:
        "After 1 and 2 the median is (1+2)/2 = 1.5; after 3 the middle value is 2.",
    },
  ],
  constraints: [
    "-10^5 <= num <= 10^5",
    "findMedian is only called after at least one addNum.",
    "At most 5 * 10^4 calls in total.",
  ],
  starters: {
    python: `class MedianFinder:
    def __init__(self):
        # Write your solution here
        pass

    def add_num(self, num):
        # Write your solution here
        pass

    def find_median(self):
        # Write your solution here
        pass


if __name__ == "__main__":
    mf = MedianFinder()
    mf.add_num(1)
    mf.add_num(2)
    print(mf.find_median())  # expected 1.5
    mf.add_num(3)
    print(mf.find_median())  # expected 2.0
`,
    javascript: `class MedianFinder {
  constructor() {
    // Write your solution here
  }

  addNum(num) {
    // Write your solution here
  }

  findMedian() {
    // Write your solution here
  }
}

const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // expected 1.5
mf.addNum(3);
console.log(mf.findMedian()); // expected 2
`,
    typescript: `class MedianFinder {
  constructor() {
    // Write your solution here
  }

  addNum(num: number): void {
    // Write your solution here
  }

  findMedian(): number {
    // Write your solution here
    return 0;
  }
}

const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // expected 1.5
mf.addNum(3);
console.log(mf.findMedian()); // expected 2
`,
    java: `public class Main {
    static class MedianFinder {
        MedianFinder() {
            // Write your solution here
        }

        void addNum(int num) {
            // Write your solution here
        }

        double findMedian() {
            // Write your solution here
            return 0.0;
        }
    }

    public static void main(String[] args) {
        MedianFinder mf = new MedianFinder();
        mf.addNum(1);
        mf.addNum(2);
        System.out.println(mf.findMedian()); // expected 1.5
        mf.addNum(3);
        System.out.println(mf.findMedian()); // expected 2.0
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class MedianFinder {
public:
    MedianFinder() {
        // Write your solution here
    }

    void addNum(int num) {
        // Write your solution here
    }

    double findMedian() {
        // Write your solution here
        return 0.0;
    }
};

int main() {
    MedianFinder mf;
    mf.addNum(1);
    mf.addNum(2);
    cout << mf.findMedian() << "\\n";  // expected 1.5
    mf.addNum(3);
    cout << mf.findMedian() << "\\n";  // expected 2
    return 0;
}
`,
  },
};

export default problem;
