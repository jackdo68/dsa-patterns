---
title: "DFS - Number of Islands"
topic: "dfs, grid"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 200 - Number of Islands](https://leetcode.com/problems/number-of-islands/)

*Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return the number of islands.*

*An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.*

### Ideas

- Loop through all cells, if it `0`, do nothing, if it’s `1` set it to `0` and recursively visit all his neighbors, then return `1` as the number of island
- total number of island will be counted as the time we first visit an island

### Solution

```typescript
function numIslands(grid: string[][]): number {
  let total = 0;
  const rows = grid.length;
  const columns = grid[0].length;
  const moves = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1]
  ];

  function dfs(x: number, y: number): number {
    if (x > rows - 1 || x < 0 || y > columns - 1 || y < 0) return 0; // out of bound
    const cur = grid[x][y];
    if (cur === "0") {
      return 0;
    } else {
      grid[x][y] = "0";
      for (const [a, b] of moves) dfs(x + a, y + b);
      return 1;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      total += dfs(i, j);
    }
  }
  return total;
}
```