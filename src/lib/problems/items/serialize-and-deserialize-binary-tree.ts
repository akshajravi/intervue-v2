import type { Problem } from "../types";

const problem: Problem = {
  id: "serialize-and-deserialize-binary-tree",
  title: "Serialize and Deserialize Binary Tree",
  difficulty: "Hard",
  topic: "Tree",
  summary: "Turn a tree into a string and rebuild it exactly.",
  prompt:
    "Design an algorithm that converts a binary tree into a string, and " +
    "another that rebuilds the original tree from that string.\n\n" +
    "Implement `serialize(root)` and `deserialize(data)`. The format is " +
    "entirely up to you — it just has to round-trip: the rebuilt tree must " +
    "have the same structure and values as the original.",
  examples: [
    {
      input: "root = [1, 2, 3, null, null, 4, 5]",
      output: "[1, 2, 3, null, null, 4, 5]",
      explanation: "deserialize(serialize(root)) must reproduce the tree.",
    },
    {
      input: "root = []",
      output: "[]",
      explanation: "An empty tree has to survive the round trip too.",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 10^4].",
    "-1000 <= Node.val <= 1000",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def serialize(root):
    """Returns a string encoding of the tree."""
    # Write your solution here
    pass


def deserialize(data):
    """Rebuilds the tree from serialize's output."""
    # Write your solution here
    pass


def build(values):
    """Builds a tree from a level-order list, using None for a missing child."""
    if not values or values[0] is None:
        return None
    root = TreeNode(values[0])
    queue, i = [root], 1
    while queue and i < len(values):
        node = queue.pop(0)
        if i < len(values):
            if values[i] is not None:
                node.left = TreeNode(values[i])
                queue.append(node.left)
            i += 1
        if i < len(values):
            if values[i] is not None:
                node.right = TreeNode(values[i])
                queue.append(node.right)
            i += 1
    return root


def preorder(node):
    if node is None:
        return ["null"]
    return [str(node.val)] + preorder(node.left) + preorder(node.right)


if __name__ == "__main__":
    root = build([1, 2, 3, None, None, 4, 5])
    # expected 1 2 null null 3 4 null null 5 null null
    print(" ".join(preorder(deserialize(serialize(root)))))
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Returns a string encoding of the tree.
function serialize(root) {
  // Write your solution here
}

// Rebuilds the tree from serialize's output.
function deserialize(data) {
  // Write your solution here
}

// Builds a tree from a level-order array, using null for a missing child.
function build(values) {
  if (!values.length || values[0] === null) return null;
  const root = new TreeNode(values[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift();
    if (i < values.length) {
      if (values[i] !== null) queue.push((node.left = new TreeNode(values[i])));
      i++;
    }
    if (i < values.length) {
      if (values[i] !== null) queue.push((node.right = new TreeNode(values[i])));
      i++;
    }
  }
  return root;
}

function preorder(node) {
  if (!node) return ["null"];
  return [String(node.val), ...preorder(node.left), ...preorder(node.right)];
}

const root = build([1, 2, 3, null, null, 4, 5]);
// expected 1 2 null null 3 4 null null 5 null null
console.log(preorder(deserialize(serialize(root))).join(" "));
`,
    typescript: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val = 0, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Returns a string encoding of the tree.
function serialize(root: TreeNode | null): string {
  // Write your solution here
  return "";
}

// Rebuilds the tree from serialize's output.
function deserialize(data: string): TreeNode | null {
  // Write your solution here
  return null;
}

// Builds a tree from a level-order array, using null for a missing child.
function build(values: Array<number | null>): TreeNode | null {
  if (!values.length || values[0] === null) return null;
  const root = new TreeNode(values[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (queue.length && i < values.length) {
    const node = queue.shift()!;
    if (i < values.length) {
      const v = values[i];
      if (v !== null) queue.push((node.left = new TreeNode(v)));
      i++;
    }
    if (i < values.length) {
      const v = values[i];
      if (v !== null) queue.push((node.right = new TreeNode(v)));
      i++;
    }
  }
  return root;
}

function preorder(node: TreeNode | null): string[] {
  if (!node) return ["null"];
  return [String(node.val), ...preorder(node.left), ...preorder(node.right)];
}

const root = build([1, 2, 3, null, null, 4, 5]);
// expected 1 2 null null 3 4 null null 5 null null
console.log(preorder(deserialize(serialize(root))).join(" "));
`,
    java: `import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.List;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // Returns a string encoding of the tree.
    static String serialize(TreeNode root) {
        // Write your solution here
        return "";
    }

    // Rebuilds the tree from serialize's output.
    static TreeNode deserialize(String data) {
        // Write your solution here
        return null;
    }

    // Builds a tree from a level-order array, using null for a missing child.
    static TreeNode build(Integer[] values) {
        if (values.length == 0 || values[0] == null) return null;
        TreeNode root = new TreeNode(values[0]);
        Queue<TreeNode> queue = new ArrayDeque<>();
        queue.add(root);
        int i = 1;
        while (!queue.isEmpty() && i < values.length) {
            TreeNode node = queue.poll();
            if (i < values.length) {
                if (values[i] != null) queue.add(node.left = new TreeNode(values[i]));
                i++;
            }
            if (i < values.length) {
                if (values[i] != null) queue.add(node.right = new TreeNode(values[i]));
                i++;
            }
        }
        return root;
    }

    static void preorder(TreeNode node, List<String> out) {
        if (node == null) { out.add("null"); return; }
        out.add(String.valueOf(node.val));
        preorder(node.left, out);
        preorder(node.right, out);
    }

    public static void main(String[] args) {
        TreeNode root = build(new Integer[] {1, 2, 3, null, null, 4, 5});
        List<String> out = new ArrayList<>();
        preorder(deserialize(serialize(root)), out);
        // expected 1 2 null null 3 4 null null 5 null null
        System.out.println(String.join(" ", out));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// Returns a string encoding of the tree.
string serialize(TreeNode* root) {
    // Write your solution here
    return "";
}

// Rebuilds the tree from serialize's output.
TreeNode* deserialize(string data) {
    // Write your solution here
    return nullptr;
}

// Level-order builder; NUL stands in for a missing child.
const int NUL = INT_MIN;

TreeNode* build(vector<int> values) {
    if (values.empty() || values[0] == NUL) return nullptr;
    TreeNode* root = new TreeNode(values[0]);
    queue<TreeNode*> q;
    q.push(root);
    size_t i = 1;
    while (!q.empty() && i < values.size()) {
        TreeNode* node = q.front();
        q.pop();
        if (i < values.size()) {
            if (values[i] != NUL) q.push(node->left = new TreeNode(values[i]));
            i++;
        }
        if (i < values.size()) {
            if (values[i] != NUL) q.push(node->right = new TreeNode(values[i]));
            i++;
        }
    }
    return root;
}

void preorder(TreeNode* node) {
    if (!node) { cout << "null "; return; }
    cout << node->val << " ";
    preorder(node->left);
    preorder(node->right);
}

int main() {
    TreeNode* root = build({1, 2, 3, NUL, NUL, 4, 5});
    // expected 1 2 null null 3 4 null null 5 null null
    preorder(deserialize(serialize(root)));
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
