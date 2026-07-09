---
title: "Lowest Common Ancestor (LCA)"
topic: "dfs, tree"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 236 - Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

*Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.*

### Ideas

**Instinct: "find the lowest node that 'owns' both targets" → post-order DFS with bubble-up info.**

At each node, we want to know two things about its subtree:
- Have we seen `p` anywhere below (or at) this node?
- Have we seen `q` anywhere below (or at) this node?

If both answers are "yes" at some node, that node is a common ancestor. The **lowest** such node is the LCA. So we do a post-order DFS: children answer first, then the current node combines those answers with itself.

```
        3          DFS bubbles up { foundP, foundQ } at each node.
       / \         For LCA of 6 and 2:
      5   1
     / \             At 6: { foundP: true,  foundQ: false }
    6   2            At 2: { foundP: false, foundQ: true  }
                     At 5: combine children + self → { true, true } ← first node with both → LCA = 5
                     At 1: { false, false }
                     At 3: combine → { true, true } but lca already set, skip
```

**Why this finds the LOWEST:** post-order processes children before the current node. The first time both become true is at the deepest possible ancestor. Parents above will also have `foundP && foundQ`, but we lock in the answer with a `lca === null` guard so they can't overwrite it.

### Solution

```csharp
public TreeNode? LowestCommonAncestor(TreeNode? root, TreeNode p, TreeNode q) {
    TreeNode? lca = null;

    (bool foundP, bool foundQ) Dfs(TreeNode? node) {
        if (node is null) return (false, false);

        var left = Dfs(node.left);
        var right = Dfs(node.right);

        bool foundP = left.foundP || right.foundP || node == p;
        bool foundQ = left.foundQ || right.foundQ || node == q;

        if (foundP && foundQ && lca is null) {
            lca = node;
        }
        return (foundP, foundQ);
    }

    Dfs(root);
    return lca;
}
```

**Complexity:** O(n) time (every node visited once), O(h) space for the recursion stack.