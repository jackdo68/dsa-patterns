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

```csharp
public int FindKthLargest(int[] nums, int k) {
    int targetIndex = nums.Length - k;  // kth largest = (n-k)th smallest

    int QuickSelect(int left, int right) {
        // Partition around rightmost element
        int pivot = nums[right];
        int partitionIndex = left;

        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                (nums[i], nums[partitionIndex]) = (nums[partitionIndex], nums[i]);
                partitionIndex++;
            }
        }

        // Place pivot in its final position
        (nums[partitionIndex], nums[right]) = (nums[right], nums[partitionIndex]);

        // Check if we found the target
        if (partitionIndex == targetIndex) {
            return nums[partitionIndex];
        } else if (partitionIndex < targetIndex) {
            return QuickSelect(partitionIndex + 1, right);
        } else {
            return QuickSelect(left, partitionIndex - 1);
        }
    }

    return QuickSelect(0, nums.Length - 1);
}
```

**Approach 2: Quick Select with Random Pivot (Better worst case)**

```csharp
private static readonly Random Rng = new();

public int FindKthLargest(int[] nums, int k) {
    int targetIndex = nums.Length - k;

    int QuickSelect(int left, int right) {
        if (left == right) return nums[left];

        // Random pivot to avoid worst case
        int randomIndex = left + Rng.Next(right - left + 1);
        (nums[randomIndex], nums[right]) = (nums[right], nums[randomIndex]);

        int pivot = nums[right];
        int partitionIndex = left;

        for (int i = left; i < right; i++) {
            if (nums[i] <= pivot) {
                (nums[i], nums[partitionIndex]) = (nums[partitionIndex], nums[i]);
                partitionIndex++;
            }
        }

        (nums[partitionIndex], nums[right]) = (nums[right], nums[partitionIndex]);

        if (partitionIndex == targetIndex) {
            return nums[partitionIndex];
        } else if (partitionIndex < targetIndex) {
            return QuickSelect(partitionIndex + 1, right);
        } else {
            return QuickSelect(left, partitionIndex - 1);
        }
    }

    return QuickSelect(0, nums.Length - 1);
}
```

**Approach 3: Min Heap of size K**

```csharp
public int FindKthLargest(int[] nums, int k) {
    // Use a min heap of size k; the top of the heap is the kth largest
    var minHeap = new PriorityQueue<int, int>();

    foreach (int num in nums) {
        minHeap.Enqueue(num, num);

        // Keep only the k largest elements
        if (minHeap.Count > k) {
            minHeap.Dequeue();
        }
    }

    return minHeap.Peek();
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
