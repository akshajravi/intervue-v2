import type { Problem } from "../types";

const problem: Problem = {
  id: "lru-cache",
  title: "LRU Cache",
  difficulty: "Hard",
  topic: "Design",
  summary: "Design a cache that evicts the least-recently-used entry.",
  prompt:
    "Design a data structure for a Least Recently Used (LRU) cache. " +
    "Implement the `LRUCache` class:\n\n" +
    "- `LRUCache(capacity)` initializes the cache with a positive `capacity`.\n" +
    "- `get(key)` returns the value of the key if it exists, otherwise -1.\n" +
    "- `put(key, value)` updates or inserts the value. If the cache exceeds " +
    "`capacity`, evict the least recently used key.\n\n" +
    "Both `get` and `put` must run in O(1) average time.",
  examples: [
    {
      input:
        "LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2); put(4,4); get(1); get(3); get(4)",
      output: "[null, null, null, 1, null, -1, null, -1, 3, 4]",
      explanation:
        "put(3,3) evicts key 2; put(4,4) evicts key 1 (least recently used).",
    },
  ],
  constraints: [
    "1 <= capacity <= 3000",
    "0 <= key <= 10^4",
    "0 <= value <= 10^5",
    "At most 2 * 10^5 calls to get and put.",
  ],
  starters: {
    python: `class LRUCache:
    def __init__(self, capacity):
        # Write your solution here
        pass

    def get(self, key):
        # Write your solution here
        pass

    def put(self, key, value):
        # Write your solution here
        pass


if __name__ == "__main__":
    cache = LRUCache(2)
    cache.put(1, 1)
    cache.put(2, 2)
    print(cache.get(1))  # expected 1
    cache.put(3, 3)      # evicts key 2
    print(cache.get(2))  # expected -1
`,
    javascript: `class LRUCache {
  constructor(capacity) {
    // Write your solution here
  }

  get(key) {
    // Write your solution here
  }

  put(key, value) {
    // Write your solution here
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // expected 1
cache.put(3, 3);           // evicts key 2
console.log(cache.get(2)); // expected -1
`,
    typescript: `class LRUCache {
  constructor(capacity: number) {
    // Write your solution here
  }

  get(key: number): number {
    // Write your solution here
    return -1;
  }

  put(key: number, value: number): void {
    // Write your solution here
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // expected 1
cache.put(3, 3);           // evicts key 2
console.log(cache.get(2)); // expected -1
`,
    // Nested inside Main because Judge0 compiles this file as Main.java, so
    // only one top-level public class is allowed.
    java: `public class Main {
    static class LRUCache {
        LRUCache(int capacity) {
            // Write your solution here
        }

        int get(int key) {
            // Write your solution here
            return -1;
        }

        void put(int key, int value) {
            // Write your solution here
        }
    }

    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println(cache.get(1)); // expected 1
        cache.put(3, 3);                  // evicts key 2
        System.out.println(cache.get(2)); // expected -1
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class LRUCache {
public:
    LRUCache(int capacity) {
        // Write your solution here
    }

    int get(int key) {
        // Write your solution here
        return -1;
    }

    void put(int key, int value) {
        // Write your solution here
    }
};

int main() {
    LRUCache cache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cout << cache.get(1) << "\\n";  // expected 1
    cache.put(3, 3);                // evicts key 2
    cout << cache.get(2) << "\\n";  // expected -1
    return 0;
}
`,
  },
};

export default problem;
