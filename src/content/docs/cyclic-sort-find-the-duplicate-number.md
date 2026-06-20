---
title: "Floyd's Cycle Detection - Find the Duplicate Number"
topic: "array, two pointer, linked list"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 287 - Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/)

*Given an array of integers `nums` containing `n + 1` integers where each integer is in the range `[1, n]` inclusive.*

*There is only **one repeated number** in `nums`, return this repeated number.*

*You must solve the problem **without** modifying the array `nums` and using only constant extra space.*
### Ideas

**Key insight:** Treat the array as a linked list. Since values are in range `[1, n]`, each value is a pointer to the next index. A duplicate value means two indices point to the same "node" → creating a **cycle**. The cycle entry point is the duplicate.

**Example:** `[1,3,4,2,2]`
```
Index: 0 → 1 → 3 → 2 → 4 → 2 → 4 → ...
                         ↑           ↑
                         cycle entry = 2 (the duplicate)
```

**Floyd's Cycle Detection (2 phases):**
1. Slow (1 step) and fast (2 steps) pointers → find meeting point inside the cycle
2. New pointer at start + pointer at meeting point, both move 1 step → they meet at cycle entry (the duplicate)

**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Solution

```typescript
  function findDuplicate(nums: number[]): number {
    // Floyd's algorithm
    // Part 1: place 2 pointers 1 slow, 1 fast and we find the meeting point
    let fast = nums[0];
    let slow = nums[0];
    // find their meeting point
    while (true) {
      slow = nums[slow]; // slow pointer move 1 step at a time
      fast = nums[nums[fast]]; // fast pointer move 2 steps at a time
      if (slow === fast) break;
    }

    // part 2: Place a new pointer at the start, move the same speed with the slow pointer at last meeting point
    let ptr1 = nums[0];
    let ptr2 = slow; // or fast as they both same pos
    while (ptr1 !== ptr2) {
      ptr1 = nums[ptr1];
      ptr2 = nums[ptr2];
    }
    // where this 2 pointers meet is the beginning of the cycle
    return ptr1;
  }
```