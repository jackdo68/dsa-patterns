---
title: "Merge Two Sorted Lists"
topic: "linked list, two pointer"
difficulty: "Easy"
frequency: "High"
---
### Question

[LeetCode 21 - Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

*You are given the heads of two sorted linked lists `list1` and `list2`.*

*Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.*

*Return the head of the merged linked list.*
### Ideas

Use a dummy node and iterate both lists simultaneously. At each step, compare the current nodes and append the smaller one to the merged list. When one list is exhausted, attach the remainder of the other list directly.

### Solution

```typescript
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // Early return if one list is empty
    if (!list1) return list2;
    if (!list2) return list1;

    const dummy = new ListNode();
    let current = dummy;

    while (list1 && list2) {
        if (list1.val < list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    current.next = list1 || list2;
    return dummy.next;
}
```