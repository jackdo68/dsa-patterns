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

```typescript
function maxCoins(nums: number[]): number {
  const n = nums.length;
  // store the state for memoization
  // initialize to 0
  const dp: number[][] = Array.from({ length: n }, 
  () => Array.from({ length: n }, () => 0));

  // function to calculcate the max coin we can get if burst
  // all balloons from l to r inclusively
  function f(l: number, r: number): number {
    // invalid range
    if (l > r) return 0;

    // already calculate
    if (dp[l][r] !== 0) return dp[l][r];

    // try each balloon that will be bursted last
    for (let i = l; i <= r; i++) {
      // burst all balloons from l to i-1
      const leftResult = f(l, i - 1);
      // burst all balloons from i+1 to r
      const rightResult = f(i + 1, r);
      // calculate multipliers if it's out of bound
      const lastLeft = l === 0 ? 1 : nums[l - 1];
      const lastRight = r === n - 1 ? 1 : nums[r + 1];
      const val = lastLeft * nums[i] * lastRight;
      
      dp[l][r] = Math.max(dp[l][r], leftResult + val + rightResult);
    }
    return dp[l][r];
  }
  return f(0, n - 1);
}
```