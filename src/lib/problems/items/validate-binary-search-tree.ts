import type { Problem } from "../types";

const problem: Problem = {
  id: "validate-binary-search-tree",
  title: "Validate Binary Search Tree",
  difficulty: "Medium",
  topic: "Tree",
  summary: "Verify that a tree satisfies the BST ordering everywhere.",
  prompt:
    "Given the `root` of a binary tree, determine whether it is a valid " +
    "binary search tree.\n\n" +
    "A BST requires that every node in a left subtree is strictly less than " +
    "the node above it, and every node in a right subtree strictly greater — " +
    "not just the immediate children.",
  examples: [
    {
      input: "root = [2, 1, 3]",
      output: "true",
    },
    {
      input: "root = [5, 1, 4, null, null, 3, 6]",
      output: "false",
      explanation:
        "3 sits in the root's right subtree but is smaller than the root's 5.",
    },
  ],
  constraints: [
    "The number of nodes is in the range [1, 10^4].",
    "-2^31 <= Node.val <= 2^31 - 1",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_valid_bst(root):
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
    print(is_valid_bst(build([2, 1, 3])))  # expected True
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isValidBST(root) {
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

console.log(isValidBST(build([2, 1, 3]))); // expected true
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

function isValidBST(root: TreeNode | null): boolean {
  // Write your solution here
  return false;
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

console.log(isValidBST(build([2, 1, 3]))); // expected true
`,
    java: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static boolean isValidBST(TreeNode root) {
        // Write your solution here
        return false;
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
        System.out.println(isValidBST(build(new Integer[] {2, 1, 3}))); // expected true
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

bool isValidBST(TreeNode* root) {
    // Write your solution here
    return false;
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
    // expected true
    cout << (isValidBST(build({2, 1, 3})) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
