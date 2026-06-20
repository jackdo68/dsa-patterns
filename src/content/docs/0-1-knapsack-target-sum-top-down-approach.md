---
title: "0/1 Knapsack - Target Sum - Top down approach"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "High"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 494 - Target Sum](https://leetcode.com/problems/target-sum/)

- *You are given an integer array `nums` and an integer `target`. You want to build an **expression** out of nums by adding one of the symbols `'+'` and `'-'` before each integer in nums and then concatenate all the integers.*
- *For example, if `nums = [2, 1]`, you can add a `'+'` before `2` and a `'-'` before `1` and concatenate them to build the expression `"+2-1"`. Return the number of different **expressions** that you can build, which evaluates to `target`.*

### Ideas

- Each number in the array has two choices: add `+` or `-` before it, forming a binary decision tree
- This is a 0/1 knapsack variant — at each index, we either "take" (add) or "skip" (subtract) the number
- Brute force DFS explores all 2^n combinations, but many subtrees repeat the same `(index, currentSum)` state
- Use memoization (top-down DP) to cache results for each `(index, currentSum)` pair, reducing time to O(n * totalSum)
- Base case: when we've assigned a sign to every number, check if the running sum equals the target

### Solution

```typescript
// top down approach
function findTargetSumWays(nums: number[], target: number): number {
  // Map to store previously computed results
  // Key: `${index},${currentSum}`, Value: number of ways
  const memo = new Map<string, number>();

  function dfs(i: number, currSum: number): number {
    // Base case: reached end of array
    if (i === nums.length) {
      return currSum === target ? 1 : 0;
    }

    // Create key for current state
    const key = `${i},${currSum}`;

    // Check if we have already computed this state
    if (memo.has(key)) {
      return memo.get(key)!;
    }

    // Calculate number of ways by adding and subtracting current number
    const ways = dfs(i + 1, currSum + nums[i]) + dfs(i + 1, currSum - nums[i]);

    // Store result in memo before returning
    memo.set(key, ways);
    return ways;
  }

  return dfs(0, 0);
}
```

### Solution (Bottom-up)

The key insight is a mathematical transformation. If we split nums into a positive set `P` (numbers with `+`) and negative set `N` (numbers with `-`):

```
P + N = total    (all numbers sum to total)
P - N = target   (that's the goal)
──────────────
2P    = total + target
P     = (total + target) / 2
```

So instead of exploring all `+/-` assignments, we just count how many subsets sum to `(total + target) / 2` — a standard 0/1 knapsack count problem.

Edge cases: if `(total + target)` is odd or `|target| > total`, no solution exists.

```typescript
function findTargetSumWays(nums: number[], target: number): number {
  const total = nums.reduce((a, b) => a + b, 0);

  // P = (target + total) / 2 must be a non-negative integer
  if ((target + total) % 2 !== 0 || Math.abs(target) > total) return 0;

  const subsetSum = (target + total) / 2;
  const dp = new Array(subsetSum + 1).fill(0);
  dp[0] = 1;

  for (const num of nums) {
    for (let i = subsetSum; i >= num; i--) {  // backward — each number used once
      dp[i] += dp[i - num];
    }
  }

  return dp[subsetSum];
}
```