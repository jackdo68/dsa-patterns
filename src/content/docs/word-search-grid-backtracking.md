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

```tsx
function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    function backtrack(row: number, col: number, index: number): boolean {
        // Found the word
        if (index === word.length) return true;

        // Out of bounds or wrong character
        if (row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            board[row][col] !== word[index]) {
            return false;
        }

        // Mark as visited by modifying the cell
        const temp = board[row][col];
        board[row][col] = '#';

        // Explore all 4 directions
        for (const [dr, dc] of directions) {
            if (backtrack(row + dr, col + dc, index + 1)) {
                return true;
            }
        }

        // Backtrack: restore the cell
        board[row][col] = temp;
        return false;
    }

    // Try starting from each cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

**Approach 2: Using Set for visited**

```tsx
function exist(board: string[][], word: string): boolean {
    const rows = board.length;
    const cols = board[0].length;
    const visited = new Set<string>();

    function backtrack(row: number, col: number, index: number): boolean {
        if (index === word.length) return true;

        const key = `${row},${col}`;

        if (row < 0 || row >= rows ||
            col < 0 || col >= cols ||
            visited.has(key) ||
            board[row][col] !== word[index]) {
            return false;
        }

        visited.add(key);

        const found = backtrack(row + 1, col, index + 1) ||
                      backtrack(row - 1, col, index + 1) ||
                      backtrack(row, col + 1, index + 1) ||
                      backtrack(row, col - 1, index + 1);

        visited.delete(key);  // Backtrack

        return found;
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
}
```

**Time Complexity:** O(m * n * 4^L) where L is word length

**Space Complexity:** O(L) for recursion stack

### Optimizations

**1. Early termination with character count:**

```tsx
function exist(board: string[][], word: string): boolean {
    // Count characters in board
    const boardCount = new Map<string, number>();
    for (const row of board) {
        for (const char of row) {
            boardCount.set(char, (boardCount.get(char) || 0) + 1);
        }
    }

    // Count characters in word
    const wordCount = new Map<string, number>();
    for (const char of word) {
        wordCount.set(char, (wordCount.get(char) || 0) + 1);
    }

    // Check if board has enough of each character
    for (const [char, count] of wordCount) {
        if ((boardCount.get(char) || 0) < count) {
            return false;
        }
    }

    // Reverse word if last char is less frequent (start from rarer char)
    const firstCount = boardCount.get(word[0]) || 0;
    const lastCount = boardCount.get(word[word.length - 1]) || 0;
    if (firstCount > lastCount) {
        word = word.split('').reverse().join('');
    }

    // ... rest of backtracking
}
```

### Pattern: Grid Backtracking

```tsx
function gridBacktrack(grid, target) {
    const rows = grid.length, cols = grid[0].length;
    const directions = [[0,1], [0,-1], [1,0], [-1,0]];

    function dfs(row, col, index) {
        // Base: found target
        if (index === target.length) return true;

        // Bounds check, visited check, match check
        if (outOfBounds || visited || !matches) return false;

        // Mark visited
        mark(row, col);

        // Try all directions
        for (const [dr, dc] of directions) {
            if (dfs(row + dr, col + dc, index + 1)) return true;
        }

        // Backtrack
        unmark(row, col);
        return false;
    }

    // Try each starting cell
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) return true;
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
