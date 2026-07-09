---
title: "Minimum Spanning Tree - Kruskal algorithm"
topic: "graph"
difficulty: "Medium"
frequency: "Very Low"
---
### Question

[LeetCode 1584 - Min Cost to Connect All Points](https://leetcode.com/problems/min-cost-to-connect-all-points/)

*You are given an array `points` representing integer coordinates of some points on a 2D-plane, where `points[i] = [xi, yi]`. The cost of connecting two points `[xi, yi]` and `[xj, yj]` is the manhattan distance between them: `|xi - xj| + |yi - yj|`. Return the minimum cost to make all points connected.*

### Ideas

- Minimum Spanning Tree (MST) is a tree that spans all vertices of the graph and has the smallest sum of edge weights among all possible spanning trees. This concept is useful in real-life applications such as minimizing the cost of laying cables or pipelines to connect multiple locations efficiently.
- **Selection Process**: Sorts all edges and adds them if they don't create a cycle (using Union Find / Disjoint Set)
- **Time Complexity**: O(E log E) due to sorting edges

### Solution

```csharp
public int KruskalAlgorithm(int V, int[][] edges) {
    // Sort edges by weight
    Array.Sort(edges, (a, b) => a[2] - b[2]);

    int[] parent = new int[V];
    for (int i = 0; i < V; i++) parent[i] = i;
    int mstCost = 0;
    int edgesUsed = 0;

    // Find set of vertex i (with path compression)
    int Find(int i) {
        if (parent[i] != i) {
            parent[i] = Find(parent[i]);
        }
        return parent[i];
    }

    // Union of two sets
    void Union(int i, int j) {
        parent[Find(i)] = Find(j);
    }

    foreach (var edge in edges) {
        int u = edge[0], v = edge[1], weight = edge[2];
        if (Find(u) != Find(v)) {
            Union(u, v);
            mstCost += weight;
            edgesUsed++;
            if (edgesUsed == V - 1) break;
        }
    }

    return mstCost;
}
```