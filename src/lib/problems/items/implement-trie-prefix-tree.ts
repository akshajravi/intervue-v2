import type { Problem } from "../types";

const problem: Problem = {
  id: "implement-trie-prefix-tree",
  title: "Implement Trie (Prefix Tree)",
  difficulty: "Medium",
  topic: "Tree",
  summary: "Build a prefix tree supporting insert, search and startsWith.",
  prompt:
    "A trie is a tree used to store strings so that prefixes are shared. " +
    "Implement the `Trie` class:\n\n" +
    "- `Trie()` initialises an empty trie.\n" +
    "- `insert(word)` adds `word` to the trie.\n" +
    "- `search(word)` returns true if `word` was inserted.\n" +
    "- `startsWith(prefix)` returns true if any inserted word begins with " +
    "`prefix`.",
  examples: [
    {
      input: 'Trie(); insert("apple"); search("apple"); search("app"); startsWith("app")',
      output: "[null, null, true, false, true]",
      explanation:
        '"app" was never inserted, so search is false — but it is a prefix of "apple".',
    },
  ],
  constraints: [
    "1 <= word.length, prefix.length <= 2000",
    "word and prefix consist of lowercase English letters.",
    "At most 3 * 10^4 calls in total.",
  ],
  starters: {
    python: `class Trie:
    def __init__(self):
        # Write your solution here
        pass

    def insert(self, word):
        # Write your solution here
        pass

    def search(self, word):
        # Write your solution here
        pass

    def starts_with(self, prefix):
        # Write your solution here
        pass


if __name__ == "__main__":
    trie = Trie()
    trie.insert("apple")
    print(trie.search("apple"))       # expected True
    print(trie.search("app"))         # expected False
    print(trie.starts_with("app"))    # expected True
`,
    javascript: `class Trie {
  constructor() {
    // Write your solution here
  }

  insert(word) {
    // Write your solution here
  }

  search(word) {
    // Write your solution here
  }

  startsWith(prefix) {
    // Write your solution here
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));    // expected true
console.log(trie.search("app"));      // expected false
console.log(trie.startsWith("app"));  // expected true
`,
    typescript: `class Trie {
  constructor() {
    // Write your solution here
  }

  insert(word: string): void {
    // Write your solution here
  }

  search(word: string): boolean {
    // Write your solution here
    return false;
  }

  startsWith(prefix: string): boolean {
    // Write your solution here
    return false;
  }
}

const trie = new Trie();
trie.insert("apple");
console.log(trie.search("apple"));    // expected true
console.log(trie.search("app"));      // expected false
console.log(trie.startsWith("app"));  // expected true
`,
    java: `public class Main {
    static class Trie {
        Trie() {
            // Write your solution here
        }

        void insert(String word) {
            // Write your solution here
        }

        boolean search(String word) {
            // Write your solution here
            return false;
        }

        boolean startsWith(String prefix) {
            // Write your solution here
            return false;
        }
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println(trie.search("apple"));    // expected true
        System.out.println(trie.search("app"));      // expected false
        System.out.println(trie.startsWith("app"));  // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class Trie {
public:
    Trie() {
        // Write your solution here
    }

    void insert(string word) {
        // Write your solution here
    }

    bool search(string word) {
        // Write your solution here
        return false;
    }

    bool startsWith(string prefix) {
        // Write your solution here
        return false;
    }
};

int main() {
    Trie trie;
    trie.insert("apple");
    cout << (trie.search("apple") ? "true" : "false") << "\\n";    // expected true
    cout << (trie.search("app") ? "true" : "false") << "\\n";      // expected false
    cout << (trie.startsWith("app") ? "true" : "false") << "\\n";  // expected true
    return 0;
}
`,
  },
};

export default problem;
