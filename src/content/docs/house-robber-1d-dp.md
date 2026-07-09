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

```csharp
public int Rob(int[] nums) {
    int n = nums.Length;
    if (n == 1) return nums[0];

    int[] dp = new int[n];
    dp[0] = nums[0];
    dp[1] = Math.Max(nums[0], nums[1]);

    for (int i = 2; i < n; i++) {
        dp[i] = Math.Max(
            dp[i - 1],           // Skip current house
            dp[i - 2] + nums[i]  // Rob current house
        );
    }

    return dp[n - 1];
}
```

**Approach 2: Space-optimized O(1)**

```csharp
public int Rob(int[] nums) {
    int n = nums.Length;
    if (n == 1) return nums[0];

    int prev2 = nums[0];                      // dp[i-2]
    int prev1 = Math.Max(nums[0], nums[1]);   // dp[i-1]

    for (int i = 2; i < n; i++) {
        int current = Math.Max(prev1, prev2 + nums[i]);
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

```csharp
public int Rob(int[] nums) {
    int n = nums.Length;
    if (n == 1) return nums[0];

    // Helper: rob houses from start to end (inclusive)
    int RobRange(int start, int end) {
        int prev2 = 0;
        int prev1 = 0;

        for (int i = start; i <= end; i++) {
            int current = Math.Max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }

    return Math.Max(
        RobRange(0, n - 2),  // Exclude last house
        RobRange(1, n - 1)   // Exclude first house
    );
}
```

### House Robber III (Binary Tree)

Houses form a binary tree. Can't rob directly connected nodes (parent-child).

```csharp
public int Rob(TreeNode? root) {
    // Returns (robThis, skipThis)
    (int rob, int skip) Dfs(TreeNode? node) {
        if (node is null) return (0, 0);

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        // Rob this node: can't rob children
        int robThis = node.val + left.skip + right.skip;

        // Skip this node: take best of each child
        int skipThis = Math.Max(left.rob, left.skip) + Math.Max(right.rob, right.skip);

        return (robThis, skipThis);
    }

    var (rob, skip) = Dfs(root);
    return Math.Max(rob, skip);
}
```

### Pattern: Decision at Each Step

This pattern applies when you make a binary decision at each step:

| Problem | Decision | Recurrence |
|---------|----------|------------|
| House Robber | Rob or skip | `max(dp[i-1], dp[i-2] + val)` |
| Best Time to Buy Stock | Buy or hold | `max(hold, cash + price)` |
| 0/1 Knapsack | Take or leave | `max(dp[i-1][w], dp[i-1][w-wt] + val)` |
