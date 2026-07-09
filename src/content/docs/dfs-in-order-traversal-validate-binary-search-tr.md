---
title: "DFS In-order Traversal - Validate Binary Search Tree"
topic: "dfs, tree"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 98 - Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)

*Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).*

*A **valid BST** is defined as follows:*

- *The left  of a node contains only nodes with keys **strictly less than** the node's key.*
    
    *subtree*
    
- *The right subtree of a node contains only nodes with keys **strictly greater than** the node's key.*
- *Both the left and right subtrees must also be binary search trees.*

### Ideas

**The wrong approach:** Just check `node.left.val < node.val < node.right.val` at each node. This fails because a node in the left subtree must be less than **all ancestors**, not just its parent.

```
     5
    / \
   1   6
      / \
     4   7   ← 4 is less than its parent 6, but INVALID (4 < 5, so can't be in right subtree)
```

**The correct approach:** Pass down a valid range `(min, max)` as you descend.
- Going left: new max = current node's value
- Going right: new min = current node's value
- At each node: check `min < node.val < max`

This is **pre-order** — you validate the node first, then descend into children.

### Solution

```csharp
public bool IsValidBST(TreeNode? root) {
    bool Helper(TreeNode? node, long? min, long? max) {
        if (node is null) return true;
        if ((min is not null && node.val <= min) || (max is not null && node.val >= max)) return false;
        return Helper(node.left, min, node.val) && Helper(node.right, node.val, max);
    }
    return Helper(root, null, null);
}
```