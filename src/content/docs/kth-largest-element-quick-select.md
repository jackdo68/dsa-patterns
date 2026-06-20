---
title: "Kth Largest Element in an Array"
topic: "array, quick-select, heap, sorting, medium"
---
### Question

[LeetCode 215 - Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)

Given an integer array `nums` and an integer `k`, return the `kth` largest element in the array.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

Can you solve it without sorting?

**Example 1:**
```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**
```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

### Ideas

Three approaches:

1. **Sort:** O(n log n) - simple but not optimal
2. **Min Heap of size k:** O(n log k) - good for streaming
3. **Quick Select:** O(n) average - optimal for this problem

**Quick Select** is a selection algorithm based on QuickSort's partition:
- Partition array around a pivot
- If pivot is at index `n-k`, we found our answer
- Otherwise, recurse on the appropriate half

### Implementation

**Approach 1: Quick Select (Optimal)**

```tsx
function findKthLargest(nums: number[], k: number): number {
    const targetIndex = nums.length - k;  // kth largest = (n-k)th smallest

    function quickSelect(left: number, right: number): number {
        // Partition around rightmost element
        const pivot = nums[right];
        let partitionIndex = left;

        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[i], nums[partitionIndex]] = [nums[partitionIndex], nums[i]];
                partitionIndex++;
            }
        }

        // Place pivot in its final position
        [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]];

        // Check if we found the target
        if (partitionIndex === targetIndex) {
            return nums[partitionIndex];
        } else if (partitionIndex < targetIndex) {
            return quickSelect(partitionIndex + 1, right);
        } else {
            return quickSelect(left, partitionIndex - 1);
        }
    }

    return quickSelect(0, nums.length - 1);
}
```

**Approach 2: Quick Select with Random Pivot (Better worst case)**

```tsx
function findKthLargest(nums: number[], k: number): number {
    const targetIndex = nums.length - k;

    function quickSelect(left: number, right: number): number {
        if (left === right) return nums[left];

        // Random pivot to avoid worst case
        const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
        [nums[randomIndex], nums[right]] = [nums[right], nums[randomIndex]];

        const pivot = nums[right];
        let partitionIndex = left;

        for (let i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                [nums[i], nums[partitionIndex]] = [nums[partitionIndex], nums[i]];
                partitionIndex++;
            }
        }

        [nums[partitionIndex], nums[right]] = [nums[right], nums[partitionIndex]];

        if (partitionIndex === targetIndex) {
            return nums[partitionIndex];
        } else if (partitionIndex < targetIndex) {
            return quickSelect(partitionIndex + 1, right);
        } else {
            return quickSelect(left, partitionIndex - 1);
        }
    }

    return quickSelect(0, nums.length - 1);
}
```

**Approach 3: Min Heap of size K**

```tsx
function findKthLargest(nums: number[], k: number): number {
    // Use a min heap of size k
    // The top of heap will be the kth largest
    const minHeap = new MinPriorityQueue();

    for (const num of nums) {
        minHeap.enqueue(num);

        // Keep only k largest elements
        if (minHeap.size() > k) {
            minHeap.dequeue();
        }
    }

    return minHeap.front().element;
}
```

**Time Complexity:**
- Quick Select: O(n) average, O(n²) worst case
- Min Heap: O(n log k)

**Space Complexity:**
- Quick Select: O(1) in-place
- Min Heap: O(k)

### Quick Select vs Heap

| Scenario | Better Approach |
|----------|-----------------|
| One-time query | Quick Select O(n) |
| Streaming data | Heap O(log k) per element |
| k is very small | Heap |
| k is close to n | Quick Select |
| Need stable (no mutation) | Heap |

### Visualization: Partition Process

```
[3, 2, 1, 5, 6, 4], k=2, target_index = 4

Partition around 4:
[3, 2, 1, 4, 6, 5]  → pivot at index 3

3 < 4, need right half: [6, 5]
Partition around 5:
[3, 2, 1, 4, 5, 6]  → pivot at index 4 ✓

Answer: nums[4] = 5
```

### Related Problems

| Problem | Variation |
|---------|-----------|
| Kth Largest | Basic Quick Select |
| K Closest Points | Quick Select with distance |
| Top K Frequent | Bucket Sort or Quick Select |
| Median of Array | Quick Select with k = n/2 |
| Wiggle Sort II | Find median, then partition |
