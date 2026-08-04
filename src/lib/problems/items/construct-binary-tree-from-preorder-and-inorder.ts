import type { Problem } from "../types";

const problem: Problem = {
  id: "construct-binary-tree-from-preorder-and-inorder",
  title: "Construct Binary Tree from Preorder and Inorder Traversal",
  difficulty: "Medium",
  topic: "Tree",
  summary: "Rebuild a tree from its preorder and inorder traversals.",
  prompt:
    "Given two integer arrays `preorder` and `inorder`, where `preorder` is " +
    "the preorder traversal of a binary tree and `inorder` is the inorder " +
    "traversal of the same tree, reconstruct the tree and return its root.\n\n" +
    "The first element of `preorder` is the root; its position in `inorder` " +
    "splits the remaining values into the two subtrees.",
  examples: [
    {
      input: "preorder = [3, 9, 20, 15, 7], inorder = [9, 3, 15, 20, 7]",
      output: "[3, 9, 20, null, null, 15, 7]",
    },
    {
      input: "preorder = [-1], inorder = [-1]",
      output: "[-1]",
    },
  ],
  constraints: [
    "1 <= preorder.length <= 3000",
    "inorder.length == preorder.length",
    "The values are unique, and inorder is a permutation of preorder.",
  ],
  starters: {
    python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


def build_tree(preorder, inorder):
    # Write your solution here
    pass


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
    tree = build_tree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7])
    print(level_order(tree))  # expected [3, 9, 20, 15, 7]
`,
    javascript: `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(preorder, inorder) {
  // Write your solution here
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

const tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(levelOrder(tree)); // expected [ 3, 9, 20, 15, 7 ]
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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  // Write your solution here
  return null;
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

const tree = buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]);
console.log(levelOrder(tree)); // expected [ 3, 9, 20, 15, 7 ]
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

    static TreeNode buildTree(int[] preorder, int[] inorder) {
        // Write your solution here
        return null;
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
        TreeNode tree = buildTree(new int[] {3, 9, 20, 15, 7}, new int[] {9, 3, 15, 20, 7});
        System.out.println(levelOrder(tree)); // expected [3, 9, 20, 15, 7]
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

TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
    // Write your solution here
    return nullptr;
}

int main() {
    vector<int> preorder = {3, 9, 20, 15, 7};
    vector<int> inorder = {9, 3, 15, 20, 7};
    TreeNode* tree = buildTree(preorder, inorder);
    // expected 3 9 20 15 7
    queue<TreeNode*> q;
    if (tree) q.push(tree);
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
