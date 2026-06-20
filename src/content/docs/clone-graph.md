---
title: "Clone Graph"
topic: "graph, bfs, dfs, hash map"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 133 - Clone Graph](https://leetcode.com/problems/clone-graph/)

*Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.*

*Each node in the graph contains a value (`int`) and a list (`List[Node]`) of its neighbors.*
### Ideas

The challenge is handling cycles — you must not clone the same node twice, or you'll loop forever. Use a hash map (`original → clone`) to track already-cloned nodes.

**BFS approach:**
1. Clone the start node, add it to the map and queue.
2. For each node in the queue, iterate its neighbors:
   - If neighbor not yet cloned, clone it and enqueue.
   - Add the cloned neighbor to the current clone's neighbor list.

**DFS approach:** Same idea but recursive — clone the current node, recurse on unvisited neighbors, and build the adjacency list as you return.

Both are O(V + E) time and O(V) space.

### Solution

```typescript
class GraphNode {
  val: number;
  neighbors: GraphNode[];
  constructor(val?: number, neighbors?: GraphNode[]) {
    this.val = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (!node) return null;

  const visited = new Map<GraphNode, GraphNode>();

  function dfs(original: GraphNode): GraphNode {
    if (visited.has(original)) return visited.get(original)!;

    const clone = new GraphNode(original.val);
    visited.set(original, clone);

    for (const neighbor of original.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```
