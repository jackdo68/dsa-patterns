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

```csharp
public IList<int> RabinKarp(string text, string pattern) {
    var matches = new List<int>();

    if (pattern.Length == 0 || pattern.Length > text.Length) {
        return matches;
    }

    const int base_ = 256; // Number of characters in ASCII
    const int prime = 101; // A prime number for modulo operation

    int patternHash = 0;
    int textHash = 0;
    int h = 1;

    int m = pattern.Length;
    int n = text.Length;

    // Calculate h = base^(m-1) % prime
    // Used for removing the leading digit when sliding the window
    for (int i = 0; i < m - 1; i++) {
        h = (h * base_) % prime;
    }

    // Calculate initial hash values for pattern and first window of text
    for (int i = 0; i < m; i++) {
        patternHash = (base_ * patternHash + pattern[i]) % prime;
        textHash = (base_ * textHash + text[i]) % prime;
    }

    // Slide the pattern over text one character at a time
    for (int i = 0; i <= n - m; i++) {
        // If hash values match, check characters one by one
        if (patternHash == textHash) {
            bool match = true;
            for (int j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                matches.Add(i);
            }
        }

        // Calculate hash for next window: remove leading digit, add trailing digit
        if (i < n - m) {
            textHash = (base_ * (textHash - text[i] * h) + text[i + m]) % prime;

            // Handle negative hash values
            if (textHash < 0) {
                textHash += prime;
            }
        }
    }

    return matches;
}
```