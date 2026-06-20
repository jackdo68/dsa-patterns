---
title: "Single Number"
topic: "bit-manipulation, xor, easy"
---
### Question

[LeetCode 136 - Single Number](https://leetcode.com/problems/single-number/)

Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

**Example 1:**
```
Input: nums = [2,2,1]
Output: 1
```

**Example 2:**
```
Input: nums = [4,1,2,1,2]
Output: 4
```

**Example 3:**
```
Input: nums = [1]
Output: 1
```

### Ideas

The key insight is using **XOR** properties:
1. `a ^ a = 0` (any number XOR itself is 0)
2. `a ^ 0 = a` (any number XOR 0 is itself)
3. XOR is commutative and associative

If we XOR all numbers together:
- Pairs cancel out: `a ^ a = 0`
- The single number remains: `0 ^ single = single`

**Example walkthrough:** `[4,1,2,1,2]`
```
4 ^ 1 ^ 2 ^ 1 ^ 2
= 4 ^ (1 ^ 1) ^ (2 ^ 2)
= 4 ^ 0 ^ 0
= 4
```

### Implementation

```tsx
function singleNumber(nums: number[]): number {
    let result = 0;

    for (const num of nums) {
        result ^= num;
    }

    return result;
}
```

**Time Complexity:** O(n) - single pass through the array

**Space Complexity:** O(1) - only using one variable

### Common Bit Manipulation Operations

```tsx
// Check if bit at position i is set
const isSet = (n >> i) & 1;

// Set bit at position i
const setBit = n | (1 << i);

// Clear bit at position i
const clearBit = n & ~(1 << i);

// Toggle bit at position i
const toggleBit = n ^ (1 << i);

// Count number of 1 bits (Brian Kernighan's algorithm)
function countBits(n: number): number {
    let count = 0;
    while (n) {
        n &= (n - 1);  // Clear the lowest set bit
        count++;
    }
    return count;
}

// Check if n is power of 2
const isPowerOfTwo = n > 0 && (n & (n - 1)) === 0;
```

### Related Problems

- **Single Number II (137):** Every element appears 3 times except one (use bit counting)
- **Single Number III (260):** Two elements appear once (use XOR + bit partitioning)
- **Missing Number (268):** XOR with indices
- **Number of 1 Bits (191):** Count set bits
