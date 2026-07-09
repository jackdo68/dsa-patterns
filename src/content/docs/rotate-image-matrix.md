---
title: "Rotate Image"
topic: "array, matrix"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 48 - Rotate Image](https://leetcode.com/problems/rotate-image/)

You are given an `n x n` 2D matrix representing an image, rotate the image by **90 degrees clockwise**.

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

**Example 1:**
```
Input: matrix = [[1,2,3],
                 [4,5,6],
                 [7,8,9]]

Output: [[7,4,1],
         [8,5,2],
         [9,6,3]]
```

**Example 2:**
```
Input: matrix = [[5,1,9,11],
                 [2,4,8,10],
                 [13,3,6,7],
                 [15,14,12,16]]

Output: [[15,13,2,5],
         [14,3,4,1],
         [12,6,8,9],
         [16,7,10,11]]
```

### Ideas

**Approach 1: Transpose + Reverse**
- Transpose the matrix (swap rows and columns)
- Reverse each row

**Approach 2: Rotate Four Cells at a Time**
- For each layer, rotate 4 cells simultaneously
- Move outside-in, layer by layer

### Implementation

**Approach 1: Transpose + Reverse (Clearest)**

```csharp
public void Rotate(int[][] matrix) {
    int n = matrix.Length;

    // Step 1: Transpose (swap matrix[i][j] with matrix[j][i])
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            (matrix[i][j], matrix[j][i]) = (matrix[j][i], matrix[i][j]);
        }
    }

    // Step 2: Reverse each row
    for (int i = 0; i < n; i++) {
        Array.Reverse(matrix[i]);
    }
}
```

**Approach 2: Four-way Swap (Layer by Layer)**

```csharp
public void Rotate(int[][] matrix) {
    int n = matrix.Length;

    // Process each layer from outside to inside
    for (int layer = 0; layer < n / 2; layer++) {
        int first = layer;
        int last = n - 1 - layer;

        for (int i = first; i < last; i++) {
            int offset = i - first;

            // Save top
            int top = matrix[first][i];

            // Left -> Top
            matrix[first][i] = matrix[last - offset][first];

            // Bottom -> Left
            matrix[last - offset][first] = matrix[last][last - offset];

            // Right -> Bottom
            matrix[last][last - offset] = matrix[i][last];

            // Top -> Right
            matrix[i][last] = top;
        }
    }
}
```

**Time Complexity:** O(n²)

**Space Complexity:** O(1) in-place

### Visualization

**Transpose + Reverse for 90° clockwise:**
```
Original:       Transpose:      Reverse rows:
1 2 3           1 4 7           7 4 1
4 5 6    →      2 5 8     →     8 5 2
7 8 9           3 6 9           9 6 3
```

**Four-way swap:**
```
Layer 0: outer ring
1 → 3 → 9 → 7 → 1 (corners)
2 → 6 → 8 → 4 → 2 (edges)

    1  2  3
    4  5  6
    7  8  9

Position mapping (90° clockwise):
(i, j) → (j, n-1-i)
```

### All Rotation Variants

```csharp
// 90° clockwise: transpose then reverse rows
void Rotate90CW(int[][] matrix) {
    Transpose(matrix);
    ReverseRows(matrix);
}

// 90° counter-clockwise: transpose then reverse columns
void Rotate90CCW(int[][] matrix) {
    Transpose(matrix);
    ReverseCols(matrix);
}

// 180°: reverse rows then reverse columns (or rotate 90° twice)
void Rotate180(int[][] matrix) {
    ReverseRows(matrix);
    ReverseCols(matrix);
}

// Helper functions
void Transpose(int[][] matrix) {
    int n = matrix.Length;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            (matrix[i][j], matrix[j][i]) = (matrix[j][i], matrix[i][j]);
        }
    }
}

void ReverseRows(int[][] matrix) {
    foreach (var row in matrix) {
        Array.Reverse(row);
    }
}

void ReverseCols(int[][] matrix) {
    int n = matrix.Length;
    for (int j = 0; j < n; j++) {
        for (int i = 0; i < n / 2; i++) {
            (matrix[i][j], matrix[n - 1 - i][j]) = (matrix[n - 1 - i][j], matrix[i][j]);
        }
    }
}
```

### Rotation Cheat Sheet

| Rotation | Method 1 | Method 2 |
|----------|----------|----------|
| 90° CW | Transpose → Reverse rows | (i,j) → (j, n-1-i) |
| 90° CCW | Transpose → Reverse cols | (i,j) → (n-1-j, i) |
| 180° | Reverse rows → Reverse cols | (i,j) → (n-1-i, n-1-j) |

### Related Problems

| Problem | Operation |
|---------|-----------|
| Rotate Image (48) | 90° clockwise |
| Spiral Matrix (54) | Spiral traversal |
| Set Matrix Zeroes (73) | Zero propagation |
| Transpose Matrix (867) | Swap (i,j) and (j,i) |
| Flip Image (832) | Horizontal flip |
