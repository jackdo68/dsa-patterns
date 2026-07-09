---
title: "Interval DP - Busting balloons"
topic: "dynamic programming"
difficulty: "Hard"
frequency: "Very Low"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 312 - Burst Balloons](https://leetcode.com/problems/burst-balloons/)

*You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons. If you burst the `ith` balloon, you will get `nums[i - 1]  nums[i]  nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it. Return the maximum coins you can collect by bursting the balloons wisely.*
### Ideas

- we divide the `nums` into 2 intervals. Function `f` will be used to calculate the max value from range (interval) `l` to `r`. We loop i from l to r, since all balloons from both sides are busted, the only left is the one outside of the range
- Time complexity: O(n^3)

### Solution

```csharp
public int MaxCoins(int[] nums) {
    int n = nums.Length;
    // memoization table, initialized to 0
    int[,] dp = new int[n, n];

    // max coins we can get by bursting all balloons from l to r inclusively
    int F(int l, int r) {
        // invalid range
        if (l > r) return 0;

        // already calculated
        if (dp[l, r] != 0) return dp[l, r];

        // try each balloon as the one burst last
        for (int i = l; i <= r; i++) {
            // burst all balloons from l to i-1
            int leftResult = F(l, i - 1);
            // burst all balloons from i+1 to r
            int rightResult = F(i + 1, r);
            // multipliers, treating out-of-bounds as 1
            int lastLeft = l == 0 ? 1 : nums[l - 1];
            int lastRight = r == n - 1 ? 1 : nums[r + 1];
            int val = lastLeft * nums[i] * lastRight;

            dp[l, r] = Math.Max(dp[l, r], leftResult + val + rightResult);
        }
        return dp[l, r];
    }
    return F(0, n - 1);
}
```