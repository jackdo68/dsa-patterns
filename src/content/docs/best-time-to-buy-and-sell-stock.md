---
title: "Best Time to Buy and Sell Stock"
topic: "dynamic programming, greedy, two pointer"
difficulty: "Easy"
frequency: "High"
---
### Question

[LeetCode 121 - Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

*You are given an array `prices` where `prices[i]` is the price of a given stock on the `ith` day.*

*You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.*

*Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.*

### Ideas

**The mental model: you're a trader walking through the days one by one.**

At any moment, you only need to track two things:
- **`buy`** — the day you'd want to have bought (the cheapest day so far)
- **`sell`** — the day you're currently looking at

For each new day, you ask one question:

> *"Is today cheaper than my best buy day so far?"*

- **Yes** → today is a better buying opportunity. Move `buy` to today. (No profit to compute — selling today at today's price gives 0.)
- **No** → today is more expensive than my best buy. I could sell today. Check if `prices[sell] - prices[buy]` is the best profit I've seen.

That's the whole algorithm.

**Why we never need to remember earlier high prices:** suppose on day 3 the price was 100. Why don't we save 100 as a potential sell point for later? Because we walk through days *in order*. By the time we see day 4, day 3 is already in the past. Any future profit will be calculated against `prices[buy]`, not against some earlier high. Past prices that aren't the cheapest are irrelevant — they're not cheaper for buying, and they're not in the future for selling.

**The two key insights:**

1. **Only the minimum past price matters as a buy candidate.** Other past prices can't help — they're not cheaper for buying, and they're not in the future for selling.
2. **Walking forward, you only need to decide one thing per day:** "is today better as a new buy point, or as a sell point relative to my current buy?"

### Walkthrough

`prices = [7, 1, 5, 3, 6, 4]`

```
Day 0: price=7.  buy=0 (price=7).  maxProfit=0.
Day 1: price=1.  1 < 7 → cheaper buy day. buy=1 (price=1).
Day 2: price=5.  5 > 1 → could sell. profit = 5-1 = 4. maxProfit=4.
Day 3: price=3.  3 > 1 → could sell. profit = 3-1 = 2. maxProfit stays 4.
Day 4: price=6.  6 > 1 → could sell. profit = 6-1 = 5. maxProfit=5. ✓
Day 5: price=4.  4 > 1 → could sell. profit = 4-1 = 3. maxProfit stays 5.

Answer: 5
```

The "buy on day 1, sell on day 4" pair gives the max profit of 5 — and the algorithm found it without considering every possible buy/sell pair.

### Solution

```csharp
public int MaxProfit(int[] prices) {
    int buy = 0;
    int maxProfit = 0;
    for (int sell = 1; sell < prices.Length; sell++) {
        if (prices[sell] < prices[buy]) {
            buy = sell;   // found a cheaper buying day; reset
        } else {
            maxProfit = Math.Max(maxProfit, prices[sell] - prices[buy]);
        }
    }
    return maxProfit;
}
```

**Time:** O(n). **Space:** O(1).

**Why "buy and sell on different days" is automatically respected:**
- `sell` starts at `1` (not `0`), so the first iteration already has `sell > buy`.
- When we find a cheaper day and set `buy = sell`, we go into the *if* branch and **don't compute profit**. So `buy === sell` only happens in the "reset" case, never in the "compute profit" case.
- On the next iteration, `sell++`, so they're different again.

No subtle order-of-updates trickery needed — the two pointers make the constraint visible in the code structure.
