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

```csharp
public int LeastIntervalGreedy(char[] tasks, int n) {
    // Count frequencies
    var frequencies = new Dictionary<char, int>();
    foreach (char task in tasks) {
        frequencies[task] = frequencies.GetValueOrDefault(task, 0) + 1;
    }

    // Find the maximum frequency
    int maxFreq = frequencies.Values.Max();

    // Count how many tasks have the maximum frequency
    int maxCount = 0;
    foreach (int freq in frequencies.Values) {
        if (freq == maxFreq) {
            maxCount++;
        }
    }

    // Build the formula in parts
    int numGaps = maxFreq - 1;                 // gaps between same tasks
    int gapLength = n + 1;                      // each gap length (including the task)
    int baseMinimum = numGaps * gapLength;     // minimum length without last occurrence
    int withMaxCount = baseMinimum + maxCount; // add slots for the max-frequency tasks

    // Return the larger of:
    // 1. Minimum slots needed with cooling periods
    // 2. Total number of tasks (when no idle slots are needed)
    return Math.Max(withMaxCount, tasks.Length);
}
```