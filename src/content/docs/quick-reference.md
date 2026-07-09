---
title: "Quick Reference Cheat Sheet"
---
**Print this page and review before interviews!**

---

## 🎯 Pattern Recognition (Quick Triggers)

| If Problem Has... | Use Pattern | Time | Space |
|-------------------|-------------|------|-------|
| "subarray/substring", "contiguous" | **Sliding Window** | O(n) | O(1) or O(k) |
| "two sum", "complement", "frequency" | **Hash Map** | O(n) | O(n) |
| "sorted array", "two sum", "pair" | **Two Pointers** | O(n) | O(1) |
| "range sum", "subarray sum" | **Prefix Sum** | O(n) | O(n) |
| "max/min subarray sum" | **Kadane's** | O(n) | O(1) |
| "next greater/smaller" | **Monotonic Stack** | O(n) | O(n) |
| "find in sorted", "log(n)" | **Binary Search** | O(log n) | O(1) |
| "cycle in linked list" | **Floyd's (Fast/Slow)** | O(n) | O(1) |
| "reverse linked list" | **In-Place Reversal** | O(n) | O(1) |
| "level by level", "shortest path" (unweighted) | **BFS** | O(V+E) | O(V) |
| "explore all paths", "connected components" | **DFS** | O(V+E) | O(V) |
| "shortest path" (weighted, no negative) | **Dijkstra** | O(E log V) | O(V) |
| "shortest path" (with negative weights) | **Bellman Ford** | O(VE) | O(V) |
| "all pairs shortest path" | **Floyd Warshall** | O(V³) | O(V²) |
| "dependency order", "prerequisites" | **Topological Sort** | O(V+E) | O(V) |
| "dynamic connectivity" | **Union Find** | O(α(n)) | O(n) |
| "minimum spanning tree" | **Kruskal's/Prim's** | O(E log E) | O(V) |
| "all subsets", "all permutations" | **Backtracking** | O(2ⁿ) or O(n!) | O(n) |
| "kth largest/smallest" | **Heap** | O(n log k) | O(k) |
| "median in stream" | **Two Heaps** | O(log n) | O(n) |
| "merge k sorted" | **Heap** | O(n log k) | O(k) |
| "optimize", "min/max", has subproblems | **Dynamic Programming** | varies | varies |
| "intervals", "merge", "schedule" | **Greedy (Intervals)** | O(n log n) | O(1) |
| "prefix matching", "word search" | **Trie** | O(L) | O(N*L) |
| "find single element", "appears once" | **XOR (Bit Manipulation)** | O(n) | O(1) |
| "generate valid combinations" | **Backtracking** | O(4ⁿ/√n) | O(n) |
| "search word in grid" | **Grid Backtracking** | O(m·n·4^L) | O(L) |
| "minimum rooms/resources" | **Interval + Heap** | O(n log n) | O(n) |
| "rotate matrix 90°" | **Transpose + Reverse** | O(n²) | O(1) |

---

## 📚 All 102 Patterns (Categorized)

