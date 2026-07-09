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

```csharp
public class GraphNode {
    public int val;
    public List<GraphNode> neighbors;
    public GraphNode(int val = 0, List<GraphNode>? neighbors = null) {
        this.val = val;
        this.neighbors = neighbors ?? new List<GraphNode>();
    }
}

public GraphNode? CloneGraph(GraphNode? node) {
    if (node is null) return null;

    var visited = new Dictionary<GraphNode, GraphNode>();

    GraphNode Dfs(GraphNode original) {
        if (visited.TryGetValue(original, out var existing)) return existing;

        var clone = new GraphNode(original.val);
        visited[original] = clone;

        foreach (var neighbor in original.neighbors) {
            clone.neighbors.Add(Dfs(neighbor));
        }

        return clone;
    }

    return Dfs(node);
}
```
