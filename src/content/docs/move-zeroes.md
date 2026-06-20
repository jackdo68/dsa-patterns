---
title: "Move Zeroes"
topic: "two pointer"
difficulty: "Easy"
frequency: "Low"
---
### Question

[LeetCode 283 - Move Zeroes](https://leetcode.com/problems/move-zeroes/)

*Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements.*

***Note** that you must do this in-place without making a copy of the array.*

*Example 1:*

```
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
```

### Ideas

- We use slow and fast pointers. The fast one moves one element at a time
- if the current element is 0, do nothing
- if the current element is non-0, swap its element with the slow pointer's element and move the slow pointer
- **Time complexity:** O(n)

### Solution

```typescript
function moveZeroes(nums: number[]): void {
  const n = nums.length;
  let l = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== 0) {
      nums[l] = nums[i];
      l++;
    }
  }
  while (l < n) {
    nums[l] = 0;
    l++;
  }
}
```