---
title: "Find Median from Data Stream"
topic: "heap"
difficulty: "Hard"
frequency: "Medium"
---
### **Question**

[LeetCode 295 - Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/)

*The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.*

- *For example, for arr = [2,3,4], the median is 3.*
- *For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.*

*Implement the MedianFinder class:*

- *MedianFinder() initializes the MedianFinder object.*
- *void addNum(int num) adds the integer num from the data stream to the data structure.*
- *double findMedian() returns the median of all elements so far. Answers within 105 of the actual answer will be accepted.*

### Ideas

- In order to find the median of the numbers, we divide the list into 2 sets, the bigger set and the smaller set, we keep them balance
- If the total numbers is even, both set has same size, the median will be the mean of the biggest of smaller set and the smallest of the bigger set
- If the total numbers is odd, keep the smaller set larger by 1, the median is the largest of the smaller set

addNumber Time Complexity: O(log n)

- The method consists of these operations:
    1. Pushing to either maxHeap or minHeap: O(log n)
    2. Balancing operation which includes:
        - Pop from one heap: O(log n)
        - Push to other heap: O(log n)

findMedian Time Complexity: O(1)

- Only performs:
    1. Size comparison: O(1)
    2. Peek operations on heaps: O(1)
    3. Basic arithmetic: O(1)

### Solution

```typescript
class MedianFinder {
  minHeap: _MinHeap;
  maxHeap: _MinHeap;
  constructor() {
    this.minHeap = new _MinHeap();
    this.maxHeap = new _MinHeap();
  }

  // keep both set either even in size or the max heap greater than 1
  private balance(): void {
    if (this.maxHeap.size() < this.minHeap.size()) {
      this.maxHeap.push(-this.minHeap.pop()!);
    }
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(-this.maxHeap.pop()!);
    }
  }

  addNum(num: number): void {
    if (this.maxHeap.size() === 0 || num <= -this.maxHeap.peak()) {
      this.maxHeap.push(-num);
    } else {
      this.minHeap.push(num);
    }
    this.balance();
  }

  findMedian(): number {
    if (this.maxHeap.size() === this.minHeap.size()) {
      return (-this.maxHeap.peak() + this.minHeap.peak()) / 2;
    } else {
      return -this.maxHeap.peak();
    }
  }
}
```