---
title: "Merge Sort"
topic: "sorting, divide and conquer"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 912 - Sort an Array](https://leetcode.com/problems/sort-an-array/)

*Given an array of integers `nums`, sort the array in ascending order using merge sort and return it.*
### Ideas

Divide and conquer: recursively split the array in half until you have single elements (which are trivially sorted), then merge the sorted halves back together.

The merge step is the core — use two pointers to compare elements from both halves and build a sorted result. Key properties:
- **Stable sort** — equal elements maintain their relative order.
- **Guaranteed O(n log n)** — unlike quicksort, no worst-case O(n²).
- **O(n) extra space** — needed for the temporary merge arrays.

The recursion tree has O(log n) levels, and each level does O(n) work merging, giving O(n log n) total.

### Solution

```typescript
function sortArray(nums: number[]): number[] {
  if (nums.length <= 1) return nums;

  const mid = Math.floor(nums.length / 2);
  const left = sortArray(nums.slice(0, mid));
  const right = sortArray(nums.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
```
