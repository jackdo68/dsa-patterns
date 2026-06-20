---
title: "Basic - Fibonacci - 1D Array"
topic: "array, dynamic programming"
difficulty: "Easy"
frequency: "High"
---
[← Dynamic Programming Wiki](/dsa-patterns/dynamic-programming-wiki/)

### Question

[LeetCode 509 - Fibonacci Number](https://leetcode.com/problems/fibonacci-number/)

*The **Fibonacci numbers**, commonly denoted `F(n)` form a sequence, called the **Fibonacci sequence**, such that each number is the sum of the two preceding ones, starting from `0` and `1`. That is,*

```
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
```

Given `n`, calculate `F(n)`.

### Solution

```typescript
function fib(n: number): number {
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 2] + dp[i - 1];
  }
  return dp[n];
}
```