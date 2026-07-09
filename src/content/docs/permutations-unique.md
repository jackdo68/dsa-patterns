---
title: "Permutations Unique"
topic: "backtracking, dfs"
difficulty: "Medium"
frequency: "Medium"
---
See [Maths](/dsa-patterns/maths/) for the theory behind permutations and factorial.

### Question

[LeetCode 47 - Permutations II](https://leetcode.com/problems/permutations-ii/)

- *Given a collection of numbers, `nums`, that might contain duplicates, return *all possible unique permutations **in any order**.**
- *Example*

```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

### Ideas

**Permutations:** All possible orderings of elements. An array of n elements has n! permutations (with duplicates, fewer unique ones).

**Frequency map approach:** Use a map to track each unique number and its remaining count. At each position, only iterate over unique keys - this naturally avoids duplicate permutations without sorting or skip logic.

```
nums = [1,1,2] → map = {1: 2, 2: 1}

Position 0: try 1 (count→1), try 2 (count→0)
Position 1: try remaining keys with count > 0
Position 2: try remaining keys with count > 0
```

**Key mechanics:**
- Base case: when `k === nums.length`, we've filled all positions → add path to result
- Recursive case: for each unique key with count > 0, use it and recurse
- Backtrack by restoring count and popping from path

**Time: O(n! × n)** — up to n! permutations, each takes O(n) to copy

**Space: O(n)** — recursion depth + path array + map with at most n keys

### Solution

```csharp
public IList<IList<int>> PermuteUnique(int[] nums) {
    var freq = new Dictionary<int, int>();
    foreach (int num in nums) {
        freq[num] = freq.GetValueOrDefault(num, 0) + 1;
    }
    var result = new List<IList<int>>();

    void Dfs(List<int> path) {
        if (path.Count == nums.Length) {
            result.Add(new List<int>(path));
            return;
        }

        // iterate a snapshot of keys since we mutate freq values while looping
        foreach (int num in freq.Keys.ToList()) {
            if (freq[num] == 0) continue;

            freq[num]--;
            path.Add(num);
            Dfs(path);
            // backtrack
            freq[num]++;
            path.RemoveAt(path.Count - 1);
        }
    }
    Dfs(new List<int>());
    return result;
}
```