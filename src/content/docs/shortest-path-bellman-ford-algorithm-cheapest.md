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

```typescript
  function findCheapestPrice(
    n: number,
    flights: number[][],
    src: number,
    dst: number,
    k: number
  ): number {
    // initialize the distance to all the nodes to Infinity
    let dp = Array.from({ length: n }, () => Infinity);
    dp[src] = 0;

    for (let i = 0; i <= k; i++) {
      const temp = [...dp];
      for (const [source, target, price] of flights) {
        if (dp[source] !== Infinity) {
          // compare with the temp[target] here because in
          // this single loop we may already update the distance to target once
          temp[target] = Math.min(temp[target], dp[source] + price);
        }
      }
      dp = temp;
    }

    return dp[dst] === Infinity ? -1 : dp[dst];
  }
```
