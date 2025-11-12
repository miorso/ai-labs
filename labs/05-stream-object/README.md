# Lab 05: Stream Structured Objects

## Overview

In this lab, you'll learn how to use `streamObject()` to generate structured data that streams in real-time. This combines the benefits of Lab 03's structured outputs with Lab 04's streaming experience - you'll see objects build progressively as the AI generates each field.

## Learning Objectives

- Use `streamObject()` for real-time structured data generation - [streamObject Documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-core/stream-object)
- Combine Zod schemas with streaming for type-safe progressive updates - [Zod Documentation](https://zod.dev)
- Handle partial objects as they're being generated
- Display streaming structured data effectively in the terminal

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Import `streamObject` from the `ai` package
2. Import `z` from Zod
3. Create a Zod schema for a D&D campaign with nested objects, arrays, and enums
4. Call `streamObject()` with your model, prompt, and schema, destructuring `partialObjectStream`
5. Use a `for await` loop to iterate over the partial object stream
6. Clear the console and display each partial object as JSON to see the streaming effect

## Expected Output

You should see the object build progressively in your terminal. The screen will refresh as new fields are added:

```json
{
  "campaign": {
    "title": "The Shadow of the Dragon Cult"
  }
}
```

Then:

```json
{
  "campaign": {
    "title": "The Shadow of the Dragon Cult",
    "setting": "A medieval fantasy kingdom under threat",
    "difficulty": "medium",
    "characters": [
      {
        "name": "Theron Brightblade",
        "class": "Paladin",
        "level": 5,
        "backstory": "A noble knight seeking redemption"
      }
    ]
  }
}
```

And so on, until the complete D&D campaign with all characters, enemies, and plot is generated.

## Key Concepts

### Why Stream Objects?

Streaming structured objects provides the best of both worlds:

Benefits:

- **Progressive feedback** - Users see the object building in real-time
- **Type safety** - Final object is validated against your Zod schema
- **Better UX** - No waiting for complex structured data to complete

### How Streaming Objects Works

When you call `streamObject()`:

1. The request is sent to the AI model with your Zod schema
2. The model starts generating structured data field by field
3. As each field or array item is generated, a partial object is sent back
4. You receive incremental updates through an async stream
5. Each partial object contains all fields generated so far
6. The final object matches your complete Zod schema

### Partial Objects vs Complete Objects

**generateObject (Lab 03)** - Wait for everything:

```typescript
// User waits...
// Then receives: { name: "...", age: 28, hobbies: [...] }
```

**streamObject (Lab 05)** - Progressive updates:

```typescript
// First: { name: "..." }
// Then: { name: "...", age: 28 }
// Then: { name: "...", age: 28, hobbies: ["..."] }
// Finally: { name: "...", age: 28, hobbies: ["...", "...", "..."] }
```

### Displaying Partial Objects

Use `console.clear()` + `JSON.stringify()` to show updates:

```typescript
for await (const partialObject of partialObjectStream) {
  console.clear();
  console.log(JSON.stringify(partialObject, null, 2));
}
```

This creates a smooth "updating" effect where you see the object grow.

## When to Use streamObject vs generateObject

Use `streamObject()` when:

- **Generation takes noticeable time** (several seconds or more)
- **You want to show progress** instead of a loading spinner
- **Users benefit from seeing the structure build**

Use `generateObject()` when:

- Generation is quick (under 2 seconds)
- You need the complete object before doing anything with it
- Showing partial data would be confusing to users

**The key insight:** `streamObject()` is primarily a UX enhancement for long-running generations. It doesn't change what you can do with the data - just when users see it.

## Experiments to Try

After completing the exercise, experiment with:

1. **Different schemas** - Try simpler or more complex nested structures
2. **Stream arrays** - Generate arrays by using `output: 'array'` parameter to see items appear one by one - [Example](https://ai-sdk.dev/docs/reference/ai-sdk-core/stream-object#example-stream-an-array-using-a-schema)
3. **Error handling** - Add `onError` callback for validation failures - [Guide](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data#onerror-callback)

## Troubleshooting

**Not seeing the streaming effect?**

- Make sure you're calling `console.clear()` before displaying each partial object
- Check that your schema is complex enough (nested objects or arrays)
- Verify you're using `for await` to iterate over `partialObjectStream`
- Simple schemas might generate too fast to see the effect

**Getting validation errors?**

- The AI SDK validates only the final, complete object against your schema
- Partial objects during streaming are not validated (they're incomplete by design)
- If you get validation errors, the final object didn't match your schema
- Check that your prompt clearly describes the structure you want
- Some models handle complex schemas better than others
