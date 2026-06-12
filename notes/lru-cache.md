# LRU Cache

Topic: linked list

Difficulty: Medium

Interview Frequency: High

### Question

[LeetCode 146 - LRU Cache](https://leetcode.com/problems/lru-cache/)

- _Design a data structure that follows the constraints of a [**Least Recently Used (LRU) cache**](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)._
- _Implement the `LRUCache` class:_
- *`*LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.\*\*
- *`*int get(int key)` Return the value of the `key` if the key exists, otherwise return `1`.\*\*
- *`*void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.\*\*
- _The functions `get` and `put` must each run in `O(1)` average time complexity._

### Ideas

**Read the constraints first — they dictate the data structure.** The line that matters most is _"`get` and `put` must each run in `O(1)`."_ Whenever a design problem demands `O(1)` for _several_ operations that pull in different directions, that's the signal you'll need **two structures working together**, each covering what the other can't.

Break the requirements down and see what each one forces:

1. **"Look up a value by key in `O(1)`"** → this screams **hash map**. Nothing else gives constant-time keyed access. If this were the _only_ requirement, a plain map would finish the problem.
2. **"Know which item is least recently used, and evict it in `O(1)`"** → a hash map has no notion of order, so it can't answer this. We need something that maintains a **recency ordering**: most-recently-used at one end, least-recently-used at the other.
3. **"Every access reorders things"** — a `get` or `put` makes an item the most-recent, so we must be able to **pluck a node out of the middle of that ordering and move it to the front, in `O(1)`.**

Requirement 3 is the one that rules out the obvious choices. Ask "what can move an element to the front in `O(1)`?":

- An **array/list** keeps order, but removing from the middle is `O(n)` (everything shifts). ❌
- A **singly linked list** can splice in `O(1)` _only if you already hold the previous node_ — but to find the predecessor you'd walk from the head, which is `O(n)`. ❌
- A **doubly linked list** is the winner: each node carries a `prev` pointer, so given a node you can unlink it and reinsert it at the front in `O(1)` with no traversal. ✅

**So the combo is: hash map + doubly linked list.** They cover each other's blind spots:

| Need                         | Hash map     | Doubly linked list               |
| ---------------------------- | ------------ | -------------------------------- |
| Find a node by key fast      | ✅ `O(1)`    | ❌ would be `O(n)`               |
| Maintain recency order       | ❌ unordered | ✅ front = newest, back = oldest |
| Remove/move a node in `O(1)` | ❌           | ✅ via `prev`/`next`             |

The crucial insight that makes them click together: **the hash map doesn't store values — it stores pointers to the list nodes.** That's what bridges them. `map.get(key)` hands you the _exact node_ inside the list in `O(1)`, and because it's a doubly linked node you can immediately relink it — no searching the list at all. The map answers _"where is it?"_, the list answers _"how recent is it?"_.

**Why the dummy `head` and `tail` sentinels?** They're not part of the data — they're guards. With permanent placeholder nodes at both ends, every real node is _guaranteed_ to have a non-null `prev` and `next`, so insert/remove never has to special-case "what if this is the first/last node?" or check for `null`. This removes a whole class of edge-case bugs. The newest item always sits at `head.next`; the LRU victim is always at `tail.prev`.

**Walk-through of the two operations:**

- **`get(key)`**: ask the map for the node. Miss → return `-1`. Hit → the act of accessing it makes it the most-recently-used, so **move it to the front** (`removeNode` then `addNode` right after `head`) and return its value. Both steps are pointer rewires → `O(1)`.
- **`put(key, value)`**:
  - _Key exists_ → grab the node from the map, update its value, and move it to the front (it was just used).
  - _New key_ → create a node, register it in the map, and add it at the front. Then check **capacity**: if we've overflowed, the least-recently-used node is sitting at `tail.prev` — pop it off the list **and** delete its key from the map. (This is why each node stores its own `key`: when evicting we only have the node, but we need its key to remove the matching map entry.)

**The reusable instinct:** when one structure can't satisfy all the `O(1)` requirements at once, **pair structures so each compensates for the other's weakness, and link them by storing references rather than copies.** A hash map gives you instant _access_; a linked list gives you instant _ordering and splicing_; storing list-node pointers in the map fuses the two into something that does both. This same "map of pointers into an ordered structure" pattern shows up in LFU cache, insert-delete-getRandom in `O(1)`, and many other design problems.

### Solution

```typescript
class _Node {
  value: number;
  key: number;
  next: _Node | null;
  prev: _Node | null;
  constructor(key: number, value: number) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  capacity: number;
  map: Map<number, _Node>;
  size: number;
  head: _Node; // pointer to the front
  tail: _Node; // pointer to the back
  constructor(cap: number) {
    this.capacity = cap;
    this.map = new Map();
    this.size = 0;
    this.head = new _Node(-1, -1);
    this.tail = new _Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.remove(node);
    this.moveToFront(node);
    return node.value;
  }

  private remove(node: _Node) {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
    node.prev = null;
    node.next = null;
  }

  private moveToFront(node: _Node) {
    const front = this.head.next!;
    // node will become new front
    this.head.next = node;
    node.prev = this.head;
    front.prev = node;
    node.next = front;
  }

  put(key: number, value: number): void {
    let updatedNode: _Node | null = null;
    if (this.map.has(key)) {
      // existing
      updatedNode = this.map.get(key)!;
      updatedNode.value = value;
      // remove from current position
      this.remove(updatedNode);
      // move to the front
      this.moveToFront(updatedNode);
    } else {
      // new
      updatedNode = new _Node(key, value);
      // add to map
      this.map.set(key, updatedNode);
      // add to front
      this.moveToFront(updatedNode);
      this.size++;
      if (this.size > this.capacity) {
        const toRemove = this.tail.prev!;
        this.remove(toRemove);
        this.map.delete(toRemove.key);
        this.size--;
      }
    }
  }
}
```
