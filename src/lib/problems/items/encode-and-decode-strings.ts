import type { Problem } from "../types";

const problem: Problem = {
  id: "encode-and-decode-strings",
  title: "Encode and Decode Strings",
  difficulty: "Medium",
  topic: "String",
  summary: "Serialise a list of strings so it can be recovered exactly.",
  prompt:
    "Design an algorithm that turns a list of strings into a single string, " +
    "and another that turns that string back into the original list.\n\n" +
    "Implement `encode(strs)` and `decode(s)`. The strings may contain any " +
    "characters, including whatever delimiter you are tempted to use, so the " +
    "encoding has to be unambiguous on its own.",
  examples: [
    {
      input: 'strs = ["lint", "code", "love", "you"]',
      output: '["lint", "code", "love", "you"]',
      explanation:
        "decode(encode(strs)) must return the original list. One encoding is " +
        '"4#lint4#code4#love3#you".',
    },
    {
      input: 'strs = ["", "a#b", ""]',
      output: '["", "a#b", ""]',
      explanation:
        "Empty strings and strings containing your delimiter must survive the round trip.",
    },
  ],
  constraints: [
    "0 <= strs.length <= 200",
    "0 <= strs[i].length <= 200",
    "strs[i] may contain any ASCII characters.",
  ],
  starters: {
    python: `def encode(strs):
    # Write your solution here
    pass


def decode(s):
    # Write your solution here
    pass


if __name__ == "__main__":
    words = ["lint", "code", "love", "you"]
    print(decode(encode(words)))  # expected ['lint', 'code', 'love', 'you']
`,
    javascript: `function encode(strs) {
  // Write your solution here
}

function decode(s) {
  // Write your solution here
}

const words = ["lint", "code", "love", "you"];
// expected [ 'lint', 'code', 'love', 'you' ]
console.log(decode(encode(words)));
`,
    typescript: `function encode(strs: string[]): string {
  // Write your solution here
  return "";
}

function decode(s: string): string[] {
  // Write your solution here
  return [];
}

const words = ["lint", "code", "love", "you"];
// expected [ 'lint', 'code', 'love', 'you' ]
console.log(decode(encode(words)));
`,
    java: `import java.util.List;

public class Main {
    static String encode(List<String> strs) {
        // Write your solution here
        return "";
    }

    static List<String> decode(String s) {
        // Write your solution here
        return List.of();
    }

    public static void main(String[] args) {
        List<String> words = List.of("lint", "code", "love", "you");
        // expected [lint, code, love, you]
        System.out.println(decode(encode(words)));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

string encode(vector<string>& strs) {
    // Write your solution here
    return "";
}

vector<string> decode(string s) {
    // Write your solution here
    return {};
}

int main() {
    vector<string> words = {"lint", "code", "love", "you"};
    string packed = encode(words);
    // expected lint code love you
    for (auto& w : decode(packed)) cout << w << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
