---
title: "Permutations Unique"
topic: "backtracking, dfs"
difficulty: "Medium"
frequency: "Medium"
---
See [Maths](/dsa-patterns/maths/) for the theory behind permutations and factorial.

### Question

[LeetCode 47 - Permutations II](https://leetcode.com/problems/permutations-ii/)

- *Given a collection of numbers, `nums`, that might contain duplicates, return *all possible unique permutations **in any order**.**
- *Example*

```typescript
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

### Ideas

**Permutations:** All possible orderings of elements. An array of n elements has n! permutations (with duplicates, fewer unique ones).

**Frequency map approach:** Use a map to track each unique number and its remaining count. At each position, only iterate over unique keys - this naturally avoids duplicate permutations without sorting or skip logic.

```
nums = [1,1,2] → map = {1: 2, 2: 1}

Position 0: try 1 (count→1), try 2 (count→0)
Position 1: try remaining keys with count > 0
Position 2: try remaining keys with count > 0
```

**Key mechanics:**
- Base case: when `k === nums.length`, we've filled all positions → add path to result
- Recursive case: for each unique key with count > 0, use it and recurse
- Backtrack by restoring count and popping from path

**Time: O(n! × n)** — up to n! permutations, each takes O(n) to copy

**Space: O(n)** — recursion depth + path array + map with at most n keys

### Solution

```typescript
function permuteUnique(nums: number[]): number[][] {
  const freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  const result: number[][] = [];

  function dfs(path: number[]) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (const num of freq.keys()) {
      if (freq.get(num) === 0) continue;

      freq.set(num, freq.get(num)! - 1);
      path.push(num);
      dfs(path);
      //backtrack
      freq.set(num, freq.get(num)! + 1);
      path.pop();
    }
  }
  dfs([]);
  return result;
}
```