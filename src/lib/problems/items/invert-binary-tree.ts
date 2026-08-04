import type { Problem } from "../types";

const problem: Problem = {
  id: "invert-binary-tree",
  title: "Invert Binary Tree",
  difficulty: "Easy",
  topic: "Tree",
  summary: "Mirror a binary tree by swapping every pair of children.",
  prompt:
    "Given the `root` of a binary tree, invert it — swap the left and right " +
    "child of every node — and return the root.",
  examples: [
    {
      input: "root = [4, 2, 7, 1, 3, 6, 9]",
      output: "[4, 7, 2, 9, 6, 3, 1]",
      explanation: "Every level is reflected left-to-right.",
    },
    {
      input: "root = [2, 1, 3]",
      output: "[2, 3, 1]",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 100].",
    "-100 <= Node.val <= 100",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def invert_tree(root):
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


def level_order(root):
    out, queue = [], [root]
    while queue:
        node = queue.pop(0)
        if node is None:
            continue
        out.append(node.val)
        queue.append(node.left)
        queue.append(node.right)
    return out


if __name__ == "__main__":
    # expected [4, 7, 2, 9, 6, 3, 1]
    print(level_order(invert_tree(build([4, 2, 7, 1, 3, 6, 9]))))
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function invertTree(root) {
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

function levelOrder(root) {
  const out = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;
    out.push(node.val);
    queue.push(node.left, node.right);
  }
  return out;
}

// expected [ 4, 7, 2, 9, 6, 3, 1 ]
console.log(levelOrder(invertTree(build([4, 2, 7, 1, 3, 6, 9]))));
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

function invertTree(root: TreeNode | null): TreeNode | null {
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

function levelOrder(root: TreeNode | null): number[] {
  const out: number[] = [];
  const queue: Array<TreeNode | null> = [root];
  while (queue.length) {
    const node = queue.shift();
    if (!node) continue;
    out.push(node.val);
    queue.push(node.left, node.right);
  }
  return out;
}

// expected [ 4, 7, 2, 9, 6, 3, 1 ]
console.log(levelOrder(invertTree(build([4, 2, 7, 1, 3, 6, 9]))));
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

    static TreeNode invertTree(TreeNode root) {
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

    static List<Integer> levelOrder(TreeNode root) {
        List<Integer> out = new ArrayList<>();
        Queue<TreeNode> queue = new ArrayDeque<>();
        if (root != null) queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            out.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        return out;
    }

    public static void main(String[] args) {
        TreeNode root = build(new Integer[] {4, 2, 7, 1, 3, 6, 9});
        // expected [4, 7, 2, 9, 6, 3, 1]
        System.out.println(levelOrder(invertTree(root)));
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

TreeNode* invertTree(TreeNode* root) {
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

int main() {
    TreeNode* root = invertTree(build({4, 2, 7, 1, 3, 6, 9}));
    // expected 4 7 2 9 6 3 1
    queue<TreeNode*> q;
    if (root) q.push(root);
    while (!q.empty()) {
        TreeNode* node = q.front();
        q.pop();
        cout << node->val << " ";
        if (node->left) q.push(node->left);
        if (node->right) q.push(node->right);
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
