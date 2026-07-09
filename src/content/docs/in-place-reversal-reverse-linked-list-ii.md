---
title: "In-Place Reversal - Reverse Linked List II"
topic: "linked list"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 92 - Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/)

_Given the `head` of a singly linked list and two integers `left` and `right` where `left <= right`, reverse the nodes of the list from position `left` to position `right`, and return the reversed list._

### Ideas

**Classic Reverse Linked List vs. This Problem:**

In the classic "Reverse Linked List," you reverse the entire list. The algorithm is simple because there's no surrounding context to worry about — the new head is just the last node you visited, and the new tail points to `null`.

This problem is harder because you reverse only a **sublist** (positions `left` to `right`). The core reversal logic is identical, but you now have **two boundary connections** to manage:

- The node **before** the reversed section must point to the **new head** of the reversed part
- The **old head** of the reversed section (now the tail) must point to the node **after** the reversed section

**Three-Phase Approach:**

1. **Navigate** — Walk to the node just before position `left` (call it `prev`)
2. **Reverse** — Apply the standard reversal on nodes from `left` to `right`
3. **Reconnect** — Stitch the reversed sublist back into the original list

**Key Insight:** Use a dummy node before `head` so that even if `left = 1`, you always have a `prev` node to anchor to. This eliminates edge-case handling.

**Remembering the reversal loop:** It's just two logical steps repeated:

1. **Flip** — save `curr.next`, then point `curr` backward (`curr.next = prevReversed`)
2. **Advance** — slide both pointers one step forward (`prevReversed = curr`, `curr = next`)

You save before flipping (so you don't lose the forward reference), then advance both pointers. That's it: **save, flip, advance, advance**.

**Reconnection detail:** After reversal, `prev.next` still points to the node that _was_ first in the sublist (now the tail of the reversed part). So `prev.next.next = curr` connects the reversed tail to the rest of the list, and `prev.next = prevReversed` connects `prev` to the new head of the reversed portion.

```
Example: 1→2→3→4→5, left=2, right=4

Phase 1 - Navigate to prev:
  dummy → 1 → 2 → 3 → 4 → 5
          ^   ^
         prev curr

Phase 2 - Reverse nodes 2→3→4:
  Standard reversal builds: 4→3→2→null
  prevReversed = 4 (new head of reversed part)
  curr = 5 (first node after reversed section)
  prev.next still points to node 2 (old head, now tail)

Phase 3 - Reconnect:
  prev.next.next = curr    →  node 2 now points to 5
  prev.next = prevReversed →  node 1 now points to 4

  Result: 1→4→3→2→5
```

### Solution

```csharp
public ListNode? ReverseBetween(ListNode? head, int left, int right) {
    if (head is null) return null;
    var dummy = new ListNode(-1, head);
    ListNode? prev = dummy;

    for (int i = 0; i < left - 1; i++) {
        prev = prev!.next;
    }

    ListNode? prevReversed = prev;
    ListNode? curr = prev!.next;
    ListNode? next;
    for (int i = left; i <= right; i++) {
        // save `curr.next`, then point `curr` backward
        next = curr!.next;
        curr.next = prevReversed;
        // slide both pointers one step forward
        prevReversed = curr;
        curr = next;
    }

    // prev.next used to point to the node that was first, now last
    // curr is outside of the range
    prev.next!.next = curr;
    // point to the new head of the range
    prev.next = prevReversed;
    return dummy.next;
}
```
