---
title: "Pattern Guide"
---
How patterns relate, when to use (and not use) them, and how they combine for harder problems.

---

## Pattern Families

### Pointer Techniques
```
Single Pointer (iteration)
├── Two Pointers (opposite ends) → Container With Most Water, 3Sum
├── Two Pointers (same direction) → Move Zeroes
├── Fast & Slow Pointers → Cycle Detection
└── Sliding Window → Longest Substring Without Repeating
```
[Container With Most Water](/dsa-patterns/container-with-most-water/) | [3Sum](/dsa-patterns/3sum/) | [Move Zeroes](/dsa-patterns/move-zeroes/) | [Cycle Detection](/dsa-patterns/fast-slow-floyd-s-algorithm-cycle-detection/) | [Longest Substring Without Repeating](/dsa-patterns/variable-size-longest-substring-without-repeatin/)

### Recursion Family
```
Simple Recursion
├── Divide & Conquer → Merge Sort, Quick Sort
├── DFS (tree/graph) → Path Sum, Number of Islands
├── Backtracking (DFS + undo) → Subsets, Permutations
└── Memoization → Top-down DP
```
[Merge Sort](/dsa-patterns/merge-sort/) | [Quick Sort](/dsa-patterns/quick-sort/) | [Path Sum](/dsa-patterns/path-sum/) | [Number of Islands](/dsa-patterns/dfs-number-of-islands/) | [Subsets](/dsa-patterns/subset/) | [Permutations](/dsa-patterns/permutations-unique/)

### Graph Traversal
```
Graph Problems
├── Connectivity → DFS, BFS, Union Find
├── Shortest Path
│   ├── Unweighted → BFS
│   ├── Weighted (no negative) → Dijkstra
│   ├── Weighted (with negative) → Bellman Ford
│   └── All pairs → Floyd Warshall
├── Ordering → Topological Sort
└── Minimum Spanning Tree → Kruskal's
```
[Dijkstra](/dsa-patterns/shortest-path-dijkstra-algorithm-network-delay/) | [Bellman Ford](/dsa-patterns/shortest-path-bellman-ford-algorithm-cheapest/) | [Floyd Warshall](/dsa-patterns/shortest-path-floy-warshall-algorithm-minimum/) | [Topological Sort](/dsa-patterns/topological-sort-kahn-algorithm-course-schedul/) | [Kruskal's](/dsa-patterns/minimum-spanning-tree-kruskal-algorithm/) | [Union Find](/dsa-patterns/union-find-disjoint-set-number-of-operations-to/)

### Optimization
```
Optimization Problems
├── Need ALL solutions → Backtracking
├── Need ONE optimal
│   ├── Local optimal = global optimal → Greedy
│   └── Overlapping subproblems → DP
│       ├── 1D (sequence) → Fibonacci
│       ├── 2D (grid / two sequences) → Unique Paths, LCS
│       ├── Knapsack (choose/skip) → Target Sum, Coin Change
│       └── Interval (range [i,j]) → Burst Balloons
└── Monotonic answer space → Binary Search on Answer
```
[Fibonacci](/dsa-patterns/basic-fibonacci-1d-array/) | [Unique Paths](/dsa-patterns/grid-unique-paths/) | [LCS](/dsa-patterns/dual-sequence-longest-common-subsequence-lcs/) | [Target Sum](/dsa-patterns/0-1-knapsack-target-sum-top-down-approach/) | [Coin Change](/dsa-patterns/unbounded-knapsack-coin-change/) | [Burst Balloons](/dsa-patterns/interval-dp-busting-balloons/) | [DP Wiki](/dsa-patterns/dynamic-programming-wiki/)

---

## Key Relationships

| From | To | Insight |
|------|-----|---------|
| Two Pointers | Sliding Window | Window is specialized two-pointer with grow/shrink |
| DFS | Backtracking | Backtracking = DFS + make choice + undo choice |
| Recursion | Memoization → DP | Cache overlapping subproblems, then flip to bottom-up |
| Greedy | DP | Greedy works when local optimal = global optimal; DP when it doesn't |
| Stack | Monotonic Stack | Maintain ordering invariant for next greater/smaller |
| BFS | Dijkstra | Dijkstra = BFS with priority queue for weighted graphs |
| DFS/BFS | Union Find | Union Find is better for dynamic/repeated connectivity queries |

---

## When NOT to Use a Pattern

| Pattern | Don't use when... |
|---------|-------------------|
| Two Pointers | Array is unsorted and order matters |
| Sliding Window | Elements are not contiguous, or no clear expand/contract rule |
| Binary Search | Search space is not monotonic |
| DFS | Need shortest path (use BFS) |
| BFS | Need all paths or memory is limited on wide graphs |
| Backtracking | Don't need all solutions (DP/Greedy is faster) |
| DP | No overlapping subproblems, or greedy works |
| Greedy | Local optimal doesn't guarantee global optimal |
| Heap | Only tracking one min/max (use a variable) |

---

