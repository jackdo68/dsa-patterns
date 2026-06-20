---
title: "House Robber"
topic: "dynamic-programming, 1d-dp, medium"
---
### Question

[LeetCode 198 - House Robber](https://leetcode.com/problems/house-robber/)

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. The only constraint stopping you from robbing each of them is that adjacent houses have security systems connected - **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array `nums` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.

**Example 1:**
```
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount = 1 + 3 = 4.
```

**Example 2:**
```
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount = 2 + 9 + 1 = 12.
```

### Ideas

At each house `i`, you have two choices:
1. **Rob it:** Add `nums[i]` to the best result from house `i-2` (can't rob adjacent)
2. **Skip it:** Take the best result from house `i-1`

**Recurrence:** `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

**Base cases:**
- `dp[0] = nums[0]` (only one house, rob it)
- `dp[1] = max(nums[0], nums[1])` (two houses, rob the richer one)

### Implementation

**Approach 1: Bottom-up DP**

```tsx
function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];

    const dp: number[] = new Array(n);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(
            dp[i - 1],           // Skip current house
            dp[i - 2] + nums[i]  // Rob current house
        );
    }

    return dp[n - 1];
}
```

**Approach 2: Space-optimized O(1)**

```tsx
function rob(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];

    let prev2 = nums[0];                      // dp[i-2]
    let prev1 = Math.max(nums[0], nums[1]);   // dp[i-1]

    for (let i = 2; i < n; i++) {
        const current = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}
```

**Time Complexity:** O(n)

**Space Complexity:** O(1)

### House Robber II (Circular)

Houses are arranged in a circle (first and last are adjacent).

**Key insight:** Either rob houses `[0, n-2]` OR houses `[1, n-1]`, but not both.

```tsx
function robCircular(nums: number[]): number {
    const n = nums.length;
    if (n === 1) return nums[0];

    // Helper: rob houses from start to end (inclusive)
    function robRange(start: number, end: number): number {
        let prev2 = 0;
        let prev1 = 0;

        for (let i = start; i <= end; i++) {
            const current = Math.max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    return Math.max(
        robRange(0, n - 2),  // Exclude last house
        robRange(1, n - 1)   // Exclude first house
    );
}
```

### House Robber III (Binary Tree)

Houses form a binary tree. Can't rob directly connected nodes (parent-child).

```tsx
function robTree(root: TreeNode | null): number {
    // Returns [robThis, skipThis]
    function dfs(node: TreeNode | null): [number, number] {
        if (!node) return [0, 0];

        const left = dfs(node.left);
        const right = dfs(node.right);

        // Rob this node: can't rob children
        const robThis = node.val + left[1] + right[1];

        // Skip this node: take best of each child
        const skipThis = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);

        return [robThis, skipThis];
    }

    const [rob, skip] = dfs(root);
    return Math.max(rob, skip);
}
```

### Pattern: Decision at Each Step

This pattern applies when you make a binary decision at each step:

| Problem | Decision | Recurrence |
|---------|----------|------------|
| House Robber | Rob or skip | `max(dp[i-1], dp[i-2] + val)` |
| Best Time to Buy Stock | Buy or hold | `max(hold, cash + price)` |
| 0/1 Knapsack | Take or leave | `max(dp[i-1][w], dp[i-1][w-wt] + val)` |
