---
title: "Construct Binary Tree from Preorder and Inorder Traversal"
topic: "tree, recursion, divide and conquer"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 105 - Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

Given two integer arrays `preorder` and `inorder` where `preorder` is the preorder traversal of a binary tree and `inorder` is the inorder traversal of the same tree, construct and return the binary tree.

**Example 1:**
```
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

        3
       / \
      9  20
        /  \
       15   7
```

**Example 2:**
```
Input: preorder = [1], inorder = [1]
Output: [1]
```

### Ideas

**Key insights:**
1. **Preorder** first element is always the **root**
2. **Inorder** elements left of root are **left subtree**, right are **right subtree**

**Algorithm:**
1. Take first element from preorder as root
2. Find root's position in inorder
3. Everything before that position → left subtree
4. Everything after that position → right subtree
5. Recursively build left and right subtrees

**Optimization:** Use a hash map to find root's position in O(1) instead of O(n).

### Implementation

**Approach 1: With HashMap (Optimal)**

```csharp
public TreeNode? BuildTree(int[] preorder, int[] inorder) {
    // Map value to index in inorder for O(1) lookup
    var inorderMap = new Dictionary<int, int>();
    for (int idx = 0; idx < inorder.Length; idx++) inorderMap[inorder[idx]] = idx;

    int preorderIndex = 0;

    TreeNode? Build(int inLeft, int inRight) {
        if (inLeft > inRight) return null;

        // Root is current preorder element
        int rootVal = preorder[preorderIndex++];
        var root = new TreeNode(rootVal);

        // Find root position in inorder
        int inorderIndex = inorderMap[rootVal];

        // Build left subtree first (preorder: root -> left -> right)
        root.left = Build(inLeft, inorderIndex - 1);
        root.right = Build(inorderIndex + 1, inRight);

        return root;
    }

    return Build(0, inorder.Length - 1);
}
```

**Approach 2: Without HashMap (Clearer logic)**

```csharp
public TreeNode? BuildTree(int[] preorder, int[] inorder) {
    TreeNode? Build(int preStart, int preEnd, int inStart, int inEnd) {
        if (preStart > preEnd) return null;

        int rootVal = preorder[preStart];
        var root = new TreeNode(rootVal);

        // Find root in inorder
        int rootIndex = inStart;
        while (inorder[rootIndex] != rootVal) rootIndex++;

        int leftSize = rootIndex - inStart;

        // Preorder: [root, ...left..., ...right...]
        // Inorder:  [...left..., root, ...right...]
        root.left = Build(
            preStart + 1, preStart + leftSize,
            inStart, rootIndex - 1
        );
        root.right = Build(
            preStart + leftSize + 1, preEnd,
            rootIndex + 1, inEnd
        );

        return root;
    }

    return Build(0, preorder.Length - 1, 0, inorder.Length - 1);
}
```

**Time Complexity:** O(n)

**Space Complexity:** O(n) for hash map + O(h) for recursion stack

### Visualization

```
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]

Step 1: root = 3 (first of preorder)
        Find 3 in inorder: index 1
        Left subtree: inorder[0:0] = [9]
        Right subtree: inorder[2:4] = [15, 20, 7]

Step 2: Build left with preorder[1:1], inorder[0:0]
        root = 9, no children

Step 3: Build right with preorder[2:4], inorder[2:4]
        root = 20
        Find 20 in inorder: index 3
        Left: [15], Right: [7]

Result:
        3
       / \
      9  20
        /  \
       15   7
```

### Variant: Construct from Inorder and Postorder

**Key difference:** Postorder's **last** element is root, and we build **right subtree first**.

```csharp
public TreeNode? BuildTreeFromPostorder(int[] inorder, int[] postorder) {
    var inorderMap = new Dictionary<int, int>();
    for (int idx = 0; idx < inorder.Length; idx++) inorderMap[inorder[idx]] = idx;

    int postorderIndex = postorder.Length - 1;

    TreeNode? Build(int inLeft, int inRight) {
        if (inLeft > inRight) return null;

        int rootVal = postorder[postorderIndex--];
        var root = new TreeNode(rootVal);

        int inorderIndex = inorderMap[rootVal];

        // Build RIGHT subtree first (postorder: left -> right -> root)
        root.right = Build(inorderIndex + 1, inRight);
        root.left = Build(inLeft, inorderIndex - 1);

        return root;
    }

    return Build(0, inorder.Length - 1);
}
```

### Traversal Order Summary

| Traversal | Order | First Element | Last Element |
|-----------|-------|---------------|--------------|
| Preorder | Root → Left → Right | Root | Rightmost leaf |
| Inorder | Left → Root → Right | Leftmost | Rightmost |
| Postorder | Left → Right → Root | Leftmost leaf | Root |

### Related Problems

- **Construct from Preorder & Inorder (105)** - This problem
- **Construct from Inorder & Postorder (106)** - Build right first
- **Construct BST from Preorder (1008)** - Use bounds, no inorder needed
- **Serialize/Deserialize Tree (297)** - Level order or preorder with nulls
