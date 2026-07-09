---
title: "Shortest Path - Bellman Ford algorithm - Cheapest Flights Within K Stops"
topic: "dynamic programming, graph"
difficulty: "Medium"
frequency: "Very Low"
---
### Question

[LeetCode 787 - Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops/)

*There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from, to, price]` indicates that there is a flight from city `from` to city `to` with cost `price`.*

*You are also given three integers `src`, `dst`, and `k`, return the cheapest price from `src` to `dst` with at most `k` stops. If there is no such route, return `-1`.*

### Ideas

- Bellman Ford algorithm allow to find shortest path when the edges weight can be negative
- **Time complexity**: Bellman Ford algorithn takes longer than Dijkstra algorithm with O(E*V) because all edges are relaxed V-1 times

### Solution

```csharp
public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    // initialize the distance to all nodes to Infinity
    int[] dp = new int[n];
    Array.Fill(dp, int.MaxValue);
    dp[src] = 0;

    for (int i = 0; i <= k; i++) {
        int[] temp = (int[])dp.Clone();
        foreach (var flight in flights) {
            int source = flight[0], target = flight[1], price = flight[2];
            if (dp[source] != int.MaxValue) {
                // compare against temp[target] because within this single pass
                // we may have already updated the distance to target once
                temp[target] = Math.Min(temp[target], dp[source] + price);
            }
        }
        dp = temp;
    }

    return dp[dst] == int.MaxValue ? -1 : dp[dst];
}
```
