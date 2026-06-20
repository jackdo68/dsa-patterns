---
title: "Merge Sorted Array"
topic: "array, two pointers"
difficulty: "Easy"
frequency: "Low"
---
### Question

[LeetCode 88 - Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)

*You are given two integer arrays `nums1` and `nums2`, sorted in **non-decreasing order**, and two integers `m` and `n`, representing the number of elements in `nums1` and `nums2` respectively.*

***Merge** `nums1` and `nums2` into a single array sorted in **non-decreasing order**.*

*The final sorted array should not be returned by the function, but instead be stored inside the array `nums1`. To accommodate this, `nums1` has a length of `m + n`, where the first `m` elements denote the elements that should be merged, and the last `n` elements are set to `0` and should be ignored. `nums2` has a length of `n`.*
### Ideas

**Why merge from the back?** Filling from the front would overwrite nums1 elements we haven't processed yet. Since nums1 has empty space at the end, we fill from right to left.

**Three pointers:**
- `i` at end of nums1's real elements (`m - 1`)
- `j` at end of nums2 (`n - 1`)
- `k` at the very end of nums1 (`m + n - 1`)

Compare `nums1[i]` and `nums2[j]`, place the larger at `nums1[k]`, decrement.

Only need to handle leftover nums2 - leftover nums1 elements are already in place.

**Time Complexity:** O(m + n)
**Space Complexity:** O(1)

### Solution

```typescript
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
}
```