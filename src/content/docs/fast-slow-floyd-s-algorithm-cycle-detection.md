---
title: "Fast & Slow Floyd’s algorithm cycle detection"
topic: "linked list"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 141 - Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

*Given `head`, the head of a linked list, determine if the linked list has a cycle in it.*

### Ideas

- It uses 2 pointers 1 `fast` and `slow`, if there is a cycle in the list, then eventually `fast` pointer will meet the `slow` pointer ⇒ detect cycle
- When 2 pointers met, if we reset the slow pointer to the start, and move both pointers at the same speed, then they will meet again at the beginning of the cycle
- **Time Complexity:** O(n)

### Solution

```typescript
  function detectCycle(head: ListNode | null): ListNode | null {
    if (head === null) return null;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next!;
      fast = fast.next.next!;
      if (slow === fast) {
        // found the meeting point
        slow = head;
        while (slow !== fast) {
          slow = slow?.next!;
          fast = fast.next!;
        }
        return slow;
      }
    }

    return null;
  }
```