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

```typescript
function minimumCost(
  source: string,
  target: string,
  original: string[],
  changed: string[],
  cost: number[]
): number {
  // array of adjacency list
  const charsArr = Array.from(
    new Set([...source.split(""), ...target.split(""), ...original, ...changed]).values()
  );

  const adjList: Record<string, Record<string, number>> = {};
  for (const c1 of charsArr) {
    const map: Record<string, number> = {};
    // initialize the path to the rest of the node to Infinity
    for (const c2 of charsArr) map[c2] = Infinity;
    // the path to itself is 0
    map[c1] = 0;
    adjList[c1] = map;
  }

  for (let i = 0; i < original.length; i++) {
    const src = original[i];
    const dst = changed[i];
    const c = cost[i];
    adjList[src][dst] = Math.min(adjList[src][dst], c);
  }

  // Tripple loop as the Floy Warshall algorithm that leverage DP and the path via a intermidiate node
  // k is the intermidiate between 2 nodes
  for (const k of charsArr) {
    // i is the source
    for (const i of charsArr) {
      // j is the destination
      for (const j of charsArr) {
        // if there is a path from i to middle point k and from k to middle point j
        if (adjList[i][k] !== Infinity && adjList[k][j] !== Infinity) {
          // if the sum of 2 paths smaller than the current path, we update the current path
          if (adjList[i][k] + adjList[k][j] < adjList[i][j]) {
            adjList[i][j] = adjList[i][k] + adjList[k][j];
          }
        }
      }
    }
  }

  let result = 0;
  for (let i = 0; i < source.length; i++) {
    const src = source[i];
    const dst = target[i];
    if (src === dst) continue;
    const convertCost = adjList[src][dst];
    if (convertCost === Infinity) return -1;
    result += convertCost;
  }
  return result;
}
```
