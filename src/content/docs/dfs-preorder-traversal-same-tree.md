---
title: "DFS Preorder Traversal - Same Tree"
topic: "dfs, tree"
difficulty: "Easy"
frequency: "Medium"
---
### Question

[LeetCode 100 - Same Tree](https://leetcode.com/problems/same-tree/)

*Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.*

*Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.*

### Solution

```typescript
function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if (p === null && q === null) return true
    if (p === null || q === null) return false
    if (p.val !== q.val) return false 
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```