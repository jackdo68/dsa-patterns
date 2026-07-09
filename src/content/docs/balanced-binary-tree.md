---
title: "Balanced Binary Tree"
topic: "tree, dfs"
difficulty: "Easy"
frequency: "Medium"
---
### Question

[LeetCode 110 - Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)

*Given a binary tree, determine if it is **height-balanced**.*

*A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.*
### Ideas

A naive approach checks balance at each node by computing heights separately — O(n²). The optimal approach combines height computation and balance checking in a single postorder traversal.

Return `-1` as a sentinel to indicate an imbalanced subtree. At each node:
- If either child returns `-1`, propagate `-1` upward (already imbalanced).
- If the height difference between children exceeds 1, return `-1`.
- Otherwise return the actual height.

This gives O(n) time with early termination — once imbalance is detected, no further computation is needed.

### Solution

```csharp
public bool IsBalanced(TreeNode? root) {
    int Height(TreeNode? node) {
        if (node is null) return 0;

        int left = Height(node.left);
        if (left == -1) return -1;

        int right = Height(node.right);
        if (right == -1) return -1;

        if (Math.Abs(left - right) > 1) return -1;

        return 1 + Math.Max(left, right);
    }

    return Height(root) != -1;
}
```
