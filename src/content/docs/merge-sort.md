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

```csharp
public int[] SortArray(int[] nums) {
    if (nums.Length <= 1) return nums;

    int mid = nums.Length / 2;
    int[] left = SortArray(nums[..mid]);   // range operator slices the array
    int[] right = SortArray(nums[mid..]);

    return Merge(left, right);
}

private int[] Merge(int[] left, int[] right) {
    var result = new List<int>();
    int i = 0;
    int j = 0;

    while (i < left.Length && j < right.Length) {
        if (left[i] <= right[j]) {
            result.Add(left[i]);
            i++;
        } else {
            result.Add(right[j]);
            j++;
        }
    }

    while (i < left.Length) result.Add(left[i++]);
    while (j < right.Length) result.Add(right[j++]);

    return result.ToArray();
}
```
