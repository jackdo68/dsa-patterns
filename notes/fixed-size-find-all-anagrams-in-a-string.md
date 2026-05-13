# Fixed Size - Find all anagrams in a string

Topic: sliding window, string

Difficulty: Medium

Interview Frequency: High

### Question

[LeetCode 438 - Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

*Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in **any order**.*

### Ideas

**Instinct: fixed target size → fixed window.** An anagram is just a rearrangement — same characters, same counts. The moment you notice the target has a fixed length, that's the signal: you don't need to search all substrings of every length, only substrings of exactly `p.length`. Fixed size = fixed window.

**Instinct: equality of sets → frequency map comparison.** Two strings are anagrams when their character frequencies match. So instead of sorting every window (O(k log k) each), maintain a running frequency map and compare it against `p`'s map in O(1) — slide in the new character on the right, slide out the old character on the left.

**Instinct: shrink before checking.** Add the right character first, then if the window is too big, evict the leftmost character. Only after the window is exactly `p.length` do you check for a match. This keeps the logic one clean pass with no edge cases.

### Solution

```typescript
function findAnagrams(s: string, p: string): number[] {
  function isAnagram(m1: Map<string, number>, m2: Map<string, number>): boolean {
    for (const k of [...m1.keys()]) {
      if (!m2.has(k)) return false;
      if (m1.get(k) !== m2.get(k)) return false;
    }
    return true;
  }
  const res: number[] = [];
  if (s.length < p.length) return res;

  const pMap = new Map();
  for (const c of p) {
    if (!pMap.has(c)) pMap.set(c, 0);
    pMap.set(c, pMap.get(c) + 1);
  }

  const sMap = new Map();
  let left = 0;
  let right = 0;
  while (right < s.length) {
    const c = s[right];
    if (!sMap.has(c)) sMap.set(c, 0);
    sMap.set(c, sMap.get(c) + 1);

    if (right - left + 1 > p.length) {
      sMap.set(s[left], sMap.get(s[left]) - 1);
      if (sMap.get(s[left]) === 0) sMap.delete(s[left]);
      left++;
    }

    if (right - left + 1 === p.length && isAnagram(sMap, pMap)) res.push(left);

    right++;
  }
  return res;
}
```