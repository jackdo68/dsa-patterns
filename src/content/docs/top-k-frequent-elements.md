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

```csharp
public int[] TopKFrequent(int[] nums, int k) {
    var freqMap = new Dictionary<int, int>();
    foreach (int num in nums) {
        freqMap[num] = freqMap.GetValueOrDefault(num, 0) + 1;
    }

    // Bucket sort: index = frequency, value = list of numbers with that frequency
    var buckets = new List<int>[nums.Length + 1];
    for (int i = 0; i < buckets.Length; i++) buckets[i] = new List<int>();
    foreach (var (num, freq) in freqMap) {
        buckets[freq].Add(num);
    }

    var result = new List<int>();
    for (int i = buckets.Length - 1; i >= 0 && result.Count < k; i--) {
        result.AddRange(buckets[i]);
    }

    return result.Take(k).ToArray();
}
```
