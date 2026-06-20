---
title: "Task Scheduling"
topic: "greedy"
difficulty: "Medium"
frequency: "Medium"
---
### Question

[LeetCode 621 - Task Scheduler](https://leetcode.com/problems/task-scheduler/)

*You are given an array of CPU `tasks`, each labeled with a letter from A to Z, and a number `n`. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of **at least** `n` intervals between two tasks with the same label.*

*Return the **minimum** number of CPU intervals required to complete all tasks.*

*Example 1:*

***Input:** tasks = ["A","A","A","B","B","B"], n = 2*

***Output:** 8*

***Explanation:** A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.*

*After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.*
### Solution

```typescript
function leastIntervalGreedy(tasks: string[], n: number): number {
  // Count frequencies using Map
  const frequencies = new Map<string, number>();
  for (const task of tasks) {
    frequencies.set(task, (frequencies.get(task) || 0) + 1);
  }

  // Find the maximum frequency
  const maxFreq = Math.max(...frequencies.values());

  // Count how many tasks have the maximum frequency
  let maxCount = 0;
  for (const freq of frequencies.values()) {
    if (freq === maxFreq) {
      maxCount++;
    }
  }

  // Calculate parts of the formula separately
  const numGaps = maxFreq - 1; // Number of gaps between same tasks
  const gapLength = n + 1; // Length of each gap (including the task)
  const baseMinimum = numGaps * gapLength; // Minimum length without last occurrence
  const withMaxCount = baseMinimum + maxCount; // Add slots for tasks with max frequency

  // Return the larger of:
  // 1. Minimum slots needed with cooling periods
  // 2. Total number of tasks (when no idle slots needed)
  return Math.max(withMaxCount, tasks.length);
}
```