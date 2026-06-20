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

```typescript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (!head) return null;
  let left = head;
  let right = head;
  // forward right
  for (let i = 0; i < n; i++) {
    right = right.next!;
  }
  if (!right) return head.next;
  while (right.next) {
    right = right.next;
    left = left.next!;
  }
  const removed = left.next!;
  left.next = removed.next;
  removed.next = null;

  return head;
}
```