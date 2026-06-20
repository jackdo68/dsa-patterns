---
title: "Sort List"
topic: "linked list, sorting, divide and conquer"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 148 - Sort List](https://leetcode.com/problems/sort-list/)

*Given the `head` of a linked list, return the list after sorting it in **ascending order**.*
### Ideas

Merge sort is ideal for linked lists because:
- Finding the middle uses fast/slow pointers (O(n)).
- Merging two sorted lists is O(1) extra space (just relink pointers).
- No random access needed (unlike quicksort's partition).

Steps:
1. **Split** — use fast/slow pointers to find the middle, then break the list in two.
2. **Recurse** — sort both halves.
3. **Merge** — merge the two sorted halves by relinking nodes (same as Merge Two Sorted Lists).

This gives O(n log n) time and O(log n) space (recursion stack only, no auxiliary arrays).

### Solution

```typescript
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  // Find middle using fast/slow pointers
  let slow: ListNode = head;
  let fast: ListNode | null = head.next;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }

  // Split the list
  const mid = slow.next;
  slow.next = null;

  // Sort both halves
  const left = sortList(head);
  const right = sortList(mid);

  // Merge sorted halves
  return mergeTwoLists(left, right);
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}
```
