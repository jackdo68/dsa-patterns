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

```csharp
public int FindDuplicate(int[] nums) {
    // Floyd's algorithm
    // Part 1: place 2 pointers 1 slow, 1 fast and find the meeting point
    int fast = nums[0];
    int slow = nums[0];
    // find their meeting point
    while (true) {
        slow = nums[slow];        // slow pointer moves 1 step at a time
        fast = nums[nums[fast]];  // fast pointer moves 2 steps at a time
        if (slow == fast) break;
    }

    // Part 2: place a new pointer at the start, move at the same speed as slow
    int ptr1 = nums[0];
    int ptr2 = slow; // or fast, they are at the same position
    while (ptr1 != ptr2) {
        ptr1 = nums[ptr1];
        ptr2 = nums[ptr2];
    }
    // where these 2 pointers meet is the beginning of the cycle
    return ptr1;
}
```