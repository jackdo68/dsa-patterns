---
title: "Subset"
topic: "backtracking"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 78 - Subsets](https://leetcode.com/problems/subsets/)

- *Given an integer array `nums` of **unique** elements, return *all possible* *subsets* *(the power set)*. The solution set **must not** contain duplicate subsets. Return the solution in **any order**.*
- *Example:*
- *Input: nums = [1,2,3]*
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

### Ideas

**Subsets (power set):** All possible combinations of elements, including the empty set. An array of n elements has 2^n subsets. See [Maths](/dsa-patterns/maths/) for the theory behind this.

**Binary decision tree:** At each element, we make a binary choice - include it or exclude it. This creates a binary tree where each leaf is a valid subset.

```
                    []
                 /      \
            [1]           []
           /   \        /    \
       [1,2]   [1]    [2]     []
       /  \    / \    / \    /  \
   [1,2,3][1,2][1,3][1][2,3][2][3][]
```

**Key mechanics:**
- Base case: when `idx === nums.length`, we've made all decisions → add path to result
- Recursive case: try both branches (exclude first, then include)
- Backtrack after including by calling `path.pop()`

**Time: O(n × 2^n)** — 2^n subsets, each takes O(n) to copy

**Space: O(n)** — recursion depth + path array

### Solution

```csharp
public IList<IList<int>> Subsets(int[] nums) {
    var result = new List<IList<int>>();

    void Dfs(int idx, List<int> path) {
        if (idx == nums.Length) {
            result.Add(new List<int>(path));
            return;
        }
        // Exclude nums[idx]
        Dfs(idx + 1, path);
        // Include nums[idx]
        path.Add(nums[idx]);
        Dfs(idx + 1, path);
        path.RemoveAt(path.Count - 1);
    }

    Dfs(0, new List<int>());
    return result;
}
```