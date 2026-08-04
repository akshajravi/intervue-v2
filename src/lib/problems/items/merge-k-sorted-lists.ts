import type { Problem } from "../types";

const problem: Problem = {
  id: "merge-k-sorted-lists",
  title: "Merge k Sorted Lists",
  difficulty: "Hard",
  topic: "Linked List",
  summary: "Merge an array of sorted lists into one sorted list.",
  prompt:
    "You are given an array `lists` of `k` linked lists, each sorted in " +
    "ascending order.\n\n" +
    "Merge all of them into one sorted linked list and return its head. Aim " +
    "for better than merging them one at a time.",
  examples: [
    {
      input: "lists = [[1,4,5], [1,3,4], [2,6]]",
      output: "[1, 1, 2, 3, 4, 4, 5, 6]",
    },
    {
      input: "lists = []",
      output: "[]",
    },
  ],
  constraints: [
    "0 <= k <= 10^4",
    "0 <= lists[i].length <= 500",
    "-10^4 <= lists[i][j] <= 10^4",
    "The total number of nodes across all lists is at most 10^4.",
  ],
  starters: {
    python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


def merge_k_lists(lists):
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
    lists = [build([1, 4, 5]), build([1, 3, 4]), build([2, 6])]
    # expected [1, 1, 2, 3, 4, 4, 5, 6]
    print(to_array(merge_k_lists(lists)))
`,
    javascript: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
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

const lists = [build([1, 4, 5]), build([1, 3, 4]), build([2, 6])];
// expected [ 1, 1, 2, 3, 4, 4, 5, 6 ]
console.log(toArray(mergeKLists(lists)));
`,
    typescript: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
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

const lists = [build([1, 4, 5]), build([1, 3, 4]), build([2, 6])];
// expected [ 1, 1, 2, 3, 4, 4, 5, 6 ]
console.log(toArray(mergeKLists(lists)));
`,
    java: `import java.util.ArrayList;
import java.util.List;

public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode mergeKLists(ListNode[] lists) {
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
        ListNode[] lists = {
            build(new int[] {1, 4, 5}),
            build(new int[] {1, 3, 4}),
            build(new int[] {2, 6}),
        };
        // expected [1, 1, 2, 3, 4, 4, 5, 6]
        System.out.println(toList(mergeKLists(lists)));
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

ListNode* mergeKLists(vector<ListNode*>& lists) {
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
    vector<ListNode*> lists = {build({1, 4, 5}), build({1, 3, 4}), build({2, 6})};
    // expected 1 1 2 3 4 4 5 6
    for (ListNode* n = mergeKLists(lists); n; n = n->next) cout << n->val << " ";
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
