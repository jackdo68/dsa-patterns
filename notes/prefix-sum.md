# Prefix sum

Topic: array, prefix sum

Difficulty: Medium

Interview Frequency: Low

### Ideas

**Core identity:** if a subarray from `i` to `j` has sum `k`, then:
```
prefixSum[j] - prefixSum[i-1] = k
```
This means any subarray sum reduces to a subtraction of two prefix values — O(1) per query instead of O(n).

**When to reach for prefix sum:**

1. **"Subarray sum equals k"** — you need to count or find subarrays with a specific sum. Store prefix sums in a hash map, then for each `j` ask: has `prefixSum[j] - k` been seen before?

2. **Repeated range sum queries** — given a fixed array and many queries asking "what's the sum from i to j?", precompute prefix sums once O(n), answer each query O(1).

3. **2D range sums** — same idea extended to matrices. Precompute a 2D prefix sum grid to answer rectangle sum queries in O(1).

4. **Even/odd prefix sum parity** — when the problem involves subarrays with even/odd sums, track parity of prefix sums instead of the values themselves.

**The signal:** whenever you see "subarray sum" + (find / count / optimize), prefix sum is likely involved — often paired with a hash map to avoid a nested loop.

### Solution

```typescript
function prefixSum(arr: number[]): number[] {
  const prefixSums: number[] = [];
  let currentSum = 0;

  for (let i = 0; i < arr.length; i++) {
    currentSum += arr[i];
    prefixSums.push(currentSum);
  }

  return prefixSums;
}
```