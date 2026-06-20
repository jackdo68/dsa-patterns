---
title: "ASCII To Integer (ATOI)"
topic: "string"
difficulty: "Medium"
frequency: "Low"
---
### Question

[LeetCode 8 - String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

*Implement the `myAtoi(string s)` function, which converts a string to a 32-bit signed integer.*

*The algorithm for `myAtoi(string s)` is as follows:*

1. ***Whitespace**: Ignore any leading whitespace (`" "`).*
2. ***Signedness**: Determine the sign by checking if the next character is `'-'` or `'+'`, assuming positivity if neither present.*
3. ***Conversion**: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.*
4. ***Rounding**: If the integer is out of the 32-bit signed integer range `[-231, 231 - 1]`, then round the integer to remain in the range. Specifically, integers less than `231` should be rounded to `231`, and integers greater than `231 - 1` should be rounded to `231 - 1`.*

*Return the integer as the final result.*
### Solution

```typescript
function myAtoi(s: string): number {
  let result = 0;
  let sign = 1;

  const INT_MAX = Math.pow(2, 31) - 1;
  const INT_MIN = -Math.pow(2, 31);

  const n = s.length;
  let i = 0;
  // Phase 1: Skip leading whitespace
  while (i < n && s[i] === " ") {
    i++;
  }

  if (i === n) return result;
  // Phase 2: Check for sign
  if (s[i] === "+") {
    i++;
  } else if (s[i] === "-") {
    sign = -1;
    i++;
  }

  // Phase 3: Read digits and build number
  // Character comparison works lexicographically via charCodeAt ('0'-'9' are consecutive: 48-57)
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i].charCodeAt(0) - "0".charCodeAt(0);

    // Check for overflow BEFORE updating result
    // Case 1: result would exceed INT_MAX / 10
    if (result > Math.floor(INT_MAX / 10)) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    // Case 2: result == INT_MAX / 10, check the last digit
    if (result === Math.floor(INT_MAX / 10) && digit > INT_MAX % 10) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    i++;
  }
  return result * sign;
}
```