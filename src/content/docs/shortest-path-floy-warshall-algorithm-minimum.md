---
title: "Shortest Path - Floy Warshall algorithm - Minimum Cost To Convert String"
topic: "graph"
difficulty: "Medium"
frequency: "Very Low"
---
### Question

[LeetCode 1334 - Find the City With the Smallest Number of Neighbors](https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/)

*You are given two **0-indexed** strings `source` and `target`, both of length `n` and consisting of **lowercase** English letters. You are also given two **0-indexed** character arrays `original` and `changed`, and an integer array `cost`, where `cost[i]` represents the cost of changing the character `original[i]` to the character `changed[i]`.*

*You start with the string `source`. In one operation, you can pick a character `x` from the string and change it to the character `y` at a cost of `z` **if** there exists **any** index `j` such that `cost[j] == z`, `original[j] == x`, and `changed[j] == y`.*

*Return the **minimum** cost to convert the string `source` to the string `target` using **any** number of operations. If it is impossible to convert `source` to `target`, return `-1`.*

*Note that there may exist indices `i`, `j` such that `original[j] == original[i]` and `changed[j] == changed[i]`.*

### Ideas

- The algorithm is designed to be able to find the shortest paths between all vertices using a triple nested loops, negative edges allowed
- **Time complexity:** O(V3) as we loop 3 times

### Solution

```csharp
public long MinimumCost(string source, string target, char[] original, char[] changed, int[] cost) {
    const long INF = long.MaxValue;

    // collect every distinct character that appears anywhere
    var charsSet = new HashSet<char>();
    foreach (char c in source) charsSet.Add(c);
    foreach (char c in target) charsSet.Add(c);
    foreach (char c in original) charsSet.Add(c);
    foreach (char c in changed) charsSet.Add(c);
    var charsArr = charsSet.ToList();

    // adjacency: adjList[a][b] = cheapest known cost to convert a -> b
    var adjList = new Dictionary<char, Dictionary<char, long>>();
    foreach (char c1 in charsArr) {
        var map = new Dictionary<char, long>();
        foreach (char c2 in charsArr) map[c2] = INF; // paths start at Infinity
        map[c1] = 0;                                 // path to itself is 0
        adjList[c1] = map;
    }

    for (int i = 0; i < original.Length; i++) {
        char src = original[i];
        char dst = changed[i];
        adjList[src][dst] = Math.Min(adjList[src][dst], cost[i]);
    }

    // Floyd-Warshall triple loop: k is the intermediate node between i and j
    foreach (char k in charsArr) {
        foreach (char i in charsArr) {
            foreach (char j in charsArr) {
                // if there is a path i -> k and k -> j
                if (adjList[i][k] != INF && adjList[k][j] != INF) {
                    // relax i -> j through k
                    if (adjList[i][k] + adjList[k][j] < adjList[i][j]) {
                        adjList[i][j] = adjList[i][k] + adjList[k][j];
                    }
                }
            }
        }
    }

    long result = 0;
    for (int i = 0; i < source.Length; i++) {
        char src = source[i];
        char dst = target[i];
        if (src == dst) continue;
        long convertCost = adjList[src][dst];
        if (convertCost == INF) return -1;
        result += convertCost;
    }
    return result;
}
```
