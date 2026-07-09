---
title: "Unbounded Knapsack - Coin Change"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "High"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 322 - Coin Change](https://leetcode.com/problems/coin-change/)

*You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.*

### Ideas

**1. Recognize the pattern:**
- We have unlimited supply of each coin — this is unbounded knapsack (not 0/1)
- We want the minimum number of items (coins) to reach a target (amount)

**2. DP setup:**
- `dp[i]` = fewest coins needed to make amount `i`
- Base case: `dp[0] = 0` (zero coins to make amount 0)
- Initialize all other values to `Infinity` (unreachable until proven otherwise)

**3. Derive the recurrence:**
- For each amount `i`, try every coin `c`: if we use coin `c`, then `dp[i] = dp[i - c] + 1`
- Take the minimum across all coins: `dp[i] = min(dp[i], dp[i - c] + 1)`

**4. Why forward iteration works here:**
- Unlike 0/1 knapsack, we *want* to reuse coins — unlimited supply means forward iteration is correct
- When `dp[i - c]` was already updated using the same coin, that's fine — we can use that coin again

**Time: O(amount * coins), Space: O(amount)**

### Solution

```csharp
public int CoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Array.Fill(dp, int.MaxValue);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        foreach (int c in coins) {
            if (i - c >= 0 && dp[i - c] != int.MaxValue) {
                dp[i] = Math.Min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] == int.MaxValue ? -1 : dp[amount];
}
```