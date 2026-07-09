---
title: "Bounded Concurrency Job Processor"
topic: "queue, concurrency, system design"
difficulty: "Medium"
frequency: "Medium"
---
### Question

Implement a `JobProcessor` that accepts jobs, queues them, and processes up to `concurrency` jobs in parallel. Each job has a lifecycle: `queued → processing → completed | failed`.

```csharp
enum JobStatus { Queued, Processing, Completed, Failed }

class JobProcessor<I, O> {
    public JobProcessor(Func<I, Task<O>> processFunc, int concurrency);
    public string Submit(I input);                          // returns jobId
    public (JobStatus Status, O? Result, string? Error) GetStatus(string jobId);
}
```

### Ideas

**Instinct 1: "process N at once, queue the rest" → bounded concurrency pattern.** This is the same shape as Node's `p-limit` library, or a thread pool. Maintain a counter of active jobs (`activeCount`). On submit, push to a queue and try to start work. Whenever a job finishes, pull the next one from the queue.

**Instinct 2: "track each job's state independently" → keyed map.** Submit returns a jobId; consumers ask for status later. Store each job's state in a `Map<jobId, Job>` so lookup is O(1). The queue itself only holds *which jobs* are next — it doesn't need to know their state.

**Instinct 3: "the dispatcher should be self-perpetuating."** When a job finishes, the `finally` callback decrements `activeCount` and tries to dispatch the next one. This way:
- A burst of submits triggers up to `concurrency` parallel starts.
- Each completion automatically pulls the next job.
- No external loop or polling needed.

**Instinct 4: "dispatch should always check capacity."** Both `submit` and `finally` call the same `dispatch` method. The method uses a `while` loop to fill all available slots in case multiple jobs are queued and we're starting from idle.

### Walkthrough

`new JobProcessor(processFn, 2)`:

```
submit(A) → jobs[A]={queued}, queue=[A], dispatch → activeCount=1, A processing
submit(B) → jobs[B]={queued}, queue=[B], dispatch → activeCount=2, B processing
submit(C) → jobs[C]={queued}, queue=[C], dispatch → activeCount=2 (full), wait

A finishes → jobs[A]={completed}, activeCount=1, dispatch → C starts, activeCount=2
B finishes → jobs[B]={completed}, activeCount=1, dispatch → queue empty, nothing to do
C finishes → jobs[C]={completed}, activeCount=0
```

### Solution

```csharp
enum JobStatus { Queued, Processing, Completed, Failed }

class Job<I, O> {
    public string Id = "";
    public I Input = default!;
    public JobStatus Status;
    public O? Result;
    public string? Error;
}

public class JobProcessor<I, O> {
    private readonly Func<I, Task<O>> processFunc;
    private readonly int concurrency;
    private readonly Dictionary<string, Job<I, O>> jobs = new();
    private readonly Queue<string> queue = new();
    private int activeCount = 0;
    private int jobCounter = 0;

    public JobProcessor(Func<I, Task<O>> processFunc, int concurrency = 3) {
        if (concurrency < 1) throw new ArgumentException("Concurrency must be >= 1");
        this.processFunc = processFunc;
        this.concurrency = concurrency;
    }

    public string Submit(I input) {
        string id = (++jobCounter).ToString();
        jobs[id] = new Job<I, O> { Id = id, Input = input, Status = JobStatus.Queued };
        queue.Enqueue(id);
        Dispatch();
        return id;
    }

    public (JobStatus Status, O? Result, string? Error) GetStatus(string jobId) {
        if (!jobs.TryGetValue(jobId, out var job)) throw new Exception($"Unknown job: {jobId}");
        return (job.Status, job.Result, job.Error);
    }

    private void Dispatch() {
        while (activeCount < concurrency && queue.Count > 0) {
            string id = queue.Dequeue();
            var job = jobs[id];
            job.Status = JobStatus.Processing;
            activeCount++;
            _ = RunJob(job); // fire-and-forget; RunJob re-dispatches when done
        }
    }

    private async Task RunJob(Job<I, O> job) {
        try {
            job.Result = await processFunc(job.Input);
            job.Status = JobStatus.Completed;
        } catch (Exception error) {
            job.Status = JobStatus.Failed;
            job.Error = error.Message;
        } finally {
            activeCount--;
            Dispatch();
        }
    }
}
```

**Time:** O(1) submit, O(1) status. Dispatching is O(min(concurrency, queueLength)).
**Space:** O(n) for queued and tracked jobs.

### Edge Cases

- **`concurrency < 1`** — throw in constructor; processing would never start.
- **`processFunc` hangs forever** — no timeout. Combine with `AbortController` + `Promise.race` to enforce per-job time limits.
- **Submit called from outside an event loop tick** — `dispatch()` is synchronous before the `.then`, so the first `concurrency` submits all start immediately. Subsequent submits queue.
- **Unknown jobId** — throw in `getStatus`; don't silently return undefined.
- **Memory leak** — completed jobs stay in `this.jobs` forever. Add a `clear(jobId)` or auto-evict after some time.
- **`processFunc` throws synchronously** (not async) — promise wrapping catches it, but only if you actually return a promise. If it throws before returning, the `.then` chain never starts. `Promise.resolve(this.processFunc(input)).then(...)` is safer.

### Optimisations

- **Per-job timeout with AbortController** — pass an `AbortSignal` into `processFunc`; reject after a deadline.
- **Priority queue** — replace the FIFO queue with a min-heap keyed by priority for "urgent jobs jump the line."
- **Dead letter queue** — track jobs that fail repeatedly and route them somewhere for inspection.
- **Graceful shutdown** — `stop()` method that finishes in-flight jobs and rejects new `submit` calls.
- **Event hooks** — emit `job:start`, `job:complete`, `job:fail` for observability.

### Related Patterns

- [Task Scheduling](/dsa-patterns/task-scheduling/) — same bounded-parallelism idea, applied to time slots
- [Rate Limiter](/dsa-patterns/rate-limiter/) — both use bounded resources and queuing; rate limiter caps over time, this caps in parallel
- **Producer-consumer** — `submit` produces, the dispatcher consumes; the queue is the buffer between them
