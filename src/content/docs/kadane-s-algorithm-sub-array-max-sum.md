---
title: "Kadane’s algorithm - Sub array max sum"
topic: "array"
---
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

```csharp
public int MaxSubArray(int[] nums) {
    int currSum = 0;
    int maxSum = int.MinValue;

    foreach (int num in nums) {
        // either the current number alone (restart), or
        // extend the running subarray with this number
        currSum = Math.Max(num, currSum + num);
        maxSum = Math.Max(maxSum, currSum);
    }

    return maxSum;
}
```