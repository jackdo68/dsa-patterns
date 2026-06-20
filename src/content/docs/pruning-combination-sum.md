---
title: "Pruning - Combination Sum"
topic: "backtracking"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 39 - Combination Sum](https://leetcode.com/problems/combination-sum/)

*Given an array of **distinct** integers `candidates` and a target integer `target`, return a list of all **unique combinations** of `candidates` where the chosen numbers sum to `target`. You may return the combinations in **any order**.*

*The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.*

*The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.*

### Ideas

**Combinations:** Select elements where order doesn't matter. Unlike permutations, [1,2] and [2,1] are the same combination.

**Unbounded selection:** Each candidate can be used unlimited times. To achieve this, when we recurse, we stay at the same index `i` (not `i + 1`), allowing the same element to be picked again.

**For-loop approach:** Iterate through candidates starting from a `start` index. For each candidate, add it to the path, recurse, then backtrack.

```
candidates = [2,3], target = 5

dfs(start=0, sum=0)
├── pick 2 → dfs(start=0, sum=2)
│   ├── pick 2 → dfs(start=0, sum=4)
│   │   ├── pick 2 → sum=6 > target, skip
│   │   └── pick 3 → sum=7 > target, skip
│   └── pick 3 → sum=5 ✓ [2,3]
└── pick 3 → dfs(start=1, sum=3)
    └── pick 3 → sum=6 > target, skip
```

**Key mechanics:**
- Base case: `sum === target` → found valid combination, add to result
- Pruning: `sum + candidates[i] > target` → skip this candidate
- Recurse with same index `i` → allows reusing the same element
- `start` index prevents duplicates like [2,3] and [3,2]

**Time: O(2^t)** — where t = target/min(candidates), max depth of recursion

**Space: O(t)** — recursion depth proportional to target

### Solution

```typescript
function combinationSum(candidates: number[], target: number): number[][] {
  const results: number[][] = [];

  function dfs(start: number, path: number[], sum: number) {
    if (sum === target) {
      results.push([...path]);
      return;
    }

    for (let i = start; i < candidates.length; i++) {
      if (sum + candidates[i] > target) continue;
      path.push(candidates[i]);
      dfs(i, path, sum + candidates[i]);
      path.pop();
    }
  }

  dfs(0, [], 0);
  return results;
}
```