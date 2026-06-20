---
title: "Product Except Self"
topic: "array, prefix sum"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 238 - Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

*Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.*

*The product of any prefix or suffix of `nums` is **guaranteed** to fit in a **32-bit** integer.*

*You must write an algorithm that runs in `O(n)` time and without using the division operation.*

*Example 1:*

```
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
```

### Ideas

The key insight is that for each index `i`, the result is the product of all elements to its left multiplied by all elements to its right.

1. **Prefix products**: First pass builds prefix products where `result[i]` stores the product of all elements before index `i`
2. **Suffix products**: Second pass multiplies each position by the product of all elements after it, using a running `suffixProd` variable

For `nums = [1,2,3,4]`:
- After prefix pass: `[1, 1, 2, 6]` (1, 1, 1×2, 1×2×3)
- After suffix pass: `[24, 12, 8, 6]` (1×24, 1×12, 2×4, 6×1)

This achieves O(n) time and O(1) extra space (excluding the output array).

### Solution

```typescript
function productExceptSelf(nums: number[]): number[] {
    const length = nums.length;
    const result = new Array(length);
    // cal the suffix product

    result[0] = 1;
    for (let i = 1; i < length; i++) {
      result[i] = result[i - 1] * nums[i - 1];
    }

    // call the postfix product
    let suffixProd = 1;
    for (let i = length - 1; i >= 0; i--) {
      result[i] = result[i] * suffixProd;
      suffixProd = suffixProd * nums[i];
    }
    return result;
};
```