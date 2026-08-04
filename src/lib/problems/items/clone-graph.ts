import type { Problem } from "../types";

const problem: Problem = {
  id: "clone-graph",
  title: "Clone Graph",
  difficulty: "Medium",
  topic: "Graph",
  summary: "Deep-copy a connected undirected graph.",
  prompt:
    "Given a reference to a node in a connected undirected graph, return a " +
    "deep copy of the whole graph.\n\n" +
    "Every node holds a value and a list of neighbours. The copy must share " +
    "no nodes with the original, and cycles must not send you into infinite " +
    "recursion.",
  examples: [
    {
      input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
      output: "[[2,4],[1,3],[2,4],[1,3]]",
      explanation:
        "A four-node cycle. Node 1 neighbours 2 and 4, node 2 neighbours 1 and 3, and so on.",
    },
    {
      input: "adjList = [[]]",
      output: "[[]]",
      explanation: "A single node with no neighbours.",
    },
  ],
  constraints: [
    "The number of nodes is in the range [0, 100].",
    "1 <= Node.val <= 100, and values are unique.",
    "The graph is connected and has no repeated edges or self-loops.",
  ],
  starters: {
    python: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


def clone_graph(node):
    # Write your solution here
    pass


def build(adj_list):
    """adj_list is 1-indexed: adj_list[i] holds the neighbours of node i+1."""
    if not adj_list:
        return None
    nodes = [Node(i + 1) for i in range(len(adj_list))]
    for i, neighbors in enumerate(adj_list):
        nodes[i].neighbors = [nodes[n - 1] for n in neighbors]
    return nodes[0]


def describe(node):
    seen, order, stack = {}, [], [node]
    while stack:
        cur = stack.pop()
        if cur is None or cur.val in seen:
            continue
        seen[cur.val] = cur
        order.append(cur.val)
        stack.extend(cur.neighbors)
    return sorted((v, sorted(n.val for n in seen[v].neighbors)) for v in order)


if __name__ == "__main__":
    original = build([[2, 4], [1, 3], [2, 4], [1, 3]])
    # expected [(1, [2, 4]), (2, [1, 3]), (3, [2, 4]), (4, [1, 3])]
    copied = clone_graph(original)
    print(describe(copied) if copied else None)
`,
    javascript: `class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  // Write your solution here
}

// adjList is 1-indexed: adjList[i] holds the neighbours of node i+1.
function build(adjList) {
  if (!adjList.length) return null;
  const nodes = adjList.map((_, i) => new Node(i + 1));
  adjList.forEach((neighbors, i) => {
    nodes[i].neighbors = neighbors.map((n) => nodes[n - 1]);
  });
  return nodes[0];
}

function describe(node) {
  const seen = new Map();
  const stack = [node];
  while (stack.length) {
    const cur = stack.pop();
    if (!cur || seen.has(cur.val)) continue;
    seen.set(cur.val, cur);
    stack.push(...cur.neighbors);
  }
  return [...seen.keys()]
    .sort((a, b) => a - b)
    .map((v) => [v, seen.get(v).neighbors.map((n) => n.val).sort((a, b) => a - b)]);
}

const original = build([[2, 4], [1, 3], [2, 4], [1, 3]]);
const copied = cloneGraph(original);
// expected [ [ 1, [ 2, 4 ] ], [ 2, [ 1, 3 ] ], [ 3, [ 2, 4 ] ], [ 4, [ 1, 3 ] ] ]
console.log(copied ? describe(copied) : null);
`,
    // GraphNode, not Node: Judge0 compiles TypeScript with lib.dom, where
    // `Node` is already a global interface — declaring a class by that name is
    // a duplicate-identifier error before the candidate writes a line.
    typescript: `class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  // Write your solution here
  return null;
}

// adjList is 1-indexed: adjList[i] holds the neighbours of node i+1.
function build(adjList: number[][]): GraphNode | null {
  if (!adjList.length) return null;
  const nodes = adjList.map((_, i) => new GraphNode(i + 1));
  adjList.forEach((neighbors, i) => {
    nodes[i].neighbors = neighbors.map((n) => nodes[n - 1]);
  });
  return nodes[0];
}

