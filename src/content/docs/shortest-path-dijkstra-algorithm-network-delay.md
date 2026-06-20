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

```typescript
function networkDelayTime(times: number[][], n: number, k: number): number {
  const adjList = new Map<number, number[][]>();
  for (const [source, target, time] of times) {
    adjList.set(source, [...(adjList.get(source) || []), [target, time]]);
  }
  if (!adjList.has(k)) return -1;

  const distances = new Map<number, number>();
  for (let i = 1; i <= n; i++) {
    distances.set(i, i === k ? 0 : Infinity);
  }

  const heap = new MinHeap();
  heap.push([k, 0]);

  while (heap.size()) {
    const [node, currentTime] = heap.pop();
    if (currentTime > distances.get(node)!) continue;

    for (const [neighbor, travelTime] of adjList.get(node) || []) {
      const newTime = currentTime + travelTime;
      if (newTime < distances.get(neighbor)!) {
        distances.set(neighbor, newTime);
        heap.push([neighbor, newTime]);
      }
    }
  }

  let maxTime = 0;
  for (const time of distances.values()) {
    if (time === Infinity) return -1;
    maxTime = Math.max(time, maxTime);
  }
  return maxTime;
}
```