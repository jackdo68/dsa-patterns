# Kadane’s algorithm - Sub array max sum

Tags: array

### Ideas

**Instinct: "max sum subarray" → one decision per element.** At every element, you face one question: is it better to extend the running subarray, or restart fresh here? If the running sum is negative, it's dragging you down — cut it and start over. If it's positive, keep it.

This reduces an O(n²) brute force to a single O(n) pass.

**The decision at each step:**
```
currSum = max(num, currSum + num)
```
- Pick `num` alone → restart here
- Pick `currSum + num` → extend the previous subarray

Track the global max separately, since `currSum` resets when restarting.

**Example** `[-2, 1, -3, 4, -1, 2, 1]`:

| num | currSum | maxSum |
|-----|---------|--------|
| -2  | -2      | -2     |
| 1   | 1 ← restart | 1  |
| -3  | -2      | 1      |
| 4   | 4 ← restart | 4  |
| -1  | 3       | 4      |
| 2   | 5       | 5      |
| 1   | 6       | **6**  |

Answer: `6` from subarray `[4, -1, 2, 1]`.

### Solution

```typescript
function maxSubArray(nums: number[]): number {
    let currSum = 0;
    let maxSum = -Infinity;

    for (const num of nums) {
      // either the current number or the sum of
      // curent number and maxSum until previous number
      currSum = Math.max(num, currSum + num); 
      maxSum = Math.max(maxSum, currSum);
    }

    return maxSum;
};
```