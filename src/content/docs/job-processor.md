---
title: "Bounded Concurrency Job Processor"
topic: "queue, concurrency, system design"
difficulty: "Medium"
frequency: "Medium"
---
### Question

Implement a `JobProcessor` that accepts jobs, queues them, and processes up to `concurrency` jobs in parallel. Each job has a lifecycle: `queued → processing → completed | failed`.

```typescript
class JobProcessor<I, O> {
  constructor(processFunc: (input: I) => Promise<O>, concurrency: number);
  submit(input: I): string;                              // returns jobId
  getStatus(jobId: string): {
    status: 'queued' | 'processing' | 'completed' | 'failed';
    result?: O;
    error?: string;
  };
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

```typescript
type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

interface Job<I, O> {
  id: string;
  input: I;
  status: JobStatus;
  result?: O;
  error?: string;
}

class JobProcessor<I, O> {
  private processFunc: (input: I) => Promise<O>;
  private concurrency: number;
  private jobs = new Map<string, Job<I, O>>();
  private queue: string[] = [];
  private activeCount = 0;
  private jobCounter = 0;

  constructor(processFunc: (input: I) => Promise<O>, concurrency = 3) {
    if (concurrency < 1) throw new Error('Concurrency must be >= 1');
    this.processFunc = processFunc;
    this.concurrency = concurrency;
  }

  submit(input: I): string {
    const id = String(++this.jobCounter);
    this.jobs.set(id, { id, input, status: 'queued' });
    this.queue.push(id);
    this.dispatch();
    return id;
  }

  getStatus(jobId: string): { status: JobStatus; result?: O; error?: string } {
    const job = this.jobs.get(jobId);
    if (!job) throw new Error(`Unknown job: ${jobId}`);
    return { status: job.status, result: job.result, error: job.error };
  }

  private dispatch(): void {
    while (this.activeCount < this.concurrency && this.queue.length > 0) {
      const id = this.queue.shift()!;
      const job = this.jobs.get(id)!;
      job.status = 'processing';
      this.activeCount++;

      this.processFunc(job.input)
        .then((result) => {
          job.status = 'completed';
          job.result = result;
        })
        .catch((error: any) => {
          job.status = 'failed';
          job.error = error?.message ?? String(error);
        })
        .finally(() => {
          this.activeCount--;
          this.dispatch();
        });
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
