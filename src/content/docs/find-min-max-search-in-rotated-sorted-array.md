---
title: "Find Min/Max - Search in rotated sorted array"
topic: "binary search"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 33 - Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)

*There is an integer array `nums` sorted in ascending order (with **distinct** values).*

*Prior to being passed to your function, `nums` is **possibly left rotated** at an unknown index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be left rotated by `3` indices and become `[4,5,6,7,0,1,2]`.*

*Given the array `nums` **after** the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.*

*You must write an algorithm with `O(log n)` runtime complexity.*

*Example 1:*

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

### Ideas

A rotated sorted array has two sorted halves: `[4,5,6,7 | 0,1,2]`. The pivot (smallest element) is where the rotation happened. If we find the pivot, we know which half to search in.

**Step 1: Find the pivot (first element <= last element)**

Using the lower bound pattern with condition: `nums[mid] <= nums[last]`

```
arr = [4, 5, 6, 7, 0, 1, 2], last = 2

mid=3 (7): 7 <= 2? No  → left = 4
mid=5 (1): 1 <= 2? Yes → save, right = 5
mid=4 (0): 0 <= 2? Yes → save, right = 4
left === right = 4 → pivot at index 4 (value 0)
```

**Step 2: Decide which half to search**

- If `target` is between `nums[pivot]` and `nums[last]` → search the right half `[pivot, n-1]`
- Otherwise → search the left half `[0, pivot-1]`

**Step 3: Classic binary search on the chosen half**

For `target = 0`: 0 is between `nums[4]=0` and `nums[6]=2` → search right half → found at index 4.

### Solution

```typescript
function search(nums: number[], target: number): number {
  const n = nums.length;
  const last = nums[n - 1];

  /**
   * find the pivot, the first element that is smaller than last
   */
  let left = 0;
  let right = nums.length - 1;
  let pivot = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > last) {
      left = mid + 1;
    } else {
      pivot = mid;
      right = mid - 1;
    }
  }

  function bSearch(i: number, j: number): number {
    while (i <= j) {
      const mid = Math.floor((i + j) / 2);
      if (nums[mid] === target) {
        return mid;
      } else if (nums[mid] < target) {
        i = mid + 1;
      } else {
        j = mid - 1;
      }
    }
    return -1;
  }
  return target >= nums[pivot] && target <= nums[n - 1] ? bSearch(pivot, n - 1) : bSearch(0, pivot - 1);
}
```