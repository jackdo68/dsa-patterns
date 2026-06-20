---
title: "Merge k sorted lists"
topic: "heap"
difficulty: "Hard"
frequency: "High"
---
### **Question**

[LeetCode 23 - Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

### Ideas

- Put 1 pointer in the first node of each list ( OR push all the pointer into the min heap)
- Pop the item from the min heap, if the item is pointing to to another node, push that node to the heap ( OR move the pointer to the next node of the sorted list)
- **Time complexity:** O(n log(k)) where n is the total number of the list nodes, k is the length of the min heap

### Solution

```typescript
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const pointer = new ListNode(); // pointer
  let current = pointer;
  const heap = new _MinHeap();

  for (const list of lists) {
    if (list !== null) heap.push(list);
  }

  while (heap.size()) {
    const node = heap.pop();
    current.next = node;
    current = current.next;
    if (node.next) heap.push(node.next);
  }

  return pointer.next;
}
```