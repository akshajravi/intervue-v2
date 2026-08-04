import type { Problem } from "../types";

const problem: Problem = {
  id: "merge-two-sorted-lists",
  title: "Merge Two Sorted Lists",
  difficulty: "Easy",
  topic: "Linked List",
  summary: "Splice two sorted lists into one sorted list.",
  prompt:
    "You are given the heads of two sorted linked lists, `list1` and " +
    "`list2`.\n\n" +
    "Splice them into a single sorted list built from the original nodes, and " +
    "return the head of the merged list.",
  examples: [
    {
      input: "list1 = [1, 2, 4], list2 = [1, 3, 4]",
      output: "[1, 1, 2, 3, 4, 4]",
    },
    {
      input: "list1 = [], list2 = [0]",
      output: "[0]",
    },
  ],
  constraints: [
    "The number of nodes in each list is in the range [0, 50].",
    "-100 <= Node.val <= 100",
    "Both lists are sorted in non-decreasing order.",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def merge_two_lists(list1, list2):
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
    # expected [1, 1, 2, 3, 4, 4]
    print(to_array(merge_two_lists(build([1, 2, 4]), build([1, 3, 4]))))
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
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

// expected [ 1, 1, 2, 3, 4, 4 ]
console.log(toArray(mergeTwoLists(build([1, 2, 4]), build([1, 3, 4]))));
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
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

// expected [ 1, 1, 2, 3, 4, 4 ]
console.log(toArray(mergeTwoLists(build([1, 2, 4]), build([1, 3, 4]))));
`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode mergeTwoLists(ListNode list1, ListNode list2) {
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
        ListNode a = build(new int[] {1, 2, 4});
        ListNode b = build(new int[] {1, 3, 4});
        // expected [1, 1, 2, 3, 4, 4]
        System.out.println(toList(mergeTwoLists(a, b)));
    }
}
`,
    // mergeTwoLists rather than merge: <bits/stdc++.h> with "using namespace
    // std" pulls in std::merge.
    cpp: `#include <bits/stdc++.h>
using namespace std;

struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
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
    // expected 1 1 2 3 4 4
    for (ListNode* n = mergeTwoLists(build({1, 2, 4}), build({1, 3, 4})); n; n = n->next) {
        cout << n->val << " ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
