# Daily Temperatures

Topic: array, stack, monotonic stack

Difficulty: Medium

Interview Frequency: Medium

### Question

[LeetCode 739 - Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)

*Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day with a warmer temperature, keep `answer[i] == 0`.*
### Ideas

**Instinct: "next greater element" → monotonic stack.** Any time the problem asks "for each element, find the next one that is greater," that's the signal. The brute force scans forward from every element — O(n²). The monotonic stack does it in O(n) by flipping the direction: instead of each element searching for its answer, each element *delivers* answers to previous elements that were waiting.

**Instinct: defer, then resolve.** When you see a day, you don't know yet when a warmer day will come. So you park it on the stack and wait. When a warmer day arrives, it resolves every cooler day still waiting on the stack — pop them all and record the distance.

**Why store indices, not temperatures?** Because the answer is a distance (`i - prevIndex`), not a value. You need to know *where* the waiting day was, not just how warm it was.

**Why the stack stays in decreasing order (monotonic)?** You only push a day when the current temperature is cooler than the top. If it's warmer, you pop first. So the stack is always warmest-at-bottom to coolest-at-top. A hot day peels off all the cooler days above it in one sweep.

**Walkthrough** `[73, 74, 75, 71, 69, 72, 76, 73]`:

```
i=0 (73): nothing waiting, push 0.            stack: [0(73)]
i=1 (74): warmer than 73 → resolve day 0, answer[0]=1. Push 1.
                                              stack: [1(74)]
i=2 (75): warmer than 74 → resolve day 1, answer[1]=1. Push 2.
                                              stack: [2(75)]
i=3 (71): cooler → just wait. Push 3.         stack: [2(75), 3(71)]
i=4 (69): cooler → just wait. Push 4.         stack: [2(75), 3(71), 4(69)]
i=5 (72): warmer than 69 → resolve day 4, answer[4]=1.
          warmer than 71 → resolve day 3, answer[3]=2.
          cooler than 75 → stop. Push 5.      stack: [2(75), 5(72)]
i=6 (76): warmer than 72 → resolve day 5, answer[5]=1.
          warmer than 75 → resolve day 2, answer[2]=4.
          stack empty → stop. Push 6.         stack: [6(76)]
i=7 (73): cooler → just wait. Push 7.         stack: [6(76), 7(73)]
```

Days 6 and 7 never got resolved → `answer` stays 0 for them.
Result: `[1, 1, 4, 2, 1, 1, 0, 0]`

### Solution

```typescript
function dailyTemperatures(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer: number[] = new Array(n).fill(0);
  const stack: number[] = []; // stores indices

  for (let i = 0; i < n; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const prevIndex = stack.pop()!;
      answer[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return answer;
}
```
