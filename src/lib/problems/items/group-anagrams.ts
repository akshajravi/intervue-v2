import type { Problem } from "../types";

const problem: Problem = {
  id: "group-anagrams",
  title: "Group Anagrams",
  difficulty: "Medium",
  topic: "String",
  summary: "Bucket words together when they share the same letters.",
  prompt:
    "Given an array of strings `strs`, group together the words that are " +
    "anagrams of each other and return the groups.\n\n" +
    "The groups, and the words inside each group, may be returned in any " +
    "order.",
  examples: [
    {
      input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]',
      output: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]',
      explanation:
        '"eat", "tea" and "ate" use the same three letters, so they form one group.',
    },
    {
      input: 'strs = ["", "b"]',
      output: '[[""], ["b"]]',
    },
  ],
  constraints: [
    "1 <= strs.length <= 10^4",
    "0 <= strs[i].length <= 100",
    "strs[i] consists of lowercase English letters.",
  ],
  starters: {
    python: `def group_anagrams(strs):
    # Write your solution here
    pass


if __name__ == "__main__":
    # expected [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
    print(group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
`,
    javascript: `function groupAnagrams(strs) {
  // Write your solution here
}

// expected [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
`,
    typescript: `function groupAnagrams(strs: string[]): string[][] {
  // Write your solution here
  return [];
}

// expected [ [ 'eat', 'tea', 'ate' ], [ 'tan', 'nat' ], [ 'bat' ] ]
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
`,
    java: `import java.util.List;

public class Main {
    static List<List<String>> groupAnagrams(String[] strs) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        String[] strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
        // expected [[eat, tea, ate], [tan, nat], [bat]]
        System.out.println(groupAnagrams(strs));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    // Write your solution here
    return {};
}

int main() {
    vector<string> strs = {"eat", "tea", "tan", "ate", "nat", "bat"};
    // expected [eat,tea,ate] [tan,nat] [bat]
    for (auto& g : groupAnagrams(strs)) {
        cout << "[";
        for (size_t i = 0; i < g.size(); i++) cout << (i ? "," : "") << g[i];
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
