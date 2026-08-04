import type { Problem } from "../types";

const problem: Problem = {
  id: "linked-list-cycle",
  title: "Linked List Cycle",
  difficulty: "Easy",
  topic: "Linked List",
  summary: "Detect whether a linked list loops back on itself.",
  prompt:
    "Given the `head` of a linked list, return `true` if the list contains a " +
    "cycle — that is, if some node can be reached again by following `next` " +
    "pointers — and `false` otherwise.\n\n" +
    "Solve it in O(1) extra space.",
  examples: [
    {
      input: "head = [3, 2, 0, -4], with the tail pointing back at index 1",
      output: "true",
      explanation: "The last node links back to the node holding 2.",
    },
    {
      input: "head = [1, 2], with no cycle",
      output: "false",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 10^4].",
    "-10^5 <= Node.val <= 10^5",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def has_cycle(head):
    # Write your solution here
    pass


def build_with_cycle(values, pos):
    nodes = [ListNode(v) for v in values]
    for i in range(len(nodes) - 1):
        nodes[i].next = nodes[i + 1]
    if pos >= 0 and nodes:
        nodes[-1].next = nodes[pos]
    return nodes[0] if nodes else None


if __name__ == "__main__":
    print(has_cycle(build_with_cycle([3, 2, 0, -4], 1)))  # expected True
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  // Write your solution here
}

function buildWithCycle(values, pos) {
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] ?? null;
}

console.log(hasCycle(buildWithCycle([3, 2, 0, -4], 1))); // expected true
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head: ListNode | null): boolean {
  // Write your solution here
  return false;
}

function buildWithCycle(values: number[], pos: number): ListNode | null {
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
  if (pos >= 0 && nodes.length) nodes[nodes.length - 1].next = nodes[pos];
  return nodes[0] ?? null;
}

console.log(hasCycle(buildWithCycle([3, 2, 0, -4], 1))); // expected true
`,
    java: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static boolean hasCycle(ListNode head) {
        // Write your solution here
        return false;
    }

    static ListNode buildWithCycle(int[] values, int pos) {
        if (values.length == 0) return null;
        ListNode[] nodes = new ListNode[values.length];
        for (int i = 0; i < values.length; i++) nodes[i] = new ListNode(values[i]);
        for (int i = 0; i < values.length - 1; i++) nodes[i].next = nodes[i + 1];
        if (pos >= 0) nodes[values.length - 1].next = nodes[pos];
        return nodes[0];
    }

    public static void main(String[] args) {
        // expected true
        System.out.println(hasCycle(buildWithCycle(new int[] {3, 2, 0, -4}, 1)));
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

bool hasCycle(ListNode* head) {
    // Write your solution here
    return false;
}

ListNode* buildWithCycle(vector<int> values, int pos) {
    if (values.empty()) return nullptr;
    vector<ListNode*> nodes;
    for (int v : values) nodes.push_back(new ListNode(v));
    for (size_t i = 0; i + 1 < nodes.size(); i++) nodes[i]->next = nodes[i + 1];
    if (pos >= 0) nodes.back()->next = nodes[pos];
    return nodes[0];
}

int main() {
    // expected true
    cout << (hasCycle(buildWithCycle({3, 2, 0, -4}, 1)) ? "true" : "false") << "\\n";
    return 0;
}
`,
  },
};

export default problem;
