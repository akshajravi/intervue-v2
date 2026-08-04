import type { Problem } from "../types";

const problem: Problem = {
  id: "subtree-of-another-tree",
  title: "Subtree of Another Tree",
  difficulty: "Easy",
  topic: "Tree",
  summary: "Check whether one tree appears intact inside another.",
  prompt:
    "Given the roots of two binary trees `root` and `subRoot`, return `true` " +
    "if there is a node in `root` whose subtree is identical to " +
    "`subRoot`.\n\n" +
    "A subtree consists of a node and every one of its descendants — a " +
    "partial match doesn't count.",
  examples: [
    {
      input: "root = [3, 4, 5, 1, 2], subRoot = [4, 1, 2]",
      output: "true",
      explanation: "The left child of the root is exactly [4, 1, 2].",
    },
    {
      input: "root = [3, 4, 5, 1, 2, null, null, null, null, 0], subRoot = [4, 1, 2]",
      output: "false",
      explanation: "The candidate node now has an extra descendant, so it isn't identical.",
    },
  ],
  constraints: [
    "The number of nodes in root is in the range [1, 2000].",
    "The number of nodes in subRoot is in the range [1, 1000].",
    "-10^4 <= Node.val <= 10^4",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def is_subtree(root, sub_root):
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
    # expected True
    print(is_subtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])))
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isSubtree(root, subRoot) {
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

// expected true
console.log(isSubtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])));
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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
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

// expected true
console.log(isSubtree(build([3, 4, 5, 1, 2]), build([4, 1, 2])));
`,
    java: `import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class TreeNode {
        int val;
        TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    static boolean isSubtree(TreeNode root, TreeNode subRoot) {
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
        TreeNode root = build(new Integer[] {3, 4, 5, 1, 2});
        TreeNode subRoot = build(new Integer[] {4, 1, 2});
        System.out.println(isSubtree(root, subRoot)); // expected true
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

bool isSubtree(TreeNode* root, TreeNode* subRoot) {
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
    TreeNode* root = build({3, 4, 5, 1, 2});
    TreeNode* subRoot = build({4, 1, 2});
    // expected true
    cout << (isSubtree(root, subRoot) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
