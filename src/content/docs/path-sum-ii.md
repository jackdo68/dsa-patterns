---
title: "Path Sum II"
topic: "tree, dfs, backtracking"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 113 - Path Sum II](https://leetcode.com/problems/path-sum-ii/)

*Given the `root` of a binary tree and an integer `targetSum`, return all **root-to-leaf** paths where the sum of the node values in the path equals `targetSum`.*
### Ideas

Extend Path Sum with backtracking to collect all valid paths. Maintain a `currentPath` array as you DFS down the tree. When you reach a leaf with the correct sum, copy the path into the result.

The key is to **backtrack** (pop the last element) after exploring each node, so the path array correctly reflects the current DFS state as you return up the tree.

### Solution

```csharp
public IList<IList<int>> PathSum(TreeNode? root, int targetSum) {
    var result = new List<IList<int>>();

    void Dfs(TreeNode? node, int remaining, List<int> path) {
        if (node is null) return;

        path.Add(node.val);

        // Leaf node with correct sum
        if (node.left is null && node.right is null && remaining == node.val) {
            result.Add(new List<int>(path));
        } else {
            Dfs(node.left, remaining - node.val, path);
            Dfs(node.right, remaining - node.val, path);
        }

        path.RemoveAt(path.Count - 1); // backtrack
    }

    Dfs(root, targetSum, new List<int>());
    return result;
}
```
