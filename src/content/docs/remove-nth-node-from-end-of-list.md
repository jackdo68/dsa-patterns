---
title: "Remove Nth Node from End of list"
topic: "linked list, two-pointer"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 19 - Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)

*Given the `head` of a linked list, remove the `nth` node from the end of the list and return its head.*

### Ideas

Use two pointers with an `n`-step gap. Advance `right` by `n` steps, then move both `left` and `right` together until `right` reaches the last node. Now `left` is the predecessor of the target — relink it to skip the removed node. If `right` is null after the initial advance, the head itself is being removed so return `head.next`.

### Solution

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val = 0, ListNode next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

public ListNode? RemoveNthFromEnd(ListNode? head, int n) {
    if (head is null) return null;
    ListNode? left = head;
    ListNode? right = head;
    // advance right by n steps
    for (int i = 0; i < n; i++) {
        right = right!.next;
    }
    if (right is null) return head.next;
    while (right.next is not null) {
        right = right.next;
        left = left!.next;
    }
    ListNode removed = left!.next!;
    left.next = removed.next;
    removed.next = null;

    return head;
}
```