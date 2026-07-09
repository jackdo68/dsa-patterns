---
title: "Dynamic Number of Subproblems - Longest Increasing Subsequences (LIS)"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "Medium"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 300 - Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)

*Given an integer array `nums`, return the length of the longest **strictly increasing subsequence**.*

### Ideas

**1. Recognize the pattern:**
- Single sequence, looking for longest increasing subsequence — this is single-sequence DP
- Unlike LCS which compares two sequences, here we compare elements within the same array

**2. DP setup:**
- `dp[i]` = length of the longest increasing subsequence ending at index `i`
- Base case: every element alone is a subsequence of length 1, so fill with 1

**3. Derive the recurrence:**
- For each position `i`, look back at all previous positions `j < i`:
  - If `nums[i] > nums[j]`, we can extend the subsequence ending at `j` → `dp[i] = max(dp[i], dp[j] + 1)`
  - If `nums[i] <= nums[j]`, can't extend — skip
- The answer is `max(dp)` since the LIS can end at any position

**4. Why "dynamic number of subproblems":**
- Unlike knapsack where each state checks a fixed set of items, here `dp[i]` depends on a variable number of previous states (`dp[0]` through `dp[i-1]`) — only those where `nums[j] < nums[i]`

**Time: O(n^2), Space: O(n)**

### Solution

```csharp
public int LengthOfLIS(int[] nums) {
    int[] dp = new int[nums.Length];
    Array.Fill(dp, 1); // each element alone is a subsequence of length 1

    for (int i = 1; i < nums.Length; i++) {
        for (int j = i - 1; j >= 0; j--) {
            if (nums[i] > nums[j]) { // we can extend the subsequence
                dp[i] = Math.Max(dp[i], dp[j] + 1);
            }
        }
    }
    return dp.Max();
}
```