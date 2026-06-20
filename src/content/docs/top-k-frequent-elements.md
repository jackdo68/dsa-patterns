---
title: "Top K Frequent Elements"
topic: "array, hash map, heap"
difficulty: "Medium"
frequency: "High"
---
### Question

[LeetCode 347 - Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

*Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in **any order**.*
### Ideas

Count frequencies with a hash map, then find the top k.

**Bucket sort approach (O(n)):**

The key insight is: the maximum possible frequency of any element is `n` (the array length). So we can create an array of size `n + 1` where the **index represents the frequency**, and each bucket holds the elements that appear that many times.

Step by step with `nums = [1,1,1,2,2,3]`, `k = 2`:

1. Count frequencies: `{1: 3, 2: 2, 3: 1}`
2. Create buckets array of size `n + 1 = 7`:
   ```
   index:  0    1    2    3    4    5    6
   value: [ ] [3]  [2]  [1]  [ ]  [ ]  [ ]
   ```
   - `3` appears 1 time → goes in bucket[1]
   - `2` appears 2 times → goes in bucket[2]
   - `1` appears 3 times → goes in bucket[3]
3. Walk from the **end** (highest frequency) and collect elements until you have `k`:
   - bucket[6]: empty
   - bucket[5]: empty
   - bucket[4]: empty
   - bucket[3]: `[1]` → collect it, count = 1
   - bucket[2]: `[2]` → collect it, count = 2 = k, done

Result: `[1, 2]`

This works because instead of sorting elements by frequency (O(n log n)), we directly place them at their frequency index — essentially using frequency as an array address. Walking from the end gives us the most frequent elements first.

### Solution

```typescript
function topKFrequent(nums: number[], k: number): number[] {
  const freqMap = new Map<number, number>();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Bucket sort: index = frequency, value = list of numbers with that frequency
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
```
