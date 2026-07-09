---
title: "Shortest Path - Dijkstra algorithm - Network Delay time"
topic: "graph, heap"
difficulty: "Medium"
frequency: "Medium"
---
### Ideas

**Dijkstra's algorithm** finds the shortest path from a source node to all other nodes in a weighted graph with **non-negative edges**.

**Components:**
1. **Adjacency list** — graph representation with weights
2. **Distances map** — tracks shortest known distance from source to each node (init to ∞, source to 0)
3. **Min heap** — always process the node with smallest distance next

**Steps:**
1. Initialize distances (source = 0, rest = ∞), push source to heap
2. Pop node with smallest distance from heap
3. Skip if we've already found a better path to this node
4. For each neighbor: if `currentDist + edgeWeight < distances[neighbor]`, update and push to heap
5. Repeat until heap is empty

**For this problem:** We need the minimum time for a signal to reach ALL nodes from node `k`. Run Dijkstra from `k` to find shortest paths to every node, then return the maximum distance (the slowest node determines when all nodes have received the signal).

**Time: O((V + E) log V)** — each vertex and edge processed with heap operations

**Space: O(V + E)** — adjacency list + distances map + heap

### Question

[LeetCode 743 - Network Delay Time](https://leetcode.com/problems/network-delay-time/)

*You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.*

*We will send a signal from a given node `k`. Return the **minimum** time it takes for all the `n` nodes to receive the signal. If it is impossible for all the `n` nodes to receive the signal, return `-1`.*

```csharp
public int NetworkDelayTime(int[][] times, int n, int k) {
    var adjList = new Dictionary<int, List<int[]>>();
    foreach (var edge in times) {
        int source = edge[0], target = edge[1], time = edge[2];
        if (!adjList.ContainsKey(source)) adjList[source] = new List<int[]>();
        adjList[source].Add(new[] { target, time });
    }
    if (!adjList.ContainsKey(k)) return -1;

    var distances = new Dictionary<int, int>();
    for (int i = 1; i <= n; i++) {
        distances[i] = i == k ? 0 : int.MaxValue;
    }

    // .NET's built-in min-heap: element = node, priority = distance
    var heap = new PriorityQueue<int, int>();
    heap.Enqueue(k, 0);

    while (heap.TryDequeue(out int node, out int currentTime)) {
        if (currentTime > distances[node]) continue;

        if (adjList.TryGetValue(node, out var neighbors)) {
            foreach (var edge in neighbors) {
                int neighbor = edge[0], travelTime = edge[1];
                int newTime = currentTime + travelTime;
                if (newTime < distances[neighbor]) {
                    distances[neighbor] = newTime;
                    heap.Enqueue(neighbor, newTime);
                }
            }
        }
    }

    int maxTime = 0;
    foreach (int time in distances.Values) {
        if (time == int.MaxValue) return -1;
        maxTime = Math.Max(time, maxTime);
    }
    return maxTime;
}
```