---
title: "Intersection Detection"
topic: "linked list, two pointer"
difficulty: "Easy"
frequency: "Medium"
---
### Question

[LeetCode 160 - Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/)

*Given the heads of two singly linked-lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.*
### Ideas

Use two pointers starting at each head. When a pointer reaches the end of its list, redirect it to the head of the **other** list. This equalizes the total distance each pointer travels: both walk exactly `lengthA + lengthB` steps. The length difference is absorbed in the first pass, so on the second pass both pointers are aligned and will meet at the intersection node.

**Case 1 — lists intersect:** The shared tail has the same length for both, so the difference is only in the prefix. After swapping lists, both pointers have traveled through both prefixes and arrive at the intersection together.

```
List A: a1 -> a2 -> c1 -> c2
List B: b1 -> b2 -> b3 -> c1 -> c2

pointerA: a1 -> a2 -> c1 -> c2 -> b1 -> b2 -> b3 -> [c1] ✓
pointerB: b1 -> b2 -> b3 -> c1 -> c2 -> a1 -> a2 -> [c1] ✓
```

**Case 2 — no intersection:** Both pointers reach `null` at the same time (after traveling `lengthA + lengthB` steps), so the loop exits and returns `null`.

```
List A: 1 -> 2 -> 3 -> null
List B: 4 -> 5 -> null

pointerA: 1 -> 2 -> 3 -> 4 -> 5 -> [null]
pointerB: 4 -> 5 -> 1 -> 2 -> 3 -> [null]
```
    

**Simpler fallback** if the above trick is hard to recall: compute both lengths, advance the longer list's pointer by the difference, then walk both together until they meet. Same O(n + m) time, O(1) space — just two explicit passes instead of the elegant single-loop version.

### Solution

```typescript
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    if (!headA || !headB) return null;
    
    let pointerA: ListNode | null = headA;
    let pointerB: ListNode | null = headB;
    
    while (pointerA !== pointerB) {
        pointerA = pointerA ? pointerA.next : headB;
        pointerB = pointerB ? pointerB.next : headA;
    }
    
    return pointerA; // Will be null if lists don't intersect
}
```