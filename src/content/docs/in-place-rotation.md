---
title: "In-place Rotation"
topic: "array"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 189 - Rotate Array](https://leetcode.com/problems/rotate-array/)

*Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.*
### Ideas

The key insight: rotating right by k is equivalent to moving the last k elements to the front.

**Why not just chop and move?**
Splitting into two arrays and rejoining uses O(n) extra space. The reversal trick achieves the same result with O(1) space - only swapping elements in place.

**Reversal trick (3 reverses):**
1. Reverse the entire array
2. Reverse the first k elements
3. Reverse the remaining n-k elements

**Example:** `[1,2,3,4,5,6,7]`, k=3
```
Original:       [1,2,3,4,5,6,7]
Reverse all:    [7,6,5,4,3,2,1]
Reverse 0..k-1: [5,6,7,4,3,2,1]
Reverse k..n-1: [5,6,7,1,2,3,4] ✓
```

**Important:** Use `k %= n` to handle k > array length.

**Time Complexity:** O(n)
**Space Complexity:** O(1)

### Solution

```typescript
/**
 Do not return anything, modify nums in-place instead.
 */
function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k %= n;
    const reverse = (start: number, end: number) => {
      while (start < end) {
        [nums[start], nums[end]] = [nums[end], nums[start]];
        start++;
        end--;
      }
    };
    //reverse the whole array
    reverse(0, n - 1);
    //reverse the first half
    reverse(0, k - 1);
    //revert the second half
    reverse(k, n - 1);

};
```