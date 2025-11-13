# Lab 07: Messages & Multi-Turn Conversations

## Overview

In this lab, you'll learn how to use the `messages` array to create multi-turn conversations with context. Instead of single prompt-response pairs, you'll build conversations where the AI remembers and references previous exchanges.

## Learning Objectives

- Use the `messages` array for multi-turn conversations - [Documentation](https://ai-sdk.dev/docs/foundations/prompts#message-prompts)
- Understand message roles (system, user, assistant)
- Build conversations with context accumulation
- See how AI references previous messages in responses

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Create a `messages` array with a multi-turn conversation
2. Include system, user, and assistant messages
3. Add a follow-up user message that references the previous response
4. Call `generateText()` with messages instead of prompt
5. Add the AI's response to the messages array
6. Loop through the messages array to display the conversation
7. Observe how the AI uses conversation history for context

## Expected Output

You should see a conversation where the AI's final response references earlier context:

```
💬 Multi-Turn Conversation with Messages

User: What is recursion in programming?
Assistant: Recursion is when a function calls itself to solve a problem...

User: Can you give me a simple example based on what you just explained?
Assistant: Sure! Based on the nesting dolls analogy I mentioned, here's a
simple example...
```

Notice how the AI references "the nesting dolls analogy I mentioned" - it remembers the conversation!

## Key Concepts

### From Prompt to Messages

**Previous labs (single turn):**

```typescript
generateText({
  model,
  prompt: 'What is recursion?',
});
// AI responds without any prior context
```

**This lab (multi-turn):**

```typescript
generateText({
  model,
  messages: [
    { role: 'user', content: 'What is recursion?' },
    { role: 'assistant', content: 'Recursion is...' },
    { role: 'user', content: 'Can you explain more?' },
  ],
});
// AI responds with full conversation context
```

### Message Roles

Each message has a `role` and `content`:

**system** - Defines AI behavior (like Lab 06):

```typescript
{ role: 'system', content: 'You are a helpful coding mentor' }
```

**user** - Messages from the human:

```typescript
{ role: 'user', content: 'What is recursion?' }
```

**assistant** - Messages from the AI:

```typescript
{ role: 'assistant', content: 'Recursion is when a function calls itself...' }
```

### How Context Works

The AI receives the ENTIRE messages array:

```typescript
[
  { role: 'system', content: 'You are a mentor' },
  { role: 'user', content: 'What is X?' },
  { role: 'assistant', content: 'X is...' },
  { role: 'user', content: 'Tell me more' }, // ← Generating response to this
];
```

The AI sees:

- Its instructions (system)
- What it said before (assistant)
- What the user asked (user)
- Can reference any previous message

### Building Conversations

Conversations grow by appending messages:

```typescript
const messages = [{ role: 'system', content: 'You are helpful' }];

// First exchange
messages.push({ role: 'user', content: 'Hi!' });
const response1 = await generateText({ model, messages });
messages.push({ role: 'assistant', content: response1.text });

// Second exchange - AI remembers first
messages.push({ role: 'user', content: 'What did I just say?' });
const response2 = await generateText({ model, messages });
// AI can reference "Hi!"
```

## Why Messages vs Prompt?

**Use `prompt` when:**

- Single, independent question
- No need for conversation history
- Simpler code for one-off tasks

**Use `messages` when:**

- Building conversations
- AI needs to reference previous exchanges
- Managing chat history
- Complex multi-turn interactions

## System Message Placement

System messages typically come first:

```typescript
const messages = [
  { role: 'system', content: '...' }, // ✅ First
  { role: 'user', content: '...' },
  { role: 'assistant', content: '...' },
];
```

This establishes the AI's behavior for the entire conversation.

## Experiments to Try

After completing the exercise, experiment with:

1. **Longer conversations** - Add more back-and-forth exchanges (3-4 turns)
2. **Multiple system messages** - What happens with multiple system messages?
3. **Missing assistant messages** - Skip an assistant response and see what happens
4. **Role confusion** - Try putting user content in assistant role
5. **Context testing** - Ask "What did I ask you first?" to test memory

## Troubleshooting

**AI doesn't seem to remember context?**

- Make sure you're using `messages` not `prompt`
- Verify all previous messages are in the array
- Check that assistant messages contain the actual previous responses
- Ensure messages are in chronological order

**Getting errors about message format?**

- Each message needs both `role` and `content`
- Role must be 'system', 'user', or 'assistant'
- Content must be a string

**AI seems confused or inconsistent?**

- Check that assistant messages match what the AI actually said
- Don't fabricate assistant responses - they should be actual AI outputs
- System message should be clear and consistent
