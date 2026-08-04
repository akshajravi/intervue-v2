import type { Problem } from "../types";

const problem: Problem = {
  id: "remove-nth-node-from-end-of-list",
  title: "Remove Nth Node From End of List",
  difficulty: "Medium",
  topic: "Linked List",
  summary: "Drop the nth node counting back from the tail.",
  prompt:
    "Given the `head` of a linked list, remove the nth node counting from the " +
    "end and return the head of the modified list.\n\n" +
    "Try to do it in a single pass.",
  examples: [
    {
      input: "head = [1, 2, 3, 4, 5], n = 2",
      output: "[1, 2, 3, 5]",
      explanation: "The second node from the end holds 4.",
    },
    {
      input: "head = [1], n = 1",
      output: "[]",
      explanation: "Removing the only node leaves an empty list.",
    },
  ],
  constraints: [
    "The number of nodes is sz, with 1 <= sz <= 30.",
    "0 <= Node.val <= 100",
    "1 <= n <= sz",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def remove_nth_from_end(head, n):
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
    # expected [1, 2, 3, 5]
    print(to_array(remove_nth_from_end(build([1, 2, 3, 4, 5]), 2)))
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head, n) {
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

// expected [ 1, 2, 3, 5 ]
console.log(toArray(removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)));
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
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

// expected [ 1, 2, 3, 5 ]
console.log(toArray(removeNthFromEnd(build([1, 2, 3, 4, 5]), 2)));
`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode removeNthFromEnd(ListNode head, int n) {
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
        ListNode head = build(new int[] {1, 2, 3, 4, 5});
        // expected [1, 2, 3, 5]
        System.out.println(toList(removeNthFromEnd(head, 2)));
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

ListNode* removeNthFromEnd(ListNode* head, int n) {
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
    // expected 1 2 3 5
    for (ListNode* n = removeNthFromEnd(build({1, 2, 3, 4, 5}), 2); n; n = n->next) {
        cout << n->val << " ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
