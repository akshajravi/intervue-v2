import type { Problem } from "../types";

const problem: Problem = {
  id: "kth-smallest-element-in-a-bst",
  title: "Kth Smallest Element in a BST",
  difficulty: "Medium",
  topic: "Tree",
  summary: "Find the kth smallest value in a binary search tree.",
  prompt:
    "Given the `root` of a binary search tree and an integer `k`, return the " +
    "kth smallest value in the tree, counting from 1.\n\n" +
    "An in-order traversal of a BST visits values in sorted order — you " +
    "shouldn't need to visit the whole tree.",
  examples: [
    {
      input: "root = [3, 1, 4, null, 2], k = 1",
      output: "1",
      explanation: "In-order the values are 1, 2, 3, 4.",
    },
    {
      input: "root = [5, 3, 6, 2, 4, null, null, 1], k = 3",
      output: "3",
    },
  ],
  constraints: [
    "The number of nodes is n, with 1 <= k <= n <= 10^4.",
    "0 <= Node.val <= 10^4",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def kth_smallest(root, k):
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
    print(kth_smallest(build([3, 1, 4, None, 2]), 1))  # expected 1
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function kthSmallest(root, k) {
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

console.log(kthSmallest(build([3, 1, 4, null, 2]), 1)); // expected 1
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

function kthSmallest(root: TreeNode | null, k: number): number {
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

console.log(kthSmallest(build([3, 1, 4, null, 2]), 1)); // expected 1
`,
    java: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static int kthSmallest(TreeNode root, int k) {
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
        TreeNode root = build(new Integer[] {3, 1, 4, null, 2});
        System.out.println(kthSmallest(root, 1)); // expected 1
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

int kthSmallest(TreeNode* root, int k) {
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
    TreeNode* root = build({3, 1, 4, NUL, 2});
    cout << kthSmallest(root, 1) << "\\n";  // expected 1
    return 0;
}
`,
  },
};

export default problem;