// Plain object rather than a Map: Judge0 compiles TypeScript to ES5, whose
// lib has no Map or Set.
function describe(node: GraphNode): Array<[number, number[]]> {
  const seen: { [val: number]: GraphNode } = {};
  const found: number[] = [];
  const stack: GraphNode[] = [node];
  while (stack.length) {
    const cur = stack.pop() as GraphNode;
    if (seen[cur.val]) continue;
    seen[cur.val] = cur;
    found.push(cur.val);
    for (let i = 0; i < cur.neighbors.length; i++) stack.push(cur.neighbors[i]);
  }
  return found
    .sort((a, b) => a - b)
    .map((v): [number, number[]] => [
      v,
      seen[v].neighbors.map((n) => n.val).sort((a, b) => a - b),
    ]);
}

const original = build([[2, 4], [1, 3], [2, 4], [1, 3]]);
const copied = cloneGraph(original);
// expected [ [ 1, [ 2, 4 ] ], [ 2, [ 1, 3 ] ], [ 3, [ 2, 4 ] ], [ 4, [ 1, 3 ] ] ]
console.log(copied ? describe(copied) : null);
`,
    java: `import java.util.ArrayList;
import java.util.ArrayDeque;
import java.util.Collections;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Main {
    static class Node {
        int val;
        List<Node> neighbors = new ArrayList<>();
        Node(int val) { this.val = val; }
    }

    static Node cloneGraph(Node node) {
        // Write your solution here
        return null;
    }

    // adjList is 1-indexed: adjList[i] holds the neighbours of node i+1.
    static Node build(int[][] adjList) {
        if (adjList.length == 0) return null;
        Node[] nodes = new Node[adjList.length];
        for (int i = 0; i < adjList.length; i++) nodes[i] = new Node(i + 1);
        for (int i = 0; i < adjList.length; i++) {
            for (int n : adjList[i]) nodes[i].neighbors.add(nodes[n - 1]);
        }
        return nodes[0];
    }

    static Map<Integer, List<Integer>> describe(Node node) {
        Map<Integer, List<Integer>> out = new TreeMap<>();
        Deque<Node> stack = new ArrayDeque<>();
        stack.push(node);
        while (!stack.isEmpty()) {
            Node cur = stack.pop();
            if (out.containsKey(cur.val)) continue;
            List<Integer> vals = new ArrayList<>();
            for (Node n : cur.neighbors) vals.add(n.val);
            Collections.sort(vals);
            out.put(cur.val, vals);
            for (Node n : cur.neighbors) stack.push(n);
        }
        return out;
    }

    public static void main(String[] args) {
        Node original = build(new int[][] {{2, 4}, {1, 3}, {2, 4}, {1, 3}});
        Node copied = cloneGraph(original);
        // expected {1=[2, 4], 2=[1, 3], 3=[2, 4], 4=[1, 3]}
        System.out.println(copied == null ? "null" : describe(copied));
    }
}
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;

class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node(int x) : val(x) {}
};

Node* cloneGraph(Node* node) {
    // Write your solution here
    return nullptr;
}

// adjList is 1-indexed: adjList[i] holds the neighbours of node i+1.
Node* build(vector<vector<int>> adjList) {
    if (adjList.empty()) return nullptr;
    vector<Node*> nodes;
    for (size_t i = 0; i < adjList.size(); i++) nodes.push_back(new Node((int)i + 1));
    for (size_t i = 0; i < adjList.size(); i++) {
        for (int n : adjList[i]) nodes[i]->neighbors.push_back(nodes[n - 1]);
    }
    return nodes[0];
}

int main() {
    Node* original = build({{2, 4}, {1, 3}, {2, 4}, {1, 3}});
    Node* copied = cloneGraph(original);
    // expected 1:[2,4] 2:[1,3] 3:[2,4] 4:[1,3]
    map<int, vector<int>> out;
    vector<Node*> stack;
    if (copied) stack.push_back(copied);
    while (!stack.empty()) {
        Node* cur = stack.back();
        stack.pop_back();
        if (out.count(cur->val)) continue;
        vector<int> vals;
        for (Node* n : cur->neighbors) vals.push_back(n->val);
        sort(vals.begin(), vals.end());
        out[cur->val] = vals;
        for (Node* n : cur->neighbors) stack.push_back(n);
    }
    for (auto& [v, ns] : out) {
        cout << v << ":[";
        for (size_t i = 0; i < ns.size(); i++) cout << (i ? "," : "") << ns[i];
        cout << "] ";
    }
    cout << "\\n";
    return 0;
}
`,
  },
};

export default problem;
