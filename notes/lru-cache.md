# LRU Cache

Topic: linked list

Difficulty: Medium

Interview Frequency: High

### Question

[LeetCode 146 - LRU Cache](https://leetcode.com/problems/lru-cache/)

- *Design a data structure that follows the constraints of a [**Least Recently Used (LRU) cache**](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU).*
- *Implement the `LRUCache` class:*
- *`*LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.**
- *`*int get(int key)` Return the value of the `key` if the key exists, otherwise return `1`.**
- *`*void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.**
- *The functions `get` and `put` must each run in `O(1)` average time complexity.*

### Ideas

**Read the constraints first — they dictate the data structure.** The line that matters most is *"`get` and `put` must each run in `O(1)`."* Whenever a design problem demands `O(1)` for *several* operations that pull in different directions, that's the signal you'll need **two structures working together**, each covering what the other can't.

Break the requirements down and see what each one forces:

1. **"Look up a value by key in `O(1)`"** → this screams **hash map**. Nothing else gives constant-time keyed access. If this were the *only* requirement, a plain map would finish the problem.
2. **"Know which item is least recently used, and evict it in `O(1)`"** → a hash map has no notion of order, so it can't answer this. We need something that maintains a **recency ordering**: most-recently-used at one end, least-recently-used at the other.
3. **"Every access reorders things"** — a `get` or `put` makes an item the most-recent, so we must be able to **pluck a node out of the middle of that ordering and move it to the front, in `O(1)`.**

Requirement 3 is the one that rules out the obvious choices. Ask "what can move an element to the front in `O(1)`?":
- An **array/list** keeps order, but removing from the middle is `O(n)` (everything shifts). ❌
- A **singly linked list** can splice in `O(1)` *only if you already hold the previous node* — but to find the predecessor you'd walk from the head, which is `O(n)`. ❌
- A **doubly linked list** is the winner: each node carries a `prev` pointer, so given a node you can unlink it and reinsert it at the front in `O(1)` with no traversal. ✅

**So the combo is: hash map + doubly linked list.** They cover each other's blind spots:

| Need | Hash map | Doubly linked list |
| --- | --- | --- |
| Find a node by key fast | ✅ `O(1)` | ❌ would be `O(n)` |
| Maintain recency order | ❌ unordered | ✅ front = newest, back = oldest |
| Remove/move a node in `O(1)` | ❌ | ✅ via `prev`/`next` |

The crucial insight that makes them click together: **the hash map doesn't store values — it stores pointers to the list nodes.** That's what bridges them. `map.get(key)` hands you the *exact node* inside the list in `O(1)`, and because it's a doubly linked node you can immediately relink it — no searching the list at all. The map answers *"where is it?"*, the list answers *"how recent is it?"*.

**Why the dummy `head` and `tail` sentinels?** They're not part of the data — they're guards. With permanent placeholder nodes at both ends, every real node is *guaranteed* to have a non-null `prev` and `next`, so insert/remove never has to special-case "what if this is the first/last node?" or check for `null`. This removes a whole class of edge-case bugs. The newest item always sits at `head.next`; the LRU victim is always at `tail.prev`.

**Walk-through of the two operations:**

- **`get(key)`**: ask the map for the node. Miss → return `-1`. Hit → the act of accessing it makes it the most-recently-used, so **move it to the front** (`removeNode` then `addNode` right after `head`) and return its value. Both steps are pointer rewires → `O(1)`.
- **`put(key, value)`**:
  - *Key exists* → grab the node from the map, update its value, and move it to the front (it was just used).
  - *New key* → create a node, register it in the map, and add it at the front. Then check **capacity**: if we've overflowed, the least-recently-used node is sitting at `tail.prev` — pop it off the list **and** delete its key from the map. (This is why each node stores its own `key`: when evicting we only have the node, but we need its key to remove the matching map entry.)

**The reusable instinct:** when one structure can't satisfy all the `O(1)` requirements at once, **pair structures so each compensates for the other's weakness, and link them by storing references rather than copies.** A hash map gives you instant *access*; a linked list gives you instant *ordering and splicing*; storing list-node pointers in the map fuses the two into something that does both. This same "map of pointers into an ordered structure" pattern shows up in LFU cache, insert-delete-getRandom in `O(1)`, and many other design problems.

### Solution

```typescript
class DLNode {
  key: number;
  val: number;
  next: DLNode | null;
  prev: DLNode | null;
  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  head: DLNode;
  tail: DLNode;
  size: number;
  capacity: number;
  map: Map<number, DLNode>;

  constructor(capacity: number) {
    this.head = new DLNode(0, 0);
    this.tail = new DLNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.moveToFront(node);
    return node.val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      const node = this.map.get(key)!;
      node.val = value;
      this.moveToFront(node);
    } else {
      const newNode = new DLNode(key, value);
      this.map.set(key, newNode);
      this.addNode(newNode);
      this.size++;

      if (this.size > this.capacity) {
        const tail = this.popTail();
        this.map.delete(tail.key);
        this.size--;
      }
    }
  }

  private addNode(node: DLNode): void {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  private removeNode(node: DLNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToFront(node: DLNode): void {
    this.removeNode(node);
    this.addNode(node);
  }

  private popTail(): DLNode {
    const res = this.tail.prev!;
    this.removeNode(res);
    return res;
  }
}

```