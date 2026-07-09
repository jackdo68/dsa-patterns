---
title: "Word Search"
topic: "backtracking, matrix, dfs"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 79 - Word Search](https://leetcode.com/problems/word-search/)

Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example 1:**
```
Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]], word = "ABCCED"
Output: true
```

**Example 2:**
```
Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]], word = "SEE"
Output: true
```

**Example 3:**
```
Input: board = [["A","B","C","E"],
                ["S","F","C","S"],
                ["A","D","E","E"]], word = "ABCB"
Output: false
```

### Ideas

Use **DFS backtracking** from each cell:
1. Try starting from each cell in the grid
2. From each cell, explore all 4 directions
3. Mark cells as visited (and unmark when backtracking)
4. Match character by character

**Pruning:** Return early if current character doesn't match.

### Implementation

**Approach 1: In-place marking (Optimal)**

```csharp
public bool Exist(char[][] board, string word) {
    int rows = board.Length;
    int cols = board[0].Length;
    int[][] directions = { new[] { 0, 1 }, new[] { 0, -1 }, new[] { 1, 0 }, new[] { -1, 0 } };

    bool Backtrack(int row, int col, int index) {
        // Found the word
        if (index == word.Length) return true;

        // Out of bounds or wrong character
        if (row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            board[row][col] != word[index]) {
            return false;
        }

        // Mark as visited by modifying the cell
        char temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        foreach (var dir in directions) {
            if (Backtrack(row + dir[0], col + dir[1], index + 1)) {
                return true;
            }
        }

        // Backtrack: restore the cell
        board[row][col] = temp;
        return false;
    }

    // Try starting from each cell
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (Backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

**Approach 2: Using Set for visited**

```csharp
public bool Exist(char[][] board, string word) {
    int rows = board.Length;
    int cols = board[0].Length;
    var visited = new HashSet<(int, int)>();

    bool Backtrack(int row, int col, int index) {
        if (index == word.Length) return true;

        if (row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            visited.Contains((row, col)) ||
            board[row][col] != word[index]) {
            return false;
        }

        visited.Add((row, col));

        bool found = Backtrack(row + 1, col, index + 1) ||
                     Backtrack(row - 1, col, index + 1) ||
                     Backtrack(row, col + 1, index + 1) ||
                     Backtrack(row, col - 1, index + 1);

        visited.Remove((row, col));  // Backtrack

        return found;
    }

    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (Backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

**Time Complexity:** O(m * n * 4^L) where L is word length

**Space Complexity:** O(L) for recursion stack

### Optimizations

**1. Early termination with character count:**

```csharp
public bool Exist(char[][] board, string word) {
    // Count characters in board
    var boardCount = new Dictionary<char, int>();
    foreach (var row in board) {
        foreach (char c in row) {
            boardCount[c] = boardCount.GetValueOrDefault(c, 0) + 1;
        }
    }

    // Count characters in word
    var wordCount = new Dictionary<char, int>();
    foreach (char c in word) {
        wordCount[c] = wordCount.GetValueOrDefault(c, 0) + 1;
    }

    // Check if board has enough of each character
    foreach (var (c, count) in wordCount) {
        if (boardCount.GetValueOrDefault(c, 0) < count) {
            return false;
        }
    }

    // Reverse word if last char is less frequent (start from the rarer char)
    int firstCount = boardCount.GetValueOrDefault(word[0], 0);
    int lastCount = boardCount.GetValueOrDefault(word[^1], 0);
    if (firstCount > lastCount) {
        word = new string(word.Reverse().ToArray());
    }

    // ... rest of backtracking
    return false;
}
```

### Pattern: Grid Backtracking

```csharp
bool GridBacktrack(char[][] grid, string target) {
    int rows = grid.Length, cols = grid[0].Length;
    int[][] directions = { new[] {0,1}, new[] {0,-1}, new[] {1,0}, new[] {-1,0} };

    bool Dfs(int row, int col, int index) {
        // Base: found target
        if (index == target.Length) return true;

        // Bounds check, visited check, match check
        if (outOfBounds || visited || !matches) return false;

        // Mark visited
        Mark(row, col);

        // Try all directions
        foreach (var dir in directions) {
            if (Dfs(row + dir[0], col + dir[1], index + 1)) return true;
        }

        // Backtrack
        Unmark(row, col);
        return false;
    }

    // Try each starting cell
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            if (Dfs(i, j, 0)) return true;
        }
    }
    return false;
}
```

### Related Problems

| Problem | Variation |
|---------|-----------|
| Word Search | Single word |
| Word Search II (212) | Multiple words (use Trie) |
| Number of Islands | Connected components |
| Surrounded Regions | Boundary-connected cells |
| Path with Maximum Gold | Find max sum path |
