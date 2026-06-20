---
title: "Serialize and Deserialize Binary Tree"
topic: "dfs, tree"
difficulty: "Hard"
frequency: "Medium"
---
### Question

[LeetCode 297 - Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

*Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.*

### Solution

```typescript
/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {
    if (root === null) return "x";
    return `${root.val} ${serialize(root.left)} ${serialize(root.right)}`

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    const tokens = data.split(" ")
    let index = 0;

    // call on each token
    function helper() : TreeNode | null {
        if (tokens[index] === "x" || index >= tokens.length) {
            index++;
            return null
        }
        const val = parseInt(tokens[index])
        index++;
        const node = new TreeNode(val)
        node.left = helper()
        node.right = helper()
        return node
    }
    return helper()
};
```