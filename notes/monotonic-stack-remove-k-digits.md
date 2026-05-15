# Monotonic Stack - Remove k digits

Topic: greedy, stack

Difficulty: Medium

Interview Frequency: Medium

### Question

[LeetCode 402 - Remove K Digits](https://leetcode.com/problems/remove-k-digits/)

*Given string num representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.*

*Example 1:*

```
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

### Ideas

**Instinct: smallest number = smallest leading digits.** To minimize a number, you want the smallest digit as far left as possible — leftmost digits carry the most weight. So the question becomes: which digits should we remove to get the smallest leading sequence?

With `162837`, `k = 3`: we want to keep the smallest leading digit, then the second smallest leading digit, then the third, and so on. Any digit that is *larger than the one following it* is a candidate for removal — it's hurting the number by sitting in front of something smaller.

**Instinct: "remove larger before smaller" → monotonic stack.** We want to maintain a non-decreasing sequence of digits from left to right. Whenever the current digit is smaller than the top of the stack, the top is a digit that doesn't belong — pop it (remove it). This is exactly what a monotonic increasing stack does.

**The algorithm:** scan left to right, maintaining a stack. Before pushing, pop any digit larger than the current one (counting each pop against `k`). The stack always holds the best prefix seen so far.

Step by step with `num = "1432219"`, `k = 3`:

```
digit '1': stack empty, push.              stack: [1]         k=3
digit '4': 4 > 1 → just push.             stack: [1,4]       k=3
digit '3': 3 < 4 → pop 4 (remove).        stack: [1]         k=2
           3 > 1 → stop. Push 3.          stack: [1,3]       k=2
digit '2': 2 < 3 → pop 3 (remove).        stack: [1]         k=1
           2 > 1 → stop. Push 2.          stack: [1,2]       k=1
digit '2': 2 = 2 → just push.             stack: [1,2,2]     k=1
digit '1': 1 < 2 → pop 2 (remove).        stack: [1,2]       k=0
           k=0, stop popping. Push 1.      stack: [1,2,1]     k=0
digit '9': k=0, just push.                stack: [1,2,1,9]   k=0
```

Result: `"1219"`

**Two edge cases:**
1. **k still > 0 after scanning** (e.g. `"1234"`, k=2 — digits are already non-decreasing, no "drops" found). The largest digits are at the right end, so remove from the right.
2. **Leading zeros** (e.g. `"10200"`, k=1 → remove `1` → `"0200"`). Skip pushing `0` when the stack is empty to avoid leading zeros.

### Solution

```typescript
function removeKdigits(num: string, k: number): string {
  if (k >= num.length) return "0";
  const stack: string[] = [];

  // create a monotonic stack
  for (const c of num) {
    while (stack.length && stack[stack.length - 1]! > c && k > 0) {
      stack.pop();
      k--;
    }
    // leading zeros
    if (stack.length === 0 && c === "0") continue;
    stack.push(c);
  }
  // if k still greater than 0, remove from the right
  if (k > 0) {
    stack.splice(stack.length - k, k);
  }
  return stack.length === 0 ? "0" : stack.join("");
}
```