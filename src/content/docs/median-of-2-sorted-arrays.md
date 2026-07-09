---
title: "Median of 2 Sorted Arrays"
topic: "binary search, divide and conquer"
difficulty: "Hard"
frequency: "Very Low"
---
### Question

[LeetCode 4 - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)

*Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return **the median** of the two sorted arrays.*

*The overall run time complexity should be `O(log (m+n))`.*

*Example 1:*

```
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
```

### Ideas

- Both of arrays are sorted, finding median of 2 sorted arrays with length `m` and `n` can be in 2 cases
    - if `(m + n)` is odd, then we need to find the `(m+n+1)/2`th smallest element of both arrays
    - otherwise it will be the average of the lower number and the upper number
    - e.g: if `nums1` has 3 elements, `nums2` has 5 elements, we need to find the average of element 4th and 5th
    - if `nums1` has 3 elements, `nums2` has 4 elements, then we need to find the 4th smallest element
- in order to find the `kth` smallest of 2 arrays, since both are sorted, we can compare the `k/2 th` element of both, if one is smaller, then we know all the elements before that `k/2 th` position is smaller, then we can eliminate all `k/2` elements on the left of that position

e.g

```
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]
k = 4
```

1. Initially, halfK = 2
2. Compare:
    - midValueInFirst = nums1[1] = 3
    - midValueInSecond = nums2[1] = 4

### Decision Making Process

### Case 1: If midValueInFirst < midValueInSecond

- We know that all elements before midValueInFirst in nums1 are:
    1. Smaller than midValueInFirst
    2. Definitely smaller than midValueInSecond
- Therefore, we can safely eliminate these elements
- We advance firstIndex by halfK

### Solution

```csharp
public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
    int m = nums1.Length;
    int n = nums2.Length;

    // find the kth smallest item of the two sorted arrays, starting from index i, j
    int FindKthSmallest(int i, int j, int k) {
        // exhaust either array
        if (i >= m) return nums2[j + k - 1];
        if (j >= n) return nums1[i + k - 1];
        if (k == 1) return Math.Min(nums1[i], nums2[j]);

        // compare the mid item of both arrays, eliminate halfK elements
        int halfK = k / 2;

        int mid1 = i + halfK - 1 < m ? nums1[i + halfK - 1] : int.MaxValue;
        int mid2 = j + halfK - 1 < n ? nums2[j + halfK - 1] : int.MaxValue;
        // all elements before mid1 will be smaller, so we can discard them
        if (mid1 < mid2) {
            return FindKthSmallest(i + halfK, j, k - halfK);
        } else {
            return FindKthSmallest(i, j + halfK, k - halfK);
        }
    }

    // if m + n is odd, both halves are the same; if even, average them
    int lowerHalf = (m + n + 1) / 2;
    int upperHalf = (m + n + 2) / 2;
    return (FindKthSmallest(0, 0, lowerHalf) + FindKthSmallest(0, 0, upperHalf)) / 2.0;
}
```