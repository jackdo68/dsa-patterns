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

```csharp
public bool WordBreak(string s, IList<string> wordDict) {
    // dp has length s.Length + 1 so dp[i] covers the prefix s[0..i)
    bool[] dp = new bool[s.Length + 1];
    var set = new HashSet<string>(wordDict);
    dp[0] = true; // base case: empty string

    for (int i = 1; i <= s.Length; i++) {
        for (int j = 0; j < i; j++) {
            // s[0..j) can be segmented, and s[j..i) is in the dictionary
            if (dp[j] && set.Contains(s.Substring(j, i - j))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.Length];
}
```