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

```typescript
function kruskalAlgorithm(V: number, edges: [number, number, number][]): number {
    // Sort edges by weight
    edges.sort((a, b) => a[2] - b[2]);
    
    const parent = Array.from({length: V}, (_, i) => i);
    let mstCost = 0;
    let edgesUsed = 0;
    
    // Find set of vertex i
    function find(i: number): number {
        if (parent[i] !== i) {
            parent[i] = find(parent[i]);
        }
        return parent[i];
    }
    
    // Union of two sets
    function union(i: number, j: number): void {
        parent[find(i)] = find(j);
    }
    
    for (const [u, v, weight] of edges) {
        if (find(u) !== find(v)) {
            union(u, v);
            mstCost += weight;
            edgesUsed++;
            if (edgesUsed === V - 1) break;
        }
    }
    
    return mstCost;
}
```