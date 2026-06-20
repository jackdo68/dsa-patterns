---
title: "String Matching - Rabin Karp"
topic: "string"
difficulty: "Medium"
frequency: "Low"
---
### Ideas

The Rabin-Karp algorithm is a string searching algorithm that finds a pattern within a text using **hashing**. Instead of comparing characters one by one, it converts substrings into numbers and compares those numbers. 

### Key Concepts

**Rolling Hash:** The clever part is calculating the next window's hash efficiently. Instead of recalculating from scratch, we:

- Remove the leftmost character's contribution
- Add the new rightmost character's contribution

**Why Use Prime & Modulo?** To keep hash values manageable and reduce collisions (different strings with same hash).

**Time Complexity:**

- Average case: O(n + m) where n = text length, m = pattern length
- Worst case: O(nm) when many hash collisions occur

### Solution

```typescript
function rabinKarp(text: string, pattern: string): number[] {
  const matches: number[] = [];

  if (pattern.length === 0 || pattern.length > text.length) {
    return matches;
  }

  const base = 256; // Number of characters in ASCII
  const prime = 101; // A prime number for modulo operation

  let patternHash = 0;
  let textHash = 0;
  let h = 1;

  const m = pattern.length;
  const n = text.length;

  // Calculate h = base^(m-1) % prime
  // This is used for removing the leading digit when sliding window
  for (let i = 0; i < m - 1; i++) {
    h = (h * base) % prime;
  }

  // Calculate initial hash values for pattern and first window of text
  for (let i = 0; i < m; i++) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % prime;
    textHash = (base * textHash + text.charCodeAt(i)) % prime;
  }

  // Slide the pattern over text one character at a time
  for (let i = 0; i <= n - m; i++) {
    // If hash values match, check characters one by one
    if (patternHash === textHash) {
      let match = true;
      for (let j = 0; j < m; j++) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) {
        matches.push(i);
      }
    }

    // Calculate hash for next window
    // Remove leading digit, add trailing digit
    if (i < n - m) {
      textHash = (base * (textHash - text.charCodeAt(i) * h) + text.charCodeAt(i + m)) % prime;

      // Handle negative hash values
      if (textHash < 0) {
        textHash += prime;
      }
    }
  }

  return matches;
}
```