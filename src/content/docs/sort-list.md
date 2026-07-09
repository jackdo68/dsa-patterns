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

```csharp
public ListNode? SortList(ListNode? head) {
    if (head is null || head.next is null) return head;

    // Find middle using fast/slow pointers
    ListNode slow = head;
    ListNode? fast = head.next;
    while (fast is not null && fast.next is not null) {
        slow = slow.next!;
        fast = fast.next.next;
    }

    // Split the list
    var mid = slow.next;
    slow.next = null;

    // Sort both halves
    var left = SortList(head);
    var right = SortList(mid);

    // Merge sorted halves
    return MergeTwoLists(left, right);
}

private ListNode? MergeTwoLists(ListNode? l1, ListNode? l2) {
    var dummy = new ListNode(0);
    var current = dummy;

    while (l1 is not null && l2 is not null) {
        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }
        current = current.next;
    }

    current.next = l1 ?? l2;
    return dummy.next;
}
```
