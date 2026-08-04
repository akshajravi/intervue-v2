import type { Problem } from "../types";

const problem: Problem = {
  id: "maximum-depth-of-binary-tree",
  title: "Maximum Depth of Binary Tree",
  difficulty: "Easy",
  topic: "Tree",
  summary: "Measure the longest root-to-leaf path.",
  prompt:
    "Given the `root` of a binary tree, return its maximum depth — the " +
    "number of nodes along the longest path from the root down to a leaf.\n\n" +
    "An empty tree has depth 0.",
  examples: [
    {
      input: "root = [3, 9, 20, null, null, 15, 7]",
      output: "3",
      explanation: "The path 3 → 20 → 15 has three nodes.",
    },
    {
      input: "root = [1, null, 2]",
      output: "2",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 10^4].",
    "-100 <= Node.val <= 100",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def max_depth(root):
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


if __name__ == "__main__":
    print(max_depth(build([3, 9, 20, None, None, 15, 7])))  # expected 3
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function maxDepth(root) {
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

console.log(maxDepth(build([3, 9, 20, null, null, 15, 7]))); // expected 3
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

function maxDepth(root: TreeNode | null): number {
  // Write your solution here
  return 0;
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

console.log(maxDepth(build([3, 9, 20, null, null, 15, 7]))); // expected 3
`,
    java: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static int maxDepth(TreeNode root) {
        // Write your solution here
        return 0;
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

    public static void main(String[] args) {
        TreeNode root = build(new Integer[] {3, 9, 20, null, null, 15, 7});
        System.out.println(maxDepth(root)); // expected 3
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

int maxDepth(TreeNode* root) {
    // Write your solution here
    return 0;
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

int main() {
    TreeNode* root = build({3, 9, 20, NUL, NUL, 15, 7});
    cout << maxDepth(root) << "\\n";  // expected 3
    return 0;
}
`,
  },
};

export default problem;