### ARRAYS (10)
1. [**Two Sum (Hash Map)**](/dsa-patterns/two-sum/) - O(n), O(n) - Complement lookup
2. [**3Sum (Two Pointers)**](/dsa-patterns/3sum/) - O(n²), O(1) - Triplet finding
3. [**Trapping Rain Water**](/dsa-patterns/trapping-rain-water/) - O(n), O(1) - Two pointer bottleneck
4. [**Prefix Sum**](/dsa-patterns/prefix-sum/) - O(n), O(n) - Range sum queries
5. [**Kadane's**](/dsa-patterns/kadane-s-algorithm-sub-array-max-sum/) - O(n), O(1) - Max subarray sum
6. [**Product Except Self**](/dsa-patterns/product-except-self/) - O(n), O(1) - Array multiplication
7. [**Two Pointers**](/dsa-patterns/container-with-most-water/) - O(n), O(1) - Sorted array pairs
8. [**Cyclic Sort**](/dsa-patterns/cyclic-sort-find-the-duplicate-number/) - O(n), O(1) - Find missing/duplicate in [1..n]
9. [**In-place Rotation**](/dsa-patterns/in-place-rotation/) - O(n), O(1) - Rotate array
10. [**Move Zeroes**](/dsa-patterns/move-zeroes/) - O(n), O(1) - In-place rearrangement

### HASH MAPS (3)
11. [**Group Anagrams**](/dsa-patterns/group-anagrams/) - O(n·k log k), O(n·k) - Sort-based grouping
12. [**Top K Frequent**](/dsa-patterns/top-k-frequent-elements/) - O(n), O(n) - Bucket sort frequency
13. [**Longest Consecutive Sequence**](/dsa-patterns/longest-consecutive-sequence/) - O(n), O(n) - Set-based streak

### SLIDING WINDOW (3)
14. [**Fixed Size**](/dsa-patterns/fixed-size-find-all-anagrams-in-a-string/) - O(n), O(k) - Window size k
15. [**Variable Size**](/dsa-patterns/variable-size-longest-substring-without-repeatin/) - O(n), O(k) - Longest/shortest substring
16. [**Monotonic Queue/Stack**](/dsa-patterns/monotonic-queue-stack-sliding-window-maximum/) - O(n), O(k) - Sliding window max/min

### STRINGS (5)
17. [**String Reversal**](/dsa-patterns/string-reversal-reverse-string-in-place/) - O(n), O(1) - In-place reverse
18. [**ATOI**](/dsa-patterns/string-to-integer-ascii-to-integer-atoi/) - O(n), O(1) - String to integer
19. [**Rabin Karp**](/dsa-patterns/string-matching-rabin-karp/) - O(n+m), O(1) - Pattern matching
20. [**Expanding from Center**](/dsa-patterns/expanding-from-center-longest-palindrome-substri/) - O(n²), O(1) - Palindromes
21. [**Trie**](/dsa-patterns/trie-prefix-tree/) - O(L), O(N*L) - Prefix tree

### STACK (5)
22. [**Valid Parentheses**](/dsa-patterns/valid-parentheses/) - O(n), O(n) - Matching pairs
23. [**Min Stack**](/dsa-patterns/min-stack/) - O(1) all ops, O(n) - Stack with min tracking
24. [**Daily Temperatures**](/dsa-patterns/daily-temperatures/) - O(n), O(n) - Monotonic stack application
25. [**Monotonic Stack**](/dsa-patterns/monotonic-stack-remove-k-digits/) - O(n), O(n) - Next greater/smaller
26. [**Expression Evaluation**](/dsa-patterns/expression-evaluation-basic-calculator/) - O(n), O(n) - Calculator

### LINKED LIST (6)
27. [**Fast & Slow (Floyd's)**](/dsa-patterns/fast-slow-floyd-s-algorithm-cycle-detection/) - O(n), O(1) - Cycle detection
28. [**In-Place Reversal**](/dsa-patterns/in-place-reversal-reverse-linked-list-ii/) - O(n), O(1) - Reverse list
29. [**Merge Two Sorted**](/dsa-patterns/merge-two-sorted-lists/) - O(n+m), O(1) - Merge lists
30. [**Remove Nth from End**](/dsa-patterns/remove-nth-node-from-end-of-list/) - O(n), O(1) - Remove node
31. [**Intersection Detection**](/dsa-patterns/intersection-detection/) - O(n+m), O(1) - Find intersection
32. [**Rotate List**](/dsa-patterns/reordering-partitioning-rotate-list/) - O(n), O(1) - Reorder list

### BINARY SEARCH (4)
33. [**Monotonic Functions**](/dsa-patterns/binary-search-variations-explained/) - O(log n), O(1) - Classic binary search
34. [**Rotated Sorted Array**](/dsa-patterns/find-min-max-search-in-rotated-sorted-array/) - O(log n), O(1) - Find min/max
35. [**K Closest Elements**](/dsa-patterns/find-k-closest-elements/) - O(log n + k), O(1) - Binary search + expand
36. [**Median of 2 Sorted**](/dsa-patterns/median-of-2-sorted-arrays/) - O(log(min(m,n))), O(1) - Binary search on smaller

### TREES (12)
37. [**BFS (Level Order)**](/dsa-patterns/bfs-binary-tree-level-order-traversal/) - O(n), O(n) - Level by level
38. [**Binary Tree Right Side View**](/dsa-patterns/binary-tree-right-side-view/) - O(n), O(n) - BFS last per level
39. [**DFS Preorder**](/dsa-patterns/dfs-preorder-traversal-same-tree/) - O(n), O(h) - Root first
40. [**DFS Inorder**](/dsa-patterns/dfs-in-order-traversal-validate-binary-search-tr/) - O(n), O(h) - Left-Root-Right
41. [**DFS Postorder**](/dsa-patterns/dfs-postorder-traversal-max-depth/) - O(n), O(h) - Children first
42. [**Path Sum**](/dsa-patterns/path-sum/) - O(n), O(h) - Root-to-leaf sum
43. [**Path Sum II**](/dsa-patterns/path-sum-ii/) - O(n), O(h) - All valid paths (backtracking)
44. [**Diameter of Binary Tree**](/dsa-patterns/diameter-of-binary-tree/) - O(n), O(h) - Max path through any node
45. [**Balanced Binary Tree**](/dsa-patterns/balanced-binary-tree/) - O(n), O(h) - Height-balanced check
46. [**LCA**](/dsa-patterns/lowest-common-ancestor-lca/) - O(n), O(h) - Lowest common ancestor
47. [**Construct Tree from Traversals**](/dsa-patterns/construct-tree-from-traversals/) - O(n), O(n) - Build from preorder/inorder
48. [**Serialize/Deserialize**](/dsa-patterns/serialize-and-deserialize-binary-tree/) - O(n), O(n) - Tree to string

### MATRIX (3)
49. [**Spiral Traversal**](/dsa-patterns/spiral-traversal/) - O(m*n), O(1) - Spiral order
50. [**Set Matrix Zeroes**](/dsa-patterns/set-matrix-zeroes/) - O(m*n), O(1) - In-place modification
51. [**Rotate Image**](/dsa-patterns/rotate-image-matrix/) - O(n²), O(1) - 90° rotation in-place

### GRAPHS (11)
52. [**DFS**](/dsa-patterns/dfs-number-of-islands/) - O(V+E), O(V) - Explore all paths
53. [**BFS**](/dsa-patterns/bfs-rotting-oranges/) - O(V+E), O(V) - Shortest path (unweighted)
54. [**Clone Graph**](/dsa-patterns/clone-graph/) - O(V+E), O(V) - Deep copy with cycle handling
55. [**Word Ladder**](/dsa-patterns/word-ladder/) - O(n·L·26), O(n) - BFS shortest transformation
56. [**DFS Cycle Detection**](/dsa-patterns/dfs-cycle-detection-course-schedule-ii/) - O(V+E), O(V) - Detect cycles
57. [**Topological Sort (Kahn's)**](/dsa-patterns/topological-sort-kahn-algorithm-course-schedul/) - O(V+E), O(V) - Dependency order
58. [**Dijkstra's**](/dsa-patterns/shortest-path-dijkstra-algorithm-network-delay/) - O((V+E) log V), O(V) - Shortest path (weighted)
59. [**Bellman Ford**](/dsa-patterns/shortest-path-bellman-ford-algorithm-cheapest/) - O(VE), O(V) - With negative weights
60. [**Floyd Warshall**](/dsa-patterns/shortest-path-floy-warshall-algorithm-minimum/) - O(V³), O(V²) - All pairs shortest
61. [**Union Find**](/dsa-patterns/union-find-disjoint-set-number-of-operations-to/) - O(α(n)), O(n) - Dynamic connectivity
62. [**Kruskal's (MST)**](/dsa-patterns/minimum-spanning-tree-kruskal-algorithm/) - O(E log E), O(V) - Minimum spanning tree

### BACKTRACKING (6)
63. [**Subset**](/dsa-patterns/subset/) - O(2ⁿ), O(n) - Generate all subsets
64. [**Permutations**](/dsa-patterns/permutations-unique/) - O(n!), O(n) - Generate all permutations
65. [**Combination Sum**](/dsa-patterns/pruning-combination-sum/) - O(2ⁿ), O(n) - Find combinations
66. [**Generate Parentheses**](/dsa-patterns/generate-parentheses-backtracking/) - O(4ⁿ/√n), O(n) - Valid parentheses
67. [**Word Search**](/dsa-patterns/word-search-grid-backtracking/) - O(m·n·4^L), O(L) - Grid backtracking
68. [**Palindrome Partitioning**](/dsa-patterns/palindrome-partitioning/) - O(2ⁿ), O(n) - Partition string

### DYNAMIC PROGRAMMING (14) — [Wiki](/dsa-patterns/dynamic-programming-wiki/)
69. [**Climbing Stairs**](/dsa-patterns/climbing-stairs-1d-dp/) - O(n), O(1) - 1D DP intro
70. [**House Robber**](/dsa-patterns/house-robber-1d-dp/) - O(n), O(1) - 1D DP with skip
71. [**1D DP (Fibonacci)**](/dsa-patterns/basic-fibonacci-1d-array/) - O(n), O(n) or O(1) - Sequence problems
72. [**Grid DP**](/dsa-patterns/grid-unique-paths/) - O(m*n), O(m*n) - Path counting
73. [**LIS (Dynamic Subproblems)**](/dsa-patterns/dynamic-number-of-subproblems-longest-increasing/) - O(n²) or O(n log n), O(n) - Longest increasing
74. [**Dual Sequence (LCS)**](/dsa-patterns/dual-sequence-longest-common-subsequence-lcs/) - O(m*n), O(m*n) - Two strings/arrays
75. [**Edit Distance**](/dsa-patterns/edit-distance-dual-sequence-dp/) - O(m*n), O(m*n) - String transformation
76. [**0/1 Knapsack (Top-down)**](/dsa-patterns/0-1-knapsack-target-sum-top-down-approach/) - O(n*sum), O(n*sum) - Choose/skip
77. [**0/1 Knapsack (Bottom-up)**](/dsa-patterns/0-1-knapsack-partition-equal-subset-sum-bottom/) - O(n*sum), O(n*sum) - Tabulation
78. [**Unbounded Knapsack**](/dsa-patterns/unbounded-knapsack-coin-change/) - O(n*amount), O(amount) - Unlimited use
79. [**Interval DP**](/dsa-patterns/interval-dp-busting-balloons/) - O(n³), O(n²) - Range problems
80. [**Word Break**](/dsa-patterns/word-break/) - O(n²), O(n) - String segmentation
81. [**Stock Buy/Sell I**](/dsa-patterns/best-time-to-buy-and-sell-stock/) - O(n), O(1) - One transaction
82. [**Stock Buy/Sell II**](/dsa-patterns/best-time-to-buy-and-sell-stock-ii/) - O(n), O(1) - Multiple transactions

### GREEDY (5)
83. [**Merge Intervals**](/dsa-patterns/merge-interval/) - O(n log n), O(1) - Interval merging
84. [**Meeting Rooms II**](/dsa-patterns/meeting-rooms-ii-interval-heap/) - O(n log n), O(n) - Min rooms needed
85. [**Jump Game**](/dsa-patterns/jump-game/) - O(n), O(1) - Greedy choice
86. [**Task Scheduling**](/dsa-patterns/task-scheduling/) - O(n log n), O(1) - Scheduling
87. [**Candy**](/dsa-patterns/candy/) - O(n), O(n) - Distribution

### HEAP (5)
88. [**Min Heap**](/dsa-patterns/min-heap/) - O(log n) insert/delete, O(n) build - Priority queue
89. [**Find Median (Two Heaps)**](/dsa-patterns/find-median-from-data-stream/) - O(log n) insert, O(1) median - Stream median
90. [**Merge k Sorted**](/dsa-patterns/merge-k-sorted-lists/) - O(n log k), O(k) - Merge lists/arrays
91. [**Kth Largest Element**](/dsa-patterns/kth-largest-element-quick-select/) - O(n) avg, O(k) - Quick Select
92. [**Heap vs BST**](/dsa-patterns/min-heap-vs-binary-search-tree/) - Conceptual understanding

### SORTING (3)
93. [**Merge Sort**](/dsa-patterns/merge-sort/) - O(n log n), O(n) - Stable divide and conquer
94. [**Sort List**](/dsa-patterns/sort-list/) - O(n log n), O(log n) - Merge sort on linked list
95. [**Quick Sort**](/dsa-patterns/quick-sort/) - O(n log n) avg, O(n²) worst, O(log n) space - Partition sort

### BIT MANIPULATION (1)
96. [**Single Number (XOR)**](/dsa-patterns/single-number-xor/) - O(n), O(1) - XOR properties

### OTHER TOPICS (6)
97. [**LRU Cache**](/dsa-patterns/lru-cache/) - O(1) get/put, O(capacity) space - Cache design
98. [**Fenwick Tree (BIT)**](/dsa-patterns/fenwick-tree-binary-index-tree/) - O(log n) update/query, O(n) space - Range queries
99. [**Maths (Base, Modular, Log)**](/dsa-patterns/maths/) - varies - Number theory
100. **Permutations/Subsets (Math)** - O(1) - Combinatorics
101. [**Merge Sorted Array**](/dsa-patterns/merge-sorted-array/) - O(n+m), O(1) - Two pointer merge
102. [**Time Complexity**](/dsa-patterns/time-complexity/) - Conceptual - Big O analysis

---

## 🔑 Code Templates

### 1. Two Pointers (Opposite Ends)
```csharp
void TwoPointers(int[] arr) {
    int left = 0, right = arr.Length - 1;
    while (left < right) {
        // Check condition
        if (condition) {
            // Do something
            left++; right--;
        } else if (needMoveLeft) {
            left++;
        } else {
            right--;
        }
    }
}
```

### 2. Sliding Window (Variable Size)
```csharp
int SlidingWindow(string s) {
    int left = 0, right = 0;
    int maxLen = 0;
    var window = new Dictionary<char, int>();

    while (right < s.Length) {
        // Expand window
        window[s[right]] = window.GetValueOrDefault(s[right], 0) + 1;
        right++;

        // Contract window when invalid
        while (invalid) {
            window[s[left]]--;
            left++;
        }

        maxLen = Math.Max(maxLen, right - left);
    }
    return maxLen;
}
```

### 3. Tree Traversals

**Pre-order (Root → Left → Right)** — building a copy of tree, serialization, prefix expressions
```csharp
void Preorder(TreeNode? node) {
    if (node is null) return;
    Process(node);
    Preorder(node.left);
    Preorder(node.right);
}
```

**In-order (Left → Root → Right)** — BST gives sorted order, validate BST, kth smallest
```csharp
void Inorder(TreeNode? node) {
    if (node is null) return;
    Inorder(node.left);
    Process(node);
    Inorder(node.right);
}
```

**Post-order (Left → Right → Root)** — delete tree, calculate height/diameter, evaluate expressions
```csharp
void Postorder(TreeNode? node) {
    if (node is null) return;
    Postorder(node.left);
    Postorder(node.right);
    Process(node);
}
```

### 4. Graph Traversals

**DFS (Recursive)**
```csharp
void Dfs(Node node, HashSet<Node> visited) {
    if (node is null || visited.Contains(node)) return;

    visited.Add(node);
    // Process node

    foreach (var neighbor in node.neighbors) {
        Dfs(neighbor, visited);
    }
}
```

**BFS (Level Order)**
```csharp
void Bfs(Node start) {
    var queue = new Queue<Node>();
    queue.Enqueue(start);
    var visited = new HashSet<Node> { start };

    while (queue.Count > 0) {
        int size = queue.Count;
        for (int i = 0; i < size; i++) {
            var node = queue.Dequeue();
            // Process node

            foreach (var neighbor in node.neighbors) {
                if (!visited.Contains(neighbor)) {
                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }
        }
    }
}
```

### 5. Backtracking
```csharp
void Backtrack(List<int> path, IEnumerable<int> choices, List<IList<int>> result) {
    if (IsComplete(path)) {
        result.Add(new List<int>(path));
        return;
    }

    foreach (var choice in choices) {
        // Make choice
        path.Add(choice);

        // Recurse
        Backtrack(path, newChoices, result);

        // Undo choice
        path.RemoveAt(path.Count - 1);
    }
}
```

### 6. Dynamic Programming

**Top-down (Memoization)**
```csharp
int Dp(int n, Dictionary<int, int> memo) {
    if (baseCase) return baseValue;
    if (memo.TryGetValue(n, out int cached)) return cached;

    memo[n] = /* compute from subproblems */;
    return memo[n];
}
```

**Bottom-up (Tabulation)**
```csharp
int Dp(int n) {
    int[] dp = new int[n + 1];
    dp[0] = baseValue;

    for (int i = 1; i <= n; i++) {
        dp[i] = /* compute from dp[i-1], dp[i-2], etc. */;
    }
    return dp[n];
}
```

**0/1 Knapsack** — each item used at most once → iterate BACKWARD. Use when: subset sum, partition equal subset, target sum
```csharp
bool Knapsack01(int[] nums, int target) {
    bool[] dp = new bool[target + 1];
    dp[0] = true;

    foreach (int num in nums) {
        for (int i = target; i >= num; i--) {  // backward prevents reuse
            dp[i] = dp[i] || dp[i - num];
        }
    }
    return dp[target];
}
```

**Unbounded Knapsack** — each item used unlimited times → iterate FORWARD. Use when: coin change, unbounded supply, combinations to reach target
```csharp
int KnapsackUnbounded(int[] coins, int target) {
    int[] dp = new int[target + 1];
    dp[0] = 1;

    foreach (int coin in coins) {
        for (int i = coin; i <= target; i++) {  // forward allows reuse
            dp[i] += dp[i - coin];
        }
    }
    return dp[target];
}
```

**LCS (Longest Common Subsequence)** — Use when: longest common subsequence, edit distance, diff
```csharp
int Lcs(string s1, string s2) {
    int[,] dp = new int[s1.Length + 1, s2.Length + 1];

    for (int i = 1; i <= s1.Length; i++) {
        for (int j = 1; j <= s2.Length; j++) {
            if (s1[i - 1] == s2[j - 1]) {
                dp[i, j] = dp[i - 1, j - 1] + 1;
            } else {
                dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }
    }
    return dp[s1.Length, s2.Length];
}
```

**LIS (Longest Increasing Subsequence)** — O(n log n) via patience sorting + binary search. Use when: longest increasing subsequence, Russian doll envelopes
```csharp
int Lis(int[] nums) {
    var tails = new List<int>(); // tails[i] = smallest tail of increasing subseq of length i+1

    foreach (int num in nums) {
        int lo = 0, hi = tails.Count;
        while (lo < hi) {
            int mid = (lo + hi) >> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        if (lo == tails.Count) tails.Add(num);
        else tails[lo] = num;
    }
    return tails.Count;
}
```

**Grid DP** — Use when: unique paths, min path sum, grid traversal
```csharp
int GridDP(int[][] grid) {
    int m = grid.Length, n = grid[0].Length;
    int[,] dp = new int[m, n];
    dp[0, 0] = grid[0][0];

    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            int top = i > 0 ? dp[i - 1, j] : int.MaxValue;
            int left = j > 0 ? dp[i, j - 1] : int.MaxValue;
            dp[i, j] = grid[i][j] + Math.Min(top, left);
        }
    }
    return dp[m - 1, n - 1];
}
```

**Interval DP** — Use when: burst balloons, matrix chain multiplication, palindrome partitioning
```csharp
int IntervalDP(int[] arr) {
    int n = arr.Length;
    int[,] dp = new int[n, n];

    for (int len = 2; len <= n; len++) {          // subproblem length
        for (int i = 0; i <= n - len; i++) {      // start index
            int j = i + len - 1;                  // end index
            dp[i, j] = int.MaxValue;
            for (int k = i; k < j; k++) {         // split point
                dp[i, j] = Math.Min(dp[i, j], dp[i, k] + dp[k + 1, j] + Cost(i, j));
            }
        }
    }
    return dp[0, n - 1];
}
```

### 7. Binary Search

**The one form to memorize.** Every binary search problem reduces to *"find the first index where a predicate is true."* Reframe the question, then apply this template — it handles exact match, first/last occurrence, insertion position, and binary search on answer.

```csharp
int BinarySearch(int[] nums, Func<int, bool> predicate) {
    int left = 0, right = nums.Length - 1;
    int result = nums.Length;                 // default: predicate never true
    while (left <= right) {
        int mid = (left + right) / 2;
        if (predicate(mid)) {
            result = mid;                     // record this candidate
            right = mid - 1;                  // search left for an earlier match
        } else {
            left = mid + 1;                   // mid is not the answer — exclude it
        }
    }
    return result;  // first index where predicate is true (or n if none)
}
```

**Cheat sheet — what predicate to use:**

| Question | Predicate | Post-processing |
|----------|-----------|-----------------|
| Is X in array? | `nums[i] >= X` | Check `nums[result] === X`; else `-1` |
| First occurrence of X | `nums[i] >= X` | Same as above |
| Last occurrence of X | `nums[i] > X` | Subtract 1 |
| Insertion position (lower bound) | `nums[i] >= X` | Use directly |
| Upper bound | `nums[i] > X` | Use directly |
| Smallest valid value | `isFeasible(mid)` | Use directly |

See [Binary Search Variations Explained](/dsa-patterns/binary-search-variations-explained/) for the mental model, walkthroughs, and worked examples for every case.

### 8. Union Find
```csharp
public class UnionFind {
    private readonly int[] parent;
    private readonly int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        rank = new int[n];
    }

    public int Find(int x) {
        if (parent[x] != x) {
            parent[x] = Find(parent[x]); // path compression
        }
        return parent[x];
    }

    public bool Union(int x, int y) {
        int rootX = Find(x);
        int rootY = Find(y);

        if (rootX == rootY) return false;

        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}
```

### 9. Dijkstra's Algorithm
```csharp
int[] Dijkstra(List<(int neighbor, int weight)>[] graph, int start, int n) {
    int[] dist = new int[n];
    Array.Fill(dist, int.MaxValue);
    // .NET's built-in min-heap: element = node, priority = distance
    var heap = new PriorityQueue<int, int>();
    dist[start] = 0;
    heap.Enqueue(start, 0);

    while (heap.TryDequeue(out int node, out int d)) {
        if (d > dist[node]) continue;

        foreach (var (neighbor, weight) in graph[node]) {
            int newDist = dist[node] + weight;
            if (newDist < dist[neighbor]) {
                dist[neighbor] = newDist;
                heap.Enqueue(neighbor, newDist);
            }
        }
    }
    return dist;
}
```

### 10. Linked List

**Reverse Linked List** — Pattern: save → flip → advance → advance. After the loop, `curr` is `null` and `prev` is the new head.
```csharp
ListNode? ReverseList(ListNode? head) {
    ListNode? prev = null;
    ListNode? curr = head;

    while (curr is not null) {
        ListNode? next = curr.next;  // 1. save next before breaking link
        curr.next = prev;            // 2. flip pointer backward
        prev = curr;                 // 3. advance prev
        curr = next;                 // 4. advance curr
    }

    return prev; // new head
}
```

---

## ⚡ Time Complexity Hierarchy (Fast to Slow)

```
O(1) < O(log log n) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
```

**Common Complexities:**
- **O(1):** Hash map lookup, array access
- **O(log n):** Binary search, balanced tree operations
- **O(n):** Linear scan, two pointers, sliding window
- **O(n log n):** Merge sort, quick sort (avg), heap operations on n elements
- **O(n²):** Nested loops, basic DP
- **O(2ⁿ):** Subsets, some backtracking
- **O(n!):** Permutations

---

## 🎯 Decision Tree (One-Minute Pattern Selection)

```
START
  ├─ Array/String?
  │  ├─ Contiguous elements? → Sliding Window
  │  ├─ Sorted + pairs? → Two Pointers
  │  ├─ Range sums? → Prefix Sum
  │  └─ Search in sorted? → Binary Search
  │
  ├─ Tree/Graph?
  │  ├─ Shortest path? → BFS (unweighted) / Dijkstra (weighted)
  │  ├─ All paths? → DFS / Backtracking
  │  ├─ Connectivity? → Union Find / DFS
  │  └─ Topological order? → Topological Sort
  │
  ├─ Need all solutions?
  │  └─ Backtracking
  │
  ├─ Optimization (min/max)?
  │  ├─ Greedy works? → Greedy
  │  └─ Overlapping subproblems? → DP
  │
  └─ Design?
     ├─ Cache? → LRU Cache
     ├─ Prefix? → Trie
     └─ Priority? → Heap
```

---

## 📊 Space vs Time Trade-offs

| Technique | Time Saved | Space Cost |
|-----------|------------|------------|
| Hash Map | O(n²) → O(n) | +O(n) |
| Memoization | O(2ⁿ) → O(n²) | +O(n) or +O(n²) |
| Prefix Sum | O(n) per query → O(1) | +O(n) |
| Heap | O(n log n) → O(n log k) | +O(k) |

---

## 🚨 Common Mistakes to Avoid

1. **Off-by-one errors:** Check `<` vs `<=`, `left + 1` vs `left`
2. **Integer overflow:** Use `Math.floor((left + right) / 2)` not `(left + right) / 2`
3. **Not handling duplicates:** Consider `[1,1,1,1]` test case
4. **Forgetting edge cases:** Empty input, single element, all same
5. **Wrong complexity analysis:** Don't forget space complexity
6. **Modifying while iterating:** Use separate result array
7. **Not considering negative numbers:** Test with [-1, -2, -3]
8. **Stack overflow with deep recursion:** Consider iterative solution
9. **Not initializing data structures:** Check for null/undefined
10. **Forgetting to mark visited in graphs:** Infinite loops!

---

## 🎓 Interview Checklist

**Before coding:**
- [ ] Understand problem (restate in your words)
- [ ] Ask clarifying questions
- [ ] Discuss examples and edge cases
- [ ] Explain approach and complexity
- [ ] Get confirmation before coding

**While coding:**
- [ ] Use descriptive variable names
- [ ] Write clean, readable code
- [ ] Think out loud
- [ ] Handle edge cases
- [ ] Test with example

**After coding:**
- [ ] Walk through code with example
- [ ] Discuss time complexity: O(?)
- [ ] Discuss space complexity: O(?)
- [ ] Mention optimizations
- [ ] Discuss trade-offs

