# Rate Limiter

Topic: sliding window, queue, system design

Difficulty: Medium

Interview Frequency: Medium

### Question

Design a `RateLimiter` class that allows at most `maxRequests` requests per `windowMs` milliseconds. Each call to `allowRequest()` returns `true` if the request is permitted, `false` if the limit has been reached.

```typescript
class RateLimiter {
  constructor(maxRequests: number, windowMs: number);
  allowRequest(): boolean;
}

// Example:
// const limiter = new RateLimiter(5, 60_000); // 5 requests per minute
// limiter.allowRequest(); // true
// ... after 5 calls within 60s ...
// limiter.allowRequest(); // false
```

### Ideas

**Instinct 1: "limit events over a moving time range" → sliding window.** You don't need to remember every request you've ever seen — only the ones still inside the current window. As time advances, old requests fall out and become irrelevant. That's the sliding window pattern applied to time instead of array indices.

**Instinct 2: "what's the oldest item I might need to evict?" → queue.** A queue (FIFO) is the right structure because:
- Newest requests append to the back (`push`)
- Oldest requests fall off the front when they age out (`shift`)
- We never need random access — just "what's at the front?" and "is it still in the window?"

**Instinct 3: "evict first, then decide."** On every call:
1. Drop timestamps that are outside the window (older than `now - windowMs`).
2. *Then* check if there's room for one more.
3. If yes, record the new timestamp and allow.

Doing the eviction before the check is what makes the algorithm "sliding" — the window automatically tracks "now" because we update it on every call.

### Walkthrough

`new RateLimiter(3, 1000)` — max 3 requests per 1 second.

```
t=100ms:  allowRequest() → queue=[],            evict → still [],         len<3 → push,   queue=[100],         return true
t=200ms:  allowRequest() → queue=[100],         evict → still [100],      len<3 → push,   queue=[100, 200],    return true
t=300ms:  allowRequest() → queue=[100, 200],    evict → still [100, 200], len<3 → push,   queue=[100, 200, 300], return true
t=400ms:  allowRequest() → queue=[100,200,300], evict → still [100,200,300], len=3 → reject, return false
t=1150ms: allowRequest() → queue=[100,200,300], evict (drop ≤ 150ms) → [200, 300], len<3 → push, queue=[200,300,1150], return true
```

Notice the eviction at `t=1150ms` drops the timestamp `100` because it's outside `[150, 1150]`. That's the sliding window doing its job.

### Solution

```typescript
class RateLimiter {
  private maxRequests: number;
  private windowMs: number;
  private timestamps: number[] = [];

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  allowRequest(): boolean {
    const now = Date.now();
    const cutoff = now - this.windowMs;

    // Evict timestamps outside the window
    while (this.timestamps.length > 0 && this.timestamps[0] < cutoff) {
      this.timestamps.shift();
    }

    if (this.timestamps.length < this.maxRequests) {
      this.timestamps.push(now);
      return true;
    }
    return false;
  }
}
```

**Time:** O(n) worst case per call (during eviction burst), O(1) amortized — every timestamp is added once and removed once across the lifetime of the limiter.
**Space:** O(maxRequests) — the queue never grows beyond the limit (anything beyond is rejected, not stored).

### Edge Cases

- **Two requests at the exact same millisecond** — both get the same `now`; the queue accepts duplicates. This is correct because the spec is "at most N in a window," not "distinct timestamps."
- **`windowMs` is 0 or negative** — should validate in the constructor (throw `Error`). With 0, every request would be rejected (cutoff equals now, so the new timestamp is immediately considered "outside the window" on the next call).
- **Long idle period** — the queue grows large if the limiter is hammered then sits idle; the first call after the gap pays O(n) to drain. The amortized cost stays O(1), but a single call can be slow.
- **Boundary semantics** — should a request *exactly* at `now - windowMs` count as "inside" or "outside"? The code uses `<` (strict), which means requests exactly on the boundary are evicted. Either choice is defensible — just be explicit.

### Optimisations

- **Circular buffer instead of array** — `shift()` is O(n) in JavaScript. A ring buffer of size `maxRequests` gives true O(1) per call with no array reindexing.
- **Token bucket variant** — smoother rate limiting that allows short bursts. Refills tokens at a constant rate instead of using a strict count over a window.
- **Distributed rate limiting** — for multi-server scenarios, move the queue to Redis (sliding window log) or use a counter with bucket boundaries (less accurate but cheaper).

### Related Patterns

- [Fixed-size sliding window (Find All Anagrams)](fixed-size-find-all-anagrams-in-a-string.md) — same "window over a sequence" pattern, applied to substring matching
- [Variable-size sliding window (Longest Substring)](variable-size-longest-substring-without-repeatin.md) — when the window size depends on content, not a fixed bound
- [Monotonic Deque](monotonic-deque.md) — useful when you also need min/max queries over the window
