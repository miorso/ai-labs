# Lab 11: Chat API

## Overview

In this lab, you'll build a streaming chat API endpoint using Hono. You'll learn about the two message formats in AI SDK (`UIMessage` vs `ModelMessage`), why they exist, and how to properly stream responses for frontend consumption using `toUIMessageStreamResponse()`.

## Learning Objectives

- Understand the difference between `UIMessage` and `ModelMessage`
- Use `convertToModelMessages` to bridge frontend and model formats
- Build a POST endpoint that streams AI responses
- Learn why `toUIMessageStreamResponse()` is needed instead of `textStream`
- Understand the AI SDK's wire format (SSE) for frontend consumption

## Your Task

Complete the TODOs in `exercise/api/chat.ts` to:

1. Refresh Lab 04 about `streamText` if needed
2. Import necessary functions and types from `ai` package
3. Parse the request body to extract messages
4. Convert `UIMessage[]` to `ModelMessage[]`
5. Call `streamText` with the model and converted messages
6. Return the streaming response using `toUIMessageStreamResponse()`

## Key Concepts

### UIMessage vs ModelMessage

The AI SDK uses two message formats for different purposes:

#### `UIMessage` - Optimized for frontend/UI state

```typescript
{
  id: "msg_abc123",
  role: "user",
  content: "Hello!",
  createdAt: "2025-01-15T10:30:00Z",
  annotations: [...],
  parts: [{ type: "text", text: "Hello!" }],
  // ... more UI-specific fields
}
```

- Used by `useChat` hook in React
- Contains rich metadata (id, createdAt, annotations)
- Supports complex content (tool calls, attachments)
- What the frontend sends and receives

#### `ModelMessage` - Optimized for AI models

```typescript
{
  role: "user",
  content: "Hello!"
}
```

- Stripped-down format for API calls
- Contains only what the model needs (role, content)
- What `streamText` and `generateText` expect

**Why two formats?** The frontend needs rich state management. The model needs minimal, clean input. `convertToModelMessages` bridges them:

```typescript
const messages: UIMessage[] = body.messages; // From frontend
const modelMessages: ModelMessage[] = convertToModelMessages(messages); // For AI
```

### Two Ways to Stream Responses

#### `textStream`

Returns raw text chunks:

```
Hello
 there
!
```

Simple, but **loses all metadata**: message boundaries, roles, tool calls, finish reasons.

#### `toUIMessageStreamResponse()`

Returns a Response with structured SSE (Server-Sent Events) format:

```
0:"Hello"
0:" there"
0:"!"
e:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":8}}
d:{"finishReason":"stop","usage":{"promptTokens":10,"completionTokens":8}}
```

The prefixes encode message type:

- `0:` - Text delta (content chunk)
- `e:` - Step finish event
- `d:` - Data message (final metadata)

This is what `useChat` expects on the frontend.

### The Server Setup

This lab uses a file-based API routing system. Open `scripts/server/backend.ts` to see how:

1. Hono handles requests to `/api/*`
2. Routes map to files (e.g., `/api/chat` → `api/chat.ts`)
3. HTTP methods map to exports (POST request → `POST` function)

## Running the Exercise

```bash
pnpm run dev
# Select: 11-chat-api
# Select: exercise
```

The server starts at `http://localhost:3000`.

## Testing Your Endpoint

**Mac/Linux:**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"id":"1","role":"user","parts":[{"type":"text","text":"Say hello in 3 words"}]}]}'
```

**Windows (cmd):**

```cmd
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d "{\"messages\":[{\"id\":\"1\",\"role\":\"user\",\"parts\":[{\"type\":\"text\",\"text\":\"Say hello in 3 words\"}]}]}"
```

**Windows (PowerShell):**

```powershell
curl -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{\"messages\":[{\"id\":\"1\",\"role\":\"user\",\"parts\":[{\"type\":\"text\",\"text\":\"Say hello in 3 words\"}]}]}'
```

## Expected Output

With `toUIMessageStreamResponse()`, you should see structured SSE output:

```
0:"Hello"
0:" there"
0:"!"
e:{"finishReason":"stop","usage":{"promptTokens":12,"completionTokens":3}}
d:{"finishReason":"stop","usage":{"promptTokens":12,"completionTokens":3}}
```

## Summary

| Feature             | `textStream`   | `toUIMessageStreamResponse()` |
| ------------------- | -------------- | ----------------------------- |
| Format              | Raw text       | SSE with prefixes             |
| Metadata            | Lost           | Preserved                     |
| Frontend compatible | No             | Yes (`useChat`)               |
| Headers             | Manual         | Automatic                     |
| Use case            | Simple logging | Production apps               |

**Key takeaway:** Always use `toUIMessageStreamResponse()` when building APIs that frontends will consume with `useChat`.

## Experiments to Try

After completing the exercise:

1. **Try textStream** - Replace `toUIMessageStreamResponse()` with `textStream` and compare the output
2. **Add a system prompt** - Include a system message in your messages array
3. **Check headers** - Use `curl -v` to see what headers `toUIMessageStreamResponse()` sets automatically
4. **Error handling** - What happens if you send invalid JSON?

## Troubleshooting

**404 Not Found?**

- Make sure `api/chat.ts` exists in your exercise folder
- Restart the server after creating the file

**Type errors with messages?**

- Ensure you're using `UIMessage` for the request body type
- Use `convertToModelMessages` before passing to `streamText`

**Not seeing streaming output?**

- Check that you're returning `toUIMessageStreamResponse()`, not just the result
- Verify curl is actually sending the POST request with the correct headers
