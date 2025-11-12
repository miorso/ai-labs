# Lab 04: Stream Text

## Overview

In this lab, you'll learn how to use `streamText()` to generate AI responses that stream in real-time, just like ChatGPT's interface. Instead of waiting for the entire response, you'll see text appear progressively as it's generated, creating a much better user experience.

## Learning Objectives

- Use `streamText()` for real-time text generation - [streamText Documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-text)
- Understand the difference between streaming and non-streaming responses
- Handle async streams using `for await` loops
- Display streaming text progressively in the terminal

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Import `streamText` from the `ai` package
2. Create a prompt that generates enough text to see the streaming effect
3. Call `streamText()` with your model and prompt, destructuring `textStream`
4. Use a `for await` loop to iterate over the text stream
5. Display each chunk using `process.stdout.write()` to see the streaming effect

## Expected Output

You should see text appear progressively in your terminal, word by word or phrase by phrase, just like watching ChatGPT respond:

```
Once upon a time, in a world where artificial intelligence had evolved...
```

The text will flow smoothly rather than appearing all at once, giving you real-time feedback as the model generates content.

## Key Concepts

### Why Streaming?

Streaming allows text to appear progressively as it's generated, rather than waiting for the complete response.

Benefits of streaming:

- **Better UX** - Users see immediate feedback instead of waiting
- **Perceived performance** - Feels faster even if total time is similar
- **Engagement** - Users stay engaged while content generates
- **Interruption** - Can stop generation early if needed

### How Streaming Works

When you call `streamText()`:

1. The request is sent to the AI model
2. The model starts generating tokens (words/pieces of text)
3. As each token is generated, it's immediately sent back to you
4. You receive chunks of text in real-time through an async stream
5. You display each chunk as it arrives

### Async Iteration with for await

JavaScript's `for await...of` loop handles async streams elegantly:

```typescript
for await (const chunk of textStream) {
  // Each chunk arrives as it's generated
  process.stdout.write(chunk);
}
```

This automatically:

- Waits for each chunk to arrive
- Processes it immediately
- Moves to the next chunk
- Completes when the stream ends

### process.stdout.write() vs console.log()

**Use `process.stdout.write()`** for streaming:

```typescript
process.stdout.write(chunk); // Writes without newline
```

**Don't use `console.log()`:**

```typescript
console.log(chunk); // Adds newline after each chunk
```

Using `console.log()` would break each chunk onto a new line, ruining the streaming effect.

## Real-World Use Cases

Streaming is essential for:

1. **Chat interfaces** - ChatGPT-style conversational UIs
2. **Content generation** - Writing assistants, blog post generators
3. **Code generation** - IDEs that generate code in real-time
4. **Translations** - Real-time translation interfaces
5. **Summaries** - Document summarization tools

Anywhere you want users to see progress instead of waiting!

## Experiments to Try

After completing the exercise, experiment with:

1. **Different prompts** - Try longer vs. shorter responses to see streaming differences
2. **Full stream** - Access detailed events (text-delta, reasoning, tool-calls) with `fullStream` - [Guide](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#fullstream-property)
3. **Stream callbacks** - Use `onChunk` to process events or `onFinish` to access final results - [Guide](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#onchunk-callback)
4. **Error handling** - Handle streaming errors gracefully with `onError` callback - [Guide](https://ai-sdk.dev/docs/ai-sdk-core/generating-text#onerror-callback)
5. **Abort streaming** - Stop generation early using AbortSignal - [API](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-text#abort-signal:~:text=retries.%20Default%3A%202.-,abortSignal,-%3F%3A)

## Troubleshooting

**Not seeing the streaming effect?**

- Make sure you're using `process.stdout.write()` not `console.log()`
- Check that your prompt generates enough text (at least a few sentences)
- Verify you're using `for await` to iterate over `textStream`
- Some models stream faster than others - try a longer prompt
