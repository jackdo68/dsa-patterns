# Maths

### Base

Human system mainly use base 10 (decimal), so each position represents a power of 10

Example:

**352**

- 2 = ones place (10⁰)
- 5 = tens place (10¹)
- 3 = hundreds place (10²)

### Modular

Modulo (`%`) gives you the **remainder** after division. When you divide and have a remainder left over, that remainder is the modulo. Think of this as a “wrap around”, this becomes every useful in some algorithm to stop the numbers become so large, because the result is always smaller than the divisor. Some key characteristics

```typescript
(a + b) % n = ((a % n) + (b % n)) % n
(a × b) % n = ((a % n) × (b % n)) % n
(a - b) % n = ((a % n) - (b % n)) % n
```

### Greatest Common Divisor (GCD)

The **greatest common divisor** of two integers is the largest positive integer that divides both. For example `gcd(18, 12) = 6`.

**Euclidean algorithm** — the formula to remember:

```typescript
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

```typescript
// iterative — preferred (O(1) space)
function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

// recursive — equivalent (O(log min(a,b)) stack)
function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
```

**Complexity:** `O(log min(a, b))` — the Euclidean algorithm halves the larger value roughly every two steps (provably so via Fibonacci-style worst case).

### Logarithm

Log represents *"To what power must we raise a base to get a number?”* In other words, log is the inverse of the exponentiation.

- Many algorithms **split problems in half** (divide and conquer)
- Binary search, merge sort, binary trees all use this principle

```typescript
If 2^x = n, then log₂(n) = x
```

### Permutations & Factorial

- **Set**: A collection of distinct elements where order doesn't matter (e.g., {a, b})
- **Permutation**: A specific ordered arrangement of set elements where order matters (e.g., [a, b] and [b, a] are different)

Example with a set of 3 letters {a,b,c} if we try to form a permutation, the first position will have 3 choice, second position will have 2 choice, and third will have 1 choice. Altogether we have 3 * 2 * 1 = 3! = 6 permutations. See [Permutations pattern](notes/permutations-unique.md) for the backtracking implementation.

### Subsets

A subset is another set that contains all the element of the original set. In order to form a subset, for each element of the original set, we have 2 options

Include it or exclude it

So a set of `n` elements will have 2 ^ n subsets. See [Subset pattern](notes/subset.md) for the backtracking implementation. 

Some examples of this decision making are binary tree `O(logn)`. And the opposite of time complexity backtracking with `O(2^n)`

```typescript
                   {}
                 /    \
               {1}     {}
              /  \     /  \
          {1,2}  {1} {2}   {}
          /  \    / \  / \  / \
    {1,2,3}{1,2}{1,3}{1}{2,3}{2}{3}{}
```