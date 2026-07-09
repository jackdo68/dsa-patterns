---
title: "BFS - Rotting Oranges"
topic: "bfs, grid"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 994 - Rotting Oranges](https://leetcode.com/problems/rotting-oranges/)

*You are given an `m x n` `grid` where each cell can have one of three values:*

- *`0` representing an empty cell,*
- *`1` representing a fresh orange, or*
- *`2` representing a rotten orange.*

*Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.*

*Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return `-1`.*

### Ideas

This is **multi-source BFS** — rotting spreads from all rotten oranges simultaneously, like ripples from multiple stones dropped in water.

**Why BFS?** Each "minute" is one BFS level. All oranges that rot at the same time are in the same level. BFS naturally processes level by level.

**The approach:**
1. Find all initially rotten oranges → add to queue (starting points)
2. Count fresh oranges
3. BFS level by level:
   - For each rotten orange, rot its 4 neighbors
   - Each level = 1 minute
4. If fresh count reaches 0 → return minutes. Otherwise → return -1 (unreachable)

```
Minute 0:     Minute 1:     Minute 2:
[2, 1, 1]     [2, 2, 1]     [2, 2, 2]
[1, 1, 0]     [2, 1, 0]     [2, 2, 0]
[0, 1, 1]     [0, 1, 1]     [0, 2, 1]
```

**Edge case:** If fresh = 0 at the start, return 0 (no waiting needed).

### Solution

```csharp
public int OrangesRotting(int[][] grid) {
    int fresh = 0;
    int rowSize = grid.Length;
    int columnSize = grid[0].Length;
    var rotten = new List<int[]>();

    for (int i = 0; i < rowSize; i++) {
        for (int j = 0; j < columnSize; j++) {
            if (grid[i][j] == 1) fresh++;
            else if (grid[i][j] == 2) rotten.Add(new[] { i, j });
        }
    }

    int[][] moves = { new[] { -1, 0 }, new[] { 1, 0 }, new[] { 0, -1 }, new[] { 0, 1 } };
    bool IsValid(int r, int c) => r >= 0 && r < rowSize && c >= 0 && c < columnSize;

    int minutes = 0;
    int head = 0;

    while (head < rotten.Count) {
        int size = rotten.Count - head;
        for (int i = 0; i < size; i++) {
            int row = rotten[head][0];
            int col = rotten[head][1];
            head++;
            foreach (var move in moves) {
                int newRow = row + move[0];
                int newCol = col + move[1];
                if (!IsValid(newRow, newCol) || grid[newRow][newCol] != 1) continue;
                grid[newRow][newCol] = 2;
                fresh--;
                rotten.Add(new[] { newRow, newCol });
            }
        }
        if (head < rotten.Count) minutes++;
    }

    return fresh == 0 ? minutes : -1;
}
```
