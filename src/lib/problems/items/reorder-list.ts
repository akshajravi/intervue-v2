import type { Problem } from "../types";

const problem: Problem = {
  id: "reorder-list",
  title: "Reorder List",
  difficulty: "Medium",
  topic: "Linked List",
  summary: "Interleave a list's front and back halves in place.",
  prompt:
    "You are given the head of a singly linked list " +
    "`L0 → L1 → … → Ln-1 → Ln`.\n\n" +
    "Reorder it in place to `L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …`. You may " +
    "not change the node values — only the links.",
  examples: [
    {
      input: "head = [1, 2, 3, 4]",
      output: "[1, 4, 2, 3]",
    },
    {
      input: "head = [1, 2, 3, 4, 5]",
      output: "[1, 5, 2, 4, 3]",
    },
  ],
  constraints: [
    "The number of nodes is in the range [1, 5 * 10^4].",
    "1 <= Node.val <= 1000",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reorder_list(head):
    """Reorders in place; returns nothing."""
    # Write your solution here
    pass


def build(values):
    head = None
    for v in reversed(values):
        head = ListNode(v, head)
    return head


def to_array(node):
    out = []
    while node:
        out.append(node.val)
        node = node.next
    return out


if __name__ == "__main__":
    head = build([1, 2, 3, 4])
    reorder_list(head)
    print(to_array(head))  # expected [1, 4, 2, 3]
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Reorders in place; returns nothing.
function reorderList(head) {
  // Write your solution here
}

function build(values) {
  let head = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  return head;
}

function toArray(node) {
  const out = [];
  while (node) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}

const head = build([1, 2, 3, 4]);
reorderList(head);
console.log(toArray(head)); // expected [ 1, 4, 2, 3 ]
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

// Reorders in place; returns nothing.
function reorderList(head: ListNode | null): void {
  // Write your solution here
}

function build(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let i = values.length - 1; i >= 0; i--) head = new ListNode(values[i], head);
  return head;
}

function toArray(node: ListNode | null): number[] {
  const out: number[] = [];
  while (node) {
    out.push(node.val);
    node = node.next;
  }
  return out;
}

const head = build([1, 2, 3, 4]);
reorderList(head);
console.log(toArray(head)); // expected [ 1, 4, 2, 3 ]
`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    // Reorders in place; returns nothing.
    static void reorderList(ListNode head) {
        // Write your solution here
    }

    static ListNode build(int[] values) {
        ListNode head = null;
        for (int i = values.length - 1; i >= 0; i--) {
            ListNode node = new ListNode(values[i]);
            node.next = head;
            head = node;
        }
        return head;
    }

    static List<Integer> toList(ListNode node) {
        List<Integer> out = new ArrayList<>();
        while (node != null) {
            out.add(node.val);
            node = node.next;
        }
        return out;
    }

    public static void main(String[] args) {
        ListNode head = build(new int[] {1, 2, 3, 4});
        reorderList(head);
        System.out.println(toList(head)); // expected [1, 4, 2, 3]
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Reorders in place; returns nothing.
void reorderList(ListNode* head) {
    // Write your solution here
}

ListNode* build(vector<int> values) {
    ListNode* head = nullptr;
    for (int i = (int)values.size() - 1; i >= 0; i--) {
        ListNode* node = new ListNode(values[i]);
        node->next = head;
        head = node;
    }
    return head;
}

int main() {
    ListNode* head = build({1, 2, 3, 4});
    reorderList(head);
    // expected 1 4 2 3
    for (ListNode* n = head; n; n = n->next) cout << n->val << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
