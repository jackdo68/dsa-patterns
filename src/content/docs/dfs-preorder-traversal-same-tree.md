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

```csharp
public bool IsSameTree(TreeNode? p, TreeNode? q) {
    if (p is null && q is null) return true;
    if (p is null || q is null) return false;
    if (p.val != q.val) return false;
    return IsSameTree(p.left, q.left) && IsSameTree(p.right, q.right);
}
```