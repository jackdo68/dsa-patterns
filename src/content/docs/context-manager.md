---
title: "Context Manager (Bounded Buffer with Pinned Head)"
topic: "queue, bounded buffer, sliding window, system design"
difficulty: "Medium"
frequency: "Medium"
---
### Question

You're building a chat application backed by a service with a fixed token budget of `maxTokens`. Each message has a `role` (system / user / assistant) and a known `tokens` count. Implement a `ContextManager` that:
- Always keeps the system message (it's pinned, never evicted)
- Evicts the **oldest** user/assistant messages first when adding a new message would exceed the budget

```typescript
type Message = { role: 'system' | 'user' | 'assistant'; content: string; tokens: number };

class ContextManager {
  constructor(maxTokens: number);
  setSystemMessage(message: Message): void;
  addMessage(message: Message): void;
  getMessages(): Message[];
}
```

### Ideas

**Instinct 1: "fixed budget, oldest goes first" → bounded FIFO queue.** This is the classic "running window" structure: append to the back, evict from the front. The token budget plays the role of the window size, but measured in *tokens* instead of *count*.

**Instinct 2: "one element must always stay" → pin it outside the queue.** The system message is structurally different — it's not part of the rolling history. Store it as its own field, not in the queue. That way the queue's "evict from front" logic doesn't have to special-case it.

**Instinct 3: "evict until under budget, not just once."** Adding a long message might require evicting several old ones. Loop the eviction until `currentTokens <= maxTokens`. Each individual eviction is O(1) (front of queue); the loop runs as many times as needed.

**Instinct 4: "single-message validation upfront."** If a single message is larger than the available budget (after pinning the system message), no amount of eviction can make room. Throw at the entry point — don't enter a state where the buffer is empty and we still can't fit.

### Walkthrough

`new ContextManager(50)`, system message takes 10 tokens.

```
setSystemMessage({tokens: 10})           total=10                  system=10
addMessage({tokens: 20, content: 'A'})   total=30   queue=[A]
addMessage({tokens: 15, content: 'B'})   total=45   queue=[A, B]
addMessage({tokens: 15, content: 'C'})   total=60 > 50 → evict A → total=40, queue=[B, C]
getMessages() → [system, B, C]
```

When `C` arrives, the running total would be 60. We evict `A` (oldest in queue), freeing 20 tokens → total drops to 40. Now we're under budget. `B` and `C` stay. The system message was never touched.

### Solution

```typescript
type Message = { role: 'system' | 'user' | 'assistant'; content: string; tokens: number };

class ContextManager {
  private maxTokens: number;
  private systemMessage: Message | null = null;
  private messages: Message[] = [];
  private currentTokens = 0;

  constructor(maxTokens: number) {
    this.maxTokens = maxTokens;
  }

  setSystemMessage(message: Message): void {
    if (message.tokens > this.maxTokens) {
      throw new Error('System message exceeds max token budget');
    }
    if (this.systemMessage) {
      this.currentTokens -= this.systemMessage.tokens;
    }
    this.systemMessage = message;
    this.currentTokens += message.tokens;
    this.evict();
  }

  addMessage(message: Message): void {
    const availableBudget = this.maxTokens - (this.systemMessage?.tokens ?? 0);
    if (message.tokens > availableBudget) {
      throw new Error('Single message exceeds available token budget');
    }
    this.messages.push(message);
    this.currentTokens += message.tokens;
    this.evict();
  }

  getMessages(): Message[] {
    return this.systemMessage ? [this.systemMessage, ...this.messages] : [...this.messages];
  }

  private evict(): void {
    while (this.currentTokens > this.maxTokens && this.messages.length > 0) {
      const removed = this.messages.shift()!;
      this.currentTokens -= removed.tokens;
    }
  }
}
```

**Time:** O(k) per `addMessage`, where k is the number of messages evicted (amortized O(1)). `shift()` is O(n) in JS — a real implementation would use a head index or a linked list for true O(1) eviction.
**Space:** O(n) for retained messages.

### Edge Cases

- **System message larger than `maxTokens`** — throw at `setSystemMessage`. There's no recovery.
- **Single message larger than available budget** — throw at `addMessage`. Even evicting everything won't help.
- **No system message set** — `getMessages()` should return just the user/assistant queue.
- **System message updated mid-conversation** — adjust `currentTokens` for the swap, then re-evict if the new system message is larger.
- **Adding a message that fits exactly** — `currentTokens === maxTokens` is fine; the eviction loop checks `>`.
- **Empty queue but over budget** — happens only if the system message alone exceeds the budget; protected by the constructor validation.

### Optimisations

- **Summarisation instead of eviction** — when the queue would evict, summarise old messages into a single shorter message. Preserves more context than dropping.
- **Priority-based eviction** — keep recent messages AND high-importance ones (e.g., tagged). Evict middle/low-priority oldest first.
- **Token counting integration** — use a real tokenizer (e.g., tiktoken) instead of trusting a `.tokens` field.
- **Use a head-index queue** — avoids `shift()`'s O(n) cost. Keep an integer pointing to the "logical front" of the array, increment instead of shifting, compact periodically.

### Related Patterns

- [Fixed-size sliding window (Find All Anagrams)](/dsa-patterns/fixed-size-find-all-anagrams-in-a-string/) — same "running window over a sequence" instinct
- [LRU Cache](/dsa-patterns/lru-cache/) — bounded-capacity store with an eviction policy (LRU vs FIFO)
- [Min Stack](/dsa-patterns/min-stack/) — auxiliary structure pinned alongside a primary structure
