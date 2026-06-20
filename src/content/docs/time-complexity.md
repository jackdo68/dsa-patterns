---
title: "Time complexity"
---
### O(1) - constant time

- hash map lookup
- array access, push and pop

### O(log N)

- Database B-tree lookup
- Binary search

### O(N) - linear time

- Going through array, linked list
- Two pointers
- Tree/graph traversal

### O(K * log N)

- heap push/pop k times
- binary search k times
- “top K elements” problems like “K closest points”, “merge k sorted lists”

### O(N log N)

- Default sorting, which is a variant of quick sort
- Divide and conquer, divide normally `O(logN)` and if merge is `O(N)`  then it becomes `O(N*logN)`

### O(N^2) - quadratic time

- nested loops
- matrix
- typically with `n <= 3000`

### O(2^N)

- Backtracking - subsets
- Code often involves recursion

### O(N!)

- Backtracking - permutations