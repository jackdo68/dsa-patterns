---
title: "Word Break"
topic: "dynamic programming"
difficulty: "Medium"
frequency: "High"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 139 - Word Break](https://leetcode.com/problems/word-break/)

*Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.*

***Note** that the same word in the dictionary may be reused multiple times in the segmentation.*

*Example 1:*

```
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
```

### Ideas

- If we use brute force, at each character, we need to decide whether we make the cut, and from the cut, but segments are valid? This will lead to redundant calculation
- This leads to dynamic programming, the solution is built from subproblems, if we know whether all prefixes of the string can be segmented, then the entire string can be segmented
- `dp[i]` represents whether `s[0:i]` can be segmented

### Solution

```typescript
  function wordBreak(s: string, wordDict: string[]): boolean {
    // for "leetcode" with 8 chars, we need array that has index 8 because substring(i,j) will include the last index
    const dp = Array(s.length + 1).fill(false);
    const set = new Set(wordDict);
    dp[0] = true; // base case, empty string

    for (let i = 1; i <= s.length; i++) {
      for (let j = 0; j < i; j++) {
        // the substring(0,j) can be segmented, and substring(j,i) exist in wordDict
        if (dp[j] && set.has(s.substring(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[s.length];
  }
```