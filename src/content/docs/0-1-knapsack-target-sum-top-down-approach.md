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

```csharp
// top down approach
public int FindTargetSumWays(int[] nums, int target) {
    // memoize previously computed results, keyed by (index, currentSum)
    var memo = new Dictionary<(int, int), int>();

    int Dfs(int i, int currSum) {
        // Base case: reached end of array
        if (i == nums.Length) {
            return currSum == target ? 1 : 0;
        }

        // Check if we have already computed this state
        if (memo.TryGetValue((i, currSum), out int cached)) {
            return cached;
        }

        // Count ways by both adding and subtracting the current number
        int ways = Dfs(i + 1, currSum + nums[i]) + Dfs(i + 1, currSum - nums[i]);

        // Store result before returning
        memo[(i, currSum)] = ways;
        return ways;
    }

    return Dfs(0, 0);
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

```csharp
public int FindTargetSumWays(int[] nums, int target) {
    int total = nums.Sum();

    // P = (target + total) / 2 must be a non-negative integer
    if ((target + total) % 2 != 0 || Math.Abs(target) > total) return 0;

    int subsetSum = (target + total) / 2;
    int[] dp = new int[subsetSum + 1];
    dp[0] = 1;

    foreach (int num in nums) {
        for (int i = subsetSum; i >= num; i--) {  // backward — each number used once
            dp[i] += dp[i - num];
        }
    }

    return dp[subsetSum];
}
```