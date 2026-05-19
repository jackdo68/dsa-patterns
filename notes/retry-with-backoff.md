# Retry with Exponential Backoff

Topic: state machine, async, system design

Difficulty: Medium

Interview Frequency: Medium

### Question

Implement a `retryWithBackoff` function that retries a failed async operation up to `maxRetries` times with exponential backoff. Add optional jitter to avoid thundering herd. Only retry on transient errors (e.g. `429`, `500`, `503`) — never on client errors (`400`, `401`).

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    jitter?: boolean;
    retryableStatuses?: number[];
  }
): Promise<T>;

// Example:
// const result = await retryWithBackoff(() => callFlakyAPI(), {
//   maxRetries: 3,
//   baseDelayMs: 1000,
// });
```

### Ideas

**Instinct 1: "transient failure → wait, retry, but back off."** Retrying immediately makes things worse — if the server is overloaded, you pile on. Each retry should wait *longer* than the last. Exponential growth (`baseDelay * 2^attempt`) doubles the wait every time, giving the system time to recover.

**Instinct 2: "many clients retrying at the same time → thundering herd."** If a server returns `503` to a thousand clients at once, all thousand will retry at the same exact moment if they use the same fixed delay. **Jitter** (a random factor on top of the delay) spreads them out. Even just `delay * (0.5 + Math.random() * 0.5)` is enough.

**Instinct 3: "not all errors deserve retry."** A `400 Bad Request` won't get better by retrying — the request itself is broken. Retrying on permanent errors wastes time and burns the user's quota. Take a list of *retryable status codes* (or a predicate) and throw immediately on anything else.

**Instinct 4: "bound the wait."** Without a cap, attempt 10 with `baseDelay=1000` waits 17 minutes. Cap each delay with `maxDelayMs` so the backoff plateaus.

### Walkthrough

`baseDelay=1000ms`, `maxDelay=10_000ms`, `maxRetries=4`, jitter off:

```
attempt 0: try → fail (503)        → wait min(1000, 10_000) = 1000ms
attempt 1: try → fail (503)        → wait min(2000, 10_000) = 2000ms
attempt 2: try → fail (503)        → wait min(4000, 10_000) = 4000ms
attempt 3: try → fail (503)        → wait min(8000, 10_000) = 8000ms
attempt 4: try → succeed → return
```

Total wait: 15 seconds across 5 attempts. With `maxDelay=10_000`, attempt 5 would have plateaued at 10s instead of 16s.

### Solution

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelayMs?: number;
    maxDelayMs?: number;
    jitter?: boolean;
    retryableStatuses?: number[];
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelayMs = 1000,
    maxDelayMs = 30_000,
    jitter = true,
    retryableStatuses = [429, 500, 502, 503, 504],
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      const isRetryable = retryableStatuses.includes(error?.status);
      if (!isRetryable || attempt === maxRetries) throw error;

      let delay = Math.min(baseDelayMs * 2 ** attempt, maxDelayMs);
      if (jitter) delay *= 0.5 + Math.random() * 0.5;

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}
```

**Time:** dominated by sleeps. With `maxRetries=N`, worst case wait is `O(baseDelay * 2^N)` bounded by `maxDelayMs * N`.
**Space:** O(1).

### Edge Cases

- **Non-retryable errors throw immediately** — no point burning attempts on `400/401`.
- **`maxRetries=0`** — try once, never retry. Useful for "best-effort" calls.
- **Function hangs forever** — no timeout per attempt. Combine with `AbortController` or `Promise.race` for real systems.
- **`Retry-After` header (429 responses)** — servers can tell you exactly how long to wait. The clean version should respect it instead of calculating your own delay.
- **Non-Error thrown values** — `fn` might throw a string or `undefined`. Treat them as unknown failures; don't try to access `.status` without optional chaining.
- **All retries exhausted** — throw the *last* error, not a generic "max retries reached" — preserves the diagnostic info.

### Optimisations

- **Respect `Retry-After`** — when present on a 429, use it instead of computed backoff.
- **AbortController for per-attempt timeout** — kill an attempt that's hanging instead of waiting forever.
- **Circuit breaker** — if failure rate stays above some threshold, stop retrying entirely for a cooldown period (saves time, signals downstream that the service is down).
- **Decorrelated jitter** — AWS's recommended formula is `random_between(baseDelay, previousDelay * 3)`. Smoother distribution than the multiplicative jitter above.

### Related Patterns

- **State machine** — each attempt is a state transition: `pending → success | retryable_fail → wait → pending` or `pending → permanent_fail → throw`.
- **Exponential growth** — same math as binary doubling, useful in geometric series problems.
