---
title: "Reordering/ Partitioning - Rotate List"
topic: "linked list"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 61 - Rotate List](https://leetcode.com/problems/rotate-list/)

*Given the `head` of a linked list, rotate the list to the right by `k` places.*
### Ideas

Rotating right by `k` means taking the last `k` nodes and moving them to the front. The key insight is that this is just breaking the list at position `length - k` and swapping the two halves.

Since `k` can exceed the list length, first compute the length and normalize with `k % length` (a full rotation returns the same list). While traversing for length, keep a reference to the tail — you'll need it to connect the old tail to the old head, effectively making the list circular at the right moment. Then walk to position `length - k - 1` to find the new tail, break the link there, and the node after it becomes the new head.

**Why not two-pointer gap?** Unlike remove nth node from end (where `n` is guaranteed valid), `k` here can exceed the list length. The fast pointer would overshoot before establishing the gap, so we'd need the length anyway to normalize `k`. Once we have the length, walking directly to `length - k - 1` is simpler than a two-pointer setup.

### Solution

```csharp
public ListNode? RotateRight(ListNode? head, int k) {
    // early return
    if (head is null || head.next is null) return head;
    // find the length
    int length = 1;
    var curr = head;
    while (curr.next is not null) {
        length++;
        curr = curr.next;
    }
    // normalize k
    k = k % length;
    if (k == 0) return head;

    var tail = curr; // will point to the original head
    // partial traverse
    curr = head; // reset curr
    for (int i = 0; i < length - k - 1; i++) {
        curr = curr.next!;
    }
    var newHead = curr.next;
    curr.next = null;
    tail.next = head;
    return newHead;
}
```