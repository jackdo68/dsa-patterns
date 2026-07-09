---
title: "Maths"
---
### Base

Human system mainly use base 10 (decimal), so each position represents a power of 10

Example:

**352**

- 2 = ones place (10⁰)
- 5 = tens place (10¹)
- 3 = hundreds place (10²)

**Binary (base 2)** works the same way, but each position is a power of 2 instead of 10:

**`1101` (binary)**

- 1 = 1s place (2⁰) → 1
- 0 = 2s place (2¹) → 0
- 1 = 4s place (2²) → 4
- 1 = 8s place (2³) → 8

Total: 1 + 0 + 4 + 8 = **13** in decimal.

#### Decimal → Binary

**Intuition:** repeatedly divide by 2. Each remainder is the next binary digit, **from least significant to most**. The quotient becomes the next number to divide. Stop when the quotient hits 0. Reverse the collected remainders.

Trace `13`:

| step | n | n % 2 (digit) | n / 2 |
| :---: | :---: | :---: | :---: |
| 1 | 13 | 1 | 6 |
| 2 | 6 | 0 | 3 |
| 3 | 3 | 1 | 1 |
| 4 | 1 | 1 | 0 |

Digits collected: `1, 0, 1, 1` (LSB → MSB). Reverse: `1101`. ✓

**Why it works:** the remainder `n % 2` is literally the value of the 1s-place bit. Dividing by 2 right-shifts the number, exposing the next bit as the new 1s-place. Each iteration peels off one bit from the bottom.

```csharp
// Built-in (preferred)
string binary = Convert.ToString(n, 2);   // "1101"

// Manual implementation — useful for non-power-of-2 bases or building intuition
public string ToBinary(int n) {
    if (n == 0) return "0";
    var bits = new List<char>();
    while (n > 0) {
        bits.Add((char)('0' + n % 2));
        n /= 2;
    }
    bits.Reverse();
    return new string(bits.ToArray());
}
```

#### Binary → Decimal

**Intuition:** walk the binary digits **left to right** and accumulate `result = result * 2 + digit`. This is the same recipe as parsing a decimal string into an integer, just with base 2 instead of base 10.

Trace `1101`:

| step | digit | result before | result after |
| :---: | :---: | :---: | :---: |
| 1 | 1 | 0 | 0×2 + 1 = 1 |
| 2 | 1 | 1 | 1×2 + 1 = 3 |
| 3 | 0 | 3 | 3×2 + 0 = 6 |
| 4 | 1 | 6 | 6×2 + 1 = **13** ✓ |

**Why it works:** at each step you shift the accumulated value left by one bit (multiply by 2), then add the new bit. After processing the rightmost digit, the accumulator equals the sum `bᵢ · 2ⁱ` for all positions `i`. No explicit powers needed — the shifts do the work.

```csharp
// Built-in (preferred)
int n = Convert.ToInt32("1101", 2);    // 13

// Manual implementation
public int FromBinary(string s) {
    int result = 0;
    foreach (char ch in s) {
        result = result * 2 + (ch == '1' ? 1 : 0);
    }
    return result;
}
```

#### Generalization to any base

The same recipes work for any base `b`:

- **Decimal → base b:** divide by `b`, collect remainders, reverse.
- **Base b → decimal:** walk digits left-to-right, `result = result * b + digit`.

This is how problems like [Excel Sheet Column Title / Number](https://leetcode.com/problems/excel-sheet-column-title/) (base 26, bijective) reduce to standard base conversion with an offset.

### Modular

Modulo (`%`) gives you the **remainder** after division. When you divide and have a remainder left over, that remainder is the modulo. Think of this as a “wrap around”, this becomes every useful in some algorithm to stop the numbers become so large, because the result is always smaller than the divisor. Some key characteristics

```
(a + b) % n = ((a % n) + (b % n)) % n
(a × b) % n = ((a % n) × (b % n)) % n
(a - b) % n = ((a % n) - (b % n)) % n
```

### Greatest Common Divisor (GCD)

The **greatest common divisor** of two integers is the largest positive integer that divides both. For example `gcd(18, 12) = 6`.

**Euclidean algorithm** — the formula to remember:

```
gcd(a, 0) = a
gcd(a, b) = gcd(b, a % b)   // when b > 0
```

**Why it works:** any number `d` that divides both `a` and `b` also divides their remainder `a % b` (because `a = q·b + r`, so if `d | a` and `d | b`, then `d | r`). So the set of common divisors of `(a, b)` is identical to the set of common divisors of `(b, a % b)`. Replacing the pair with the smaller pair preserves the answer, and `b` strictly shrinks each step until it hits `0` — at which point the surviving number is the GCD.

**Triggers — reach for GCD when you see:**

- "Reduce a fraction" → divide both numerator and denominator by `gcd`
- "Insert / find common factor between two numbers"
- "How many evenly-spaced X fit in Y"
- "LCM" — since `lcm(a, b) = (a * b) / gcd(a, b)`
- Anything involving divisibility, ratios, or simplification

**Implementation:**

```csharp
// iterative — preferred (O(1) space)
public int Gcd(int a, int b) {
    while (b != 0) {
        (a, b) = (b, a % b);
    }
    return a;
}

// recursive — equivalent (O(log min(a,b)) stack)
public int GcdRecursive(int a, int b) {
    return b == 0 ? a : GcdRecursive(b, a % b);
}
```

**Complexity:** `O(log min(a, b))` — the Euclidean algorithm halves the larger value roughly every two steps (provably so via Fibonacci-style worst case).

### Logarithm

Log represents *"To what power must we raise a base to get a number?”* In other words, log is the inverse of the exponentiation.

- Many algorithms **split problems in half** (divide and conquer)
- Binary search, merge sort, binary trees all use this principle

```
If 2^x = n, then log₂(n) = x
```

### Permutations & Factorial

- **Set**: A collection of distinct elements where order doesn't matter (e.g., {a, b})
- **Permutation**: A specific ordered arrangement of set elements where order matters (e.g., [a, b] and [b, a] are different)

Example with a set of 3 letters {a,b,c} if we try to form a permutation, the first position will have 3 choice, second position will have 2 choice, and third will have 1 choice. Altogether we have 3 * 2 * 1 = 3! = 6 permutations. See [Permutations pattern](/dsa-patterns/permutations-unique/) for the backtracking implementation.

### Subsets

A subset is another set that contains all the element of the original set. In order to form a subset, for each element of the original set, we have 2 options

Include it or exclude it

So a set of `n` elements will have 2 ^ n subsets. See [Subset pattern](/dsa-patterns/subset/) for the backtracking implementation. 

Some examples of this decision making are binary tree `O(logn)`. And the opposite of time complexity backtracking with `O(2^n)`

```
                   {}
                 /    \
               {1}     {}
              /  \     /  \
          {1,2}  {1} {2}   {}
          /  \    / \  / \  / \
    {1,2,3}{1,2}{1,3}{1}{2,3}{2}{3}{}
```