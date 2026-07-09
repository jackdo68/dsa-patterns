---
title: "Best Time to Buy and Sell Stock II"
topic: "dynamic programming, greedy"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 122 - Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/)

*You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `ith` day.*

*On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can sell and buy the stock multiple times on the **same day**, ensuring you never hold more than one share of the stock.*

*Find and return the **maximum** profit you can achieve.*

### Ideas (Greedy)

**Goal:** Capture all upward price movements while avoiding downward movements (dips).

**Key insight:** Buying and selling on consecutive days is always equal to or better than holding for multiple days.

**Scenario 1: Only upward movement**

```
prices = [1, 3, 5, 8]

         8
        /
       5
      /
     3
    /
   1

Hold day 0 → day 3:
  profit = 8 - 1 = 7

Consecutive days:
  day 0→1: 3-1 = +2
  day 1→2: 5-3 = +2
  day 2→3: 8-5 = +3
  total = 7

Same result! The differences telescope: (3-1) + (5-3) + (8-5) = 8 - 1
```

**Scenario 2: With a dip (price drops)**

```
prices = [1, 5, 3, 8]

     5
    /\      8
   /  \    /
  /    \  /
 1      3
        ↑
       dip (price dropped from 5 to 3)

Hold day 0 → day 3:
  profit = 8 - 1 = 7

Consecutive days (skip negative):
  day 0→1: 5-1 = +4 ✓
  day 1→2: 3-5 = -2 (skip!)
  day 2→3: 8-3 = +5 ✓
  total = 9

Better! By selling at 5 before the dip and buying at 3 after, we avoid the loss.
```

**Summary:**
- Upward only → consecutive = holding (same profit)
- With dips → consecutive > holding (avoids losses)

Consecutive is never worse, sometimes better. So we just sum all positive differences.

### Solution (Greedy)

```csharp
public int MaxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.Length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}
```

---

### Ideas (DP)

**State machine approach:** At any point, you're in one of two states:
- `hold1Stock` = max profit while **holding exactly 1 stock**
- `hold0Stock` = max profit while **holding 0 stocks**

```
              buy
  hold0Stock ------→ hold1Stock
      ↑                   |
      |___________________| sell

Only 2 states → can only hold 0 or 1 stock (never 2+)
```

**Initialization (day 0):**
- `hold0Stock = 0` → not holding, no profit yet
- `hold1Stock = -prices[0]` → to be holding, you must have bought, so profit = -prices[0]

**Transitions (each day):**

`max` picks the better option — you do ONE, not both.

```
hold1Stock = max(hold1Stock, hold0Stock - prices[i])
                    ↑              ↑
                do nothing      I had nothing, now I buy
                (keep holding)

hold0Stock = max(hold0Stock, hold1Stock + prices[i])
                    ↑              ↑
                do nothing      I was holding, now I sell
                (stay out)
```

**Order doesn't matter** for Stock II — you can update `hold1Stock` or `hold0Stock` first. Both allow same-day transactions (buy and sell on same day), which is permitted. For problems with cooldown or limited transactions, order matters.

**Why `hold1Stock + prices[i]` when selling (not `prices[i] - hold1Stock`)?**

`hold1Stock` is profit (negative when you've spent money), not the buy price.

```
prices = [5, 8]

Day 0: hold1Stock = -5 (spent $5)
Day 1: hold0Stock = hold1Stock + 8 = -5 + 8 = 3 ✓

If we did prices[i] - hold1Stock:
  hold0Stock = 8 - (-5) = 13 ❌
```

**Walkthrough:**

```
prices = [1, 5, 3, 8]

Day 0: hold1Stock = -1, hold0Stock = 0
Day 1: hold1Stock = max(-1, 0-5) = -1,  hold0Stock = max(0, -1+5) = 4
Day 2: hold1Stock = max(-1, 4-3) = 1,   hold0Stock = max(4, -1+3) = 4
Day 3: hold1Stock = max(1, 4-8) = 1,    hold0Stock = max(4, 1+8) = 9

return hold0Stock = 9
```

### Solution (DP)

```csharp
public int MaxProfit(int[] prices) {
    int hold1Stock = -prices[0];
    int hold0Stock = 0;

    for (int i = 1; i < prices.Length; i++) {
        hold1Stock = Math.Max(hold1Stock, hold0Stock - prices[i]);
        hold0Stock = Math.Max(hold0Stock, hold1Stock + prices[i]);
    }

    return hold0Stock;
}
```

---

**When to use which:**
- Greedy: simpler, but only works for Stock II (unlimited transactions, no fees)
- DP: generalizes to Stock III, IV, with cooldown, with fees