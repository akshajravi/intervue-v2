import type { Problem } from "../types";

const problem: Problem = {
  id: "lowest-common-ancestor-of-a-bst",
  title: "Lowest Common Ancestor of a BST",
  difficulty: "Medium",
  topic: "Tree",
  summary: "Find the deepest node that has both targets below it.",
  prompt:
    "Given a binary search tree and two nodes `p` and `q` in it, find their " +
    "lowest common ancestor: the deepest node that has both `p` and `q` as " +
    "descendants.\n\n" +
    "A node counts as a descendant of itself. The BST ordering means you can " +
    "decide which way to walk without searching both subtrees.",
  examples: [
    {
      input: "root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 8",
      output: "6",
      explanation: "2 and 8 sit on opposite sides of the root.",
    },
    {
      input: "root = [6, 2, 8, 0, 4, 7, 9], p = 2, q = 4",
      output: "2",
      explanation: "4 is below 2, and a node is its own descendant.",
    },
  ],
  constraints: [
    "The number of nodes is in the range [2, 10^5].",
    "-10^9 <= Node.val <= 10^9",
    "All Node.val are unique, and p != q.",
    "Both p and q exist in the BST.",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def lowest_common_ancestor(root, p, q):
    """p and q are TreeNodes; return the ancestor node itself."""
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


def find(node, val):
    while node and node.val != val:
        node = node.left if val < node.val else node.right
    return node


if __name__ == "__main__":
    root = build([6, 2, 8, 0, 4, 7, 9])
    result = lowest_common_ancestor(root, find(root, 2), find(root, 8))
    print(result.val if result else None)  # expected 6
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// p and q are TreeNodes; return the ancestor node itself.
function lowestCommonAncestor(root, p, q) {
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

function find(node, val) {
  while (node && node.val !== val) node = val < node.val ? node.left : node.right;
  return node;
}

const root = build([6, 2, 8, 0, 4, 7, 9]);
const result = lowestCommonAncestor(root, find(root, 2), find(root, 8));
console.log(result ? result.val : null); // expected 6
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

// p and q are TreeNodes; return the ancestor node itself.
function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode | null,
  q: TreeNode | null
): TreeNode | null {
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

function find(node: TreeNode | null, val: number): TreeNode | null {
  while (node && node.val !== val) node = val < node.val ? node.left : node.right;
  return node;
}

const root = build([6, 2, 8, 0, 4, 7, 9]);
const result = lowestCommonAncestor(root, find(root, 2), find(root, 8));
console.log(result ? result.val : null); // expected 6
`,
    java: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    // p and q are TreeNodes; return the ancestor node itself.
    static TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
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

    static TreeNode find(TreeNode node, int val) {
        while (node != null && node.val != val) {
            node = val < node.val ? node.left : node.right;
        }
        return node;
    }

    public static void main(String[] args) {
        TreeNode root = build(new Integer[] {6, 2, 8, 0, 4, 7, 9});
        TreeNode result = lowestCommonAncestor(root, find(root, 2), find(root, 8));
        System.out.println(result == null ? "null" : result.val); // expected 6
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

// p and q are TreeNodes; return the ancestor node itself.
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
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

// findNode rather than find: <bits/stdc++.h> with "using namespace std"
// brings std::find into scope.
TreeNode* findNode(TreeNode* node, int val) {
    while (node && node->val != val) node = val < node->val ? node->left : node->right;
    return node;
}

int main() {
    TreeNode* root = build({6, 2, 8, 0, 4, 7, 9});
    TreeNode* result = lowestCommonAncestor(root, findNode(root, 2), findNode(root, 8));
    // expected 6
    if (result) cout << result->val << "\\n";
    else cout << "null\\n";
    return 0;
}
`,
  },
};

export default problem;
