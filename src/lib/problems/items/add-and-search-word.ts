import type { Problem } from "../types";

const problem: Problem = {
  id: "add-and-search-word",
  title: "Add and Search Word",
  difficulty: "Medium",
  topic: "Tree",
  summary: "A dictionary where '.' matches any single letter.",
  prompt:
    "Design a data structure that supports adding words and searching them " +
    "with a wildcard. Implement the `WordDictionary` class:\n\n" +
    "- `WordDictionary()` initialises an empty dictionary.\n" +
    "- `addWord(word)` adds a word.\n" +
    "- `search(word)` returns true if any added word matches. The query may " +
    "contain `.`, which matches any single letter.",
  examples: [
    {
      input:
        'addWord("bad"); addWord("dad"); addWord("mad"); search("pad"); search("bad"); search(".ad"); search("b..")',
      output: "[null, null, null, false, true, true, true]",
      explanation: '".ad" matches bad, dad and mad; "b.." matches bad.',
    },
  ],
  constraints: [
    "1 <= word.length <= 25",
    "addWord takes lowercase English letters only.",
    "search may also contain '.', with at most 2 dots per query.",
    "At most 10^4 calls in total.",
  ],
  starters: {
    python: `class WordDictionary:
    def __init__(self):
        # Write your solution here
        pass

    def add_word(self, word):
        # Write your solution here
        pass

    def search(self, word):
        # Write your solution here
        pass


if __name__ == "__main__":
    wd = WordDictionary()
    wd.add_word("bad")
    wd.add_word("dad")
    print(wd.search("pad"))  # expected False
    print(wd.search(".ad"))  # expected True
`,
    javascript: `class WordDictionary {
  constructor() {
    // Write your solution here
  }

  addWord(word) {
    // Write your solution here
  }

  search(word) {
    // Write your solution here
  }
}

const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
console.log(wd.search("pad")); // expected false
console.log(wd.search(".ad")); // expected true
`,
    typescript: `class WordDictionary {
  constructor() {
    // Write your solution here
  }

  addWord(word: string): void {
    // Write your solution here
  }

  search(word: string): boolean {
    // Write your solution here
    return false;
  }
}

const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
console.log(wd.search("pad")); // expected false
console.log(wd.search(".ad")); // expected true
`,
    java: `public class Main {
    static class WordDictionary {
        WordDictionary() {
            // Write your solution here
        }

        void addWord(String word) {
            // Write your solution here
        }

        boolean search(String word) {
            // Write your solution here
            return false;
        }
    }

    public static void main(String[] args) {
        WordDictionary wd = new WordDictionary();
        wd.addWord("bad");
        wd.addWord("dad");
        System.out.println(wd.search("pad")); // expected false
        System.out.println(wd.search(".ad")); // expected true
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class WordDictionary {
public:
    WordDictionary() {
        // Write your solution here
    }

    void addWord(string word) {
        // Write your solution here
    }

    bool search(string word) {
        // Write your solution here
        return false;
    }
};

int main() {
    WordDictionary wd;
    wd.addWord("bad");
    wd.addWord("dad");
    cout << (wd.search("pad") ? "true" : "false") << "\\n";  // expected false
    cout << (wd.search(".ad") ? "true" : "false") << "\\n";  // expected true
    return 0;
}
`,
  },
};

export default problem;
