import type { Problem } from "../types";

const problem: Problem = {
  id: "reverse-linked-list",
  title: "Reverse Linked List",
  difficulty: "Easy",
  topic: "Linked List",
  summary: "Flip the direction of every pointer in a singly linked list.",
  prompt:
    "Given the `head` of a singly linked list, reverse the list and return " +
    "the new head.\n\n" +
    "Try it iteratively first; a recursive version is a good follow-up.",
  examples: [
    {
      input: "head = [1, 2, 3, 4, 5]",
      output: "[5, 4, 3, 2, 1]",
    },
    {
      input: "head = []",
      output: "[]",
      explanation: "An empty list reverses to an empty list.",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 5000].",
    "-5000 <= Node.val <= 5000",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def reverse_list(head):
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
    # expected [5, 4, 3, 2, 1]
    print(to_array(reverse_list(build([1, 2, 3, 4, 5]))))
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
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

// expected [ 5, 4, 3, 2, 1 ]
console.log(toArray(reverseList(build([1, 2, 3, 4, 5]))));
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Write your solution here
  return null;
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

// expected [ 5, 4, 3, 2, 1 ]
console.log(toArray(reverseList(build([1, 2, 3, 4, 5]))));
`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode reverseList(ListNode head) {
        // Write your solution here
        return null;
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
        // expected [5, 4, 3, 2, 1]
        System.out.println(toList(reverseList(build(new int[] {1, 2, 3, 4, 5}))));
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

ListNode* reverseList(ListNode* head) {
    // Write your solution here
    return nullptr;
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
    // expected 5 4 3 2 1
    for (ListNode* n = reverseList(build({1, 2, 3, 4, 5})); n; n = n->next) {
        cout << n->val << " ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
