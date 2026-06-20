---
title: "Stream Processor (Buffer + Delimiter Scan)"
topic: "string, parsing, system design"
difficulty: "Medium"
frequency: "Low"
---
### Question

A streaming API returns a response as a sequence of chunks. Each chunk is a partial string. Implement a `StreamProcessor` that collects chunks, emits complete sentences as they form (delimiters: `.`, `!`, `?`), and flushes any leftover text when the stream ends.

```typescript
class StreamProcessor {
  constructor(onSentence: (sentence: string) => void);
  processChunk(chunk: string): void;
  flush(): void;
}

// Example:
// const p = new StreamProcessor(s => console.log(s));
// p.processChunk("Hello world. This is ");   // logs: "Hello world."
// p.processChunk("a test. How are ");        // logs: "This is a test."
// p.processChunk("you?");                    // logs: "How are you?"
// p.flush();                                  // nothing — buffer empty
```

### Ideas

**Instinct 1: "segments may span chunks → buffer accumulator."** A sentence can start in one chunk and end in another. So we can't process each chunk in isolation — we have to append to a *running buffer* and scan that buffer for boundaries. This is the exact pattern used in TCP byte-stream message framing.

**Instinct 2: "scan, emit, keep the tail."** After appending a chunk:
1. Scan the buffer for delimiters.
2. Emit each complete segment found.
3. Keep the *remainder* (text after the last delimiter) in the buffer for the next chunk.

The remainder is essential — it might become part of a future sentence when more data arrives.

**Instinct 3: "stream might end mid-sentence → explicit flush."** If the stream finishes but the last sentence has no delimiter, the consumer expects to see it anyway. A `flush()` method emits whatever's left and clears the buffer. Without it, that data would be silently dropped.

**Instinct 4: "stateful processing → encapsulate the buffer."** Each consumer needs its own buffer and its own callback. A class is the natural fit — the alternative (closures or external state) makes calling code awkward.

### Walkthrough

```
buffer = ""

processChunk("Hello world. This is ")
  buffer = "Hello world. This is "
  scan: found "." at index 11 → emit "Hello world."
  buffer = "This is "  (remainder after the last delimiter)

processChunk("a test. How are ")
  buffer = "This is a test. How are "
  scan: found "." at index 14 → emit "This is a test."
  buffer = "How are "

processChunk("you?")
  buffer = "How are you?"
  scan: found "?" at index 11 → emit "How are you?"
  buffer = ""

flush()
  buffer is empty → emit nothing
```

### Solution

```typescript
class StreamProcessor {
  private buffer = '';
  private onSentence: (sentence: string) => void;

  constructor(onSentence: (sentence: string) => void) {
    this.onSentence = onSentence;
  }

  processChunk(chunk: string): void {
    if (!chunk) return;
    this.buffer += chunk;

    const enders = /[.!?]/g;
    let match: RegExpExecArray | null;
    let lastIndex = 0;

    while ((match = enders.exec(this.buffer)) !== null) {
      const end = match.index + 1;        // include the delimiter
      const sentence = this.buffer.slice(lastIndex, end).trim();
      if (sentence) this.onSentence(sentence);
      lastIndex = end;
    }

    // Retain the tail (anything after the last delimiter)
    this.buffer = this.buffer.slice(lastIndex);
  }

  flush(): void {
    const remaining = this.buffer.trim();
    if (remaining) this.onSentence(remaining);
    this.buffer = '';
  }
}
```

**Time:** O(m) per chunk where m is buffer length. Across the lifetime of the stream, each character is scanned O(1) times.
**Space:** O(m) where m = max buffer length between delimiters.

### Edge Cases

- **Empty chunk** — early return; appending and scanning empty strings is wasted work.
- **Multiple sentences in one chunk** — the `while` loop emits each one in order.
- **Delimiter at chunk boundary** — handled by the buffer: the partial sentence carries across.
- **Abbreviations with periods** (e.g. "Dr. Smith arrived.") — false positives. The regex doesn't know "Dr." isn't a sentence end. Mention this as a known limitation; a real solution would use NLP-based sentence segmentation.
- **Unicode characters split across chunks** — UTF-16 surrogate pairs or multi-byte characters could be torn. JavaScript strings handle UTF-16 OK at the string level, but be careful with byte-level streams.
- **`onSentence` callback throws** — currently propagates to `processChunk`. Decide whether to swallow (continue processing) or kill the stream (re-throw). Wrap in try/catch if the former.
- **`flush()` called before any chunk** — buffer is `""`, nothing emitted. Safe.

### Optimisations

- **Smarter sentence detection** — use a small NLP library (e.g. `sentence-splitter`, `compromise`) to handle abbreviations, ellipses, quoted speech.
- **Backpressure** — if `onSentence` is slow, pause the source. Useful with Node `Transform` streams.
- **Token-by-token mode** — emit each token (word) for real-time display, with sentence boundaries as side info.
- **Limit buffer size** — if the buffer grows unbounded (e.g. never any delimiter), enforce a max size and force-emit.

### Related Patterns

- **Buffer parsing** — same shape as parsing length-prefixed messages from a byte stream
- [Sliding Window (Variable Size)](/dsa-patterns/variable-size-longest-substring-without-repeatin/) — the "tail" we keep is conceptually a window of "data not yet processed"
- **Streaming transform** — chunk-in, chunk-out processing without holding the whole input in memory
