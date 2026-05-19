# Agent Loop (Tool-Calling State Machine)

Topic: state machine, iterative, system design

Difficulty: Medium

Interview Frequency: Low

### Question

You're building a simple agent. The agent calls a model with a list of messages. The model's response may contain a `toolCall` (e.g. `{ name: 'search', args: { query: '...' } }`). If it does, execute the tool, append the result to the message history, and call the model again. Repeat until the model returns a final response with no tool call, or you hit `maxIterations`.

```typescript
type ModelResponse = { content: string; toolCall?: { name: string; args: Record<string, any> } };
type Tool = (args: Record<string, any>) => Promise<unknown>;

async function runAgent(
  prompt: string,
  modelClient: { chat(messages: any[]): Promise<ModelResponse> },
  tools: Record<string, Tool>,
  options?: { maxIterations?: number }
): Promise<{ content: string; iterations: number }>;
```

### Ideas

**Instinct 1: "loop until a terminal state" → iterative state machine, not recursion.** Each iteration is a state transition: `call model → inspect response → maybe execute tool → loop or terminate`. Iteration (with an explicit counter) is cleaner than recursion here because:
- The depth is unbounded in principle — recursion would risk stack overflow.
- The "max iterations" guard is trivial to express as a loop bound.
- State (the message history) is naturally mutable across steps.

**Instinct 2: "always have a termination guarantee."** Two exit conditions:
- **Goal reached** — response has no `toolCall`. Return the content.
- **Bound reached** — hit `maxIterations`. Throw (or return a partial result, depending on requirements).

Without the iteration cap, a model that keeps calling tools forever would loop indefinitely. Always bound the search.

**Instinct 3: "errors in tools shouldn't always abort."** When a tool throws, you have two choices:
- **Send the error back to the model** — let it react and try something else (more robust agents).
- **Bail immediately** — fail fast (simpler, easier to debug).

The "send-back" approach is more capable but requires the model to handle error messages. Pick based on requirements.

**Instinct 4: "the message history IS the state."** Each iteration appends to it; the model sees the full transcript every call. This is the data structure choice that makes the whole loop work — it's how the model knows what just happened.

### Walkthrough

`runAgent("What's the weather in Sydney?", model, { getWeather })`:

```
iter 0: model.chat([{role: 'user', content: 'What's the weather in Sydney?'}])
        → {content: '', toolCall: {name: 'getWeather', args: {city: 'Sydney'}}}
        execute getWeather({city: 'Sydney'}) → '22°C, sunny'
        messages = [user, assistant+toolCall, tool result]

iter 1: model.chat(messages)
        → {content: 'It's 22°C and sunny in Sydney.'}    ← no toolCall
        return {content: '...', iterations: 2}
```

### Solution

```typescript
type ModelResponse = { content: string; toolCall?: { name: string; args: Record<string, any> } };
type Tool = (args: Record<string, any>) => Promise<unknown>;

async function runAgent(
  prompt: string,
  modelClient: { chat(messages: any[]): Promise<ModelResponse> },
  tools: Record<string, Tool>,
  options: { maxIterations?: number } = {}
): Promise<{ content: string; iterations: number }> {
  const { maxIterations = 10 } = options;
  const messages: any[] = [{ role: 'user', content: prompt }];

  for (let i = 0; i < maxIterations; i++) {
    const response = await modelClient.chat(messages);

    // Terminal state: no tool call → final answer
    if (!response.toolCall) {
      return { content: response.content, iterations: i + 1 };
    }

    // Record the assistant's tool request
    messages.push({
      role: 'assistant',
      content: response.content,
      toolCall: response.toolCall,
    });

    // Execute the tool (or capture error to feed back)
    const tool = tools[response.toolCall.name];
    if (!tool) {
      throw new Error(`Unknown tool: ${response.toolCall.name}`);
    }

    let result: unknown;
    try {
      result = await tool(response.toolCall.args);
    } catch (error: any) {
      result = { error: error.message };  // feed error back to model
    }

    messages.push({
      role: 'tool',
      name: response.toolCall.name,
      content: JSON.stringify(result),
    });
  }

  throw new Error(`Agent exceeded max iterations (${maxIterations})`);
}
```

**Time:** O(k) iterations, each dominated by the model call and tool execution (I/O bound).
**Space:** O(k) message history.

### Edge Cases

- **Unknown tool name** — throw immediately; the model shouldn't be inventing tools.
- **Tool returns `undefined`/`null`** — serialise as `"null"` via `JSON.stringify`; the model can interpret it.
- **Tool throws** — catch and pass back as `{ error: '...' }`. This lets the model try a different approach.
- **Model returns both `content` AND `toolCall`** — record the content but treat the tool call as the action. Don't return early just because there's content.
- **`maxIterations` reached** — throw with the count. Some implementations return the last `content` instead — pick based on whether partial results are useful.
- **Empty prompt** — pass through; the model will likely respond with a clarifying question.

### Optimisations

- **Parallel tool execution** — if the model can request multiple tools in one response (most modern model APIs support this), execute them in `Promise.all` instead of sequentially.
- **Combine with [Context Manager](context-manager.md)** — the message history grows unboundedly; prune old messages when it exceeds the model's context window.
- **Streaming the final response** — for UX, stream the last (no-tool) response token by token.
- **Tool schema validation** — validate `args` against a schema before calling; reject with a helpful error to the model instead of throwing.

### Related Patterns

- **State machine** — explicit `running → tool_call → tool_result → running | done` transitions.
- **Bounded iteration** — same guard pattern as [retry-with-backoff](retry-with-backoff.md) (`for i in 0..maxRetries`).
- [DFS Cycle Detection](dfs-cycle-detection-course-schedule-ii.md) — the "iteration cap" prevents infinite loops, similar to cycle detection in graphs.
