---
title: "Min Heap vs Binary Search Tree"
topic: "heap, binary search tree"
---
- **Structure and ordering**
    - BST has all nodes of the left sub tree smaller than current node, and the current node smaller than all the nodes of the right sub tree, this enable the in-order traversal to produce sorted output
    - MH parent node always smaller than its children, but does not guarantee global order
- **Use cases**
    - BST is very efficient with O(logn) for search, if the tree is balanced then delete/insert also requires O(logn)
    - MH is useful for problems like find the most k closest elements