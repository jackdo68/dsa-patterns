---
title: "Climbing Stairs"
topic: "dynamic-programming, 1d-dp, easy"
---
### Question

[LeetCode 70 - Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

You are climbing a staircase. It takes `n` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

### Ideas

This is essentially the **Fibonacci sequence** in disguise.

To reach step `n`, you can come from:
- Step `n-1` (take 1 step)
- Step `n-2` (take 2 steps)

So: `dp[n] = dp[n-1] + dp[n-2]`

**Base cases:**
- `dp[1] = 1` (one way to reach step 1)
- `dp[2] = 2` (two ways to reach step 2)

### Implementation

**Approach 1: Bottom-up DP with O(n) space**

```tsx
function climbStairs(n: number): number {
    if (n <= 2) return n;

    const dp: number[] = new Array(n + 1);
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

**Approach 2: Space-optimized O(1)**

```tsx
function climbStairs(n: number): number {
    if (n <= 2) return n;

    let prev2 = 1;  // dp[i-2]
    let prev1 = 2;  // dp[i-1]

    for (let i = 3; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

**Approach 3: Top-down with memoization**

```tsx
function climbStairs(n: number): number {
    const memo: Map<number, number> = new Map();

    function dp(i: number): number {
        if (i <= 2) return i;
        if (memo.has(i)) return memo.get(i)!;

        const result = dp(i - 1) + dp(i - 2);
        memo.set(i, result);
        return result;
    }

    return dp(n);
}
```

**Time Complexity:** O(n)

**Space Complexity:** O(1) for optimized version, O(n) for basic DP

### Pattern Recognition

This is the foundational **1D DP pattern**. Similar problems:

| Problem | Recurrence |
|---------|------------|
| Climbing Stairs | `dp[i] = dp[i-1] + dp[i-2]` |
| House Robber | `dp[i] = max(dp[i-1], dp[i-2] + nums[i])` |
| Min Cost Climbing | `dp[i] = cost[i] + min(dp[i-1], dp[i-2])` |
| Decode Ways | `dp[i] = dp[i-1] + dp[i-2]` (with conditions) |

### Variation: K Steps

If you can take 1 to k steps at a time:

```tsx
function climbStairsK(n: number, k: number): number {
    const dp: number[] = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            dp[i] += dp[i - j];
        }
    }

    return dp[n];
}
```
