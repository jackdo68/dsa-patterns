---
title: "Union Find / Disjoint Set - Number of Operations to make Network Connected"
topic: "graph"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 1319 - Number of Operations to Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected/)

- *There are `n` computers numbered from `0` to `n - 1` connected by ethernet cables `connections` forming a network where `connections[i] = [ai, bi]` represents a connection between computers `ai` and `bi`. Any computer can reach any other computer directly or indirectly through the network.*
- *You are given an initial computer network `connections`. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.*
- *Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return `-1`.*

### Ideas

**Union Find** and **Disjoint Set** are the same thing — just different names:
- "Disjoint Set" describes *what it is*: a collection of non-overlapping sets
- "Union Find" describes *what it does*: the two operations `union()` and `find()`

It tracks which elements belong to the same group (connected component). Use it when you need to:
- Check if two nodes are connected
- Count number of connected components
- Dynamically merge groups

**Two operations:**
- `find(x)` - returns the root/parent of x's group
- `union(x, y)` - merges the groups containing x and y

**Path compression:** In `find`, set each node's parent directly to the root. This flattens the tree, making future lookups nearly O(1).

```typescript
function find(i: number): number {
  if (parent[i] !== i) parent[i] = find(parent[i]); // path compression
  return parent[i];
}
```

**For this problem:**
1. Need at least `n - 1` cables to connect `n` computers
2. Use union find to count connected components
3. To connect `k` components, we need `k - 1` cables

**Time: O(N × α(N)) ≈ O(N)** where α is the inverse Ackermann function (nearly constant)

**Space: O(N)** for the parent array

### Solution

```typescript
function makeConnected(n: number, connections: number[][]): number {
  // we need minimum n-1 connections
  if (connections.length < n - 1) return -1;

  // use union find to determine number of connected components
  const parent = Array.from({ length: n }, (curr, index) => index);

  // recursively look up
  function findParent(i: number): number {
    if (parent[i] !== i) parent[i] = findParent(parent[i]);
    return parent[i];
  }

  // set parent of y as parent of x
  function union(x: number, y: number): void {
        parent[findParent(x)] = findParent(y);
  }

  for (const [i, j] of connections) {
    union(i, j);
  }

  // for each components/sub networks, there will always 1 computer that is the parent of itself
  let num = 0;
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) num++;
  }
  // to connect all subnet to make the whole network connected, we need num - 1 connections
  return num - 1;
}
```