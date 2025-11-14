# Lab 08: Terminal Chatbot

## Overview

In this lab, you'll build an interactive terminal chatbot that maintains conversation history across multiple exchanges. You'll combine everything from Lab 07 (messages array) with a chat loop to create a fully functional conversational AI that runs in your terminal.

## Learning Objectives

- Build an interactive chat loop for continuous conversation
- Manage conversation state by accumulating messages over time
- Combine messages array with user input to create multi-turn interactions
- Apply concepts from previous labs (generateText, system prompts, messages) in a complete application

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Initialize a messages array with a system message defining the AI's behavior (use `ModelMessage[]` type)
2. Create a chat loop using `while (true)` that continuously:
   - Gets user input using the provided `getUserInput()` helper function
   - Checks for exit condition (empty input or "exit")
   - Adds user messages to the conversation history
   - Calls `generateText()` with the accumulated messages
   - Adds AI responses to the conversation history
   - Displays the AI's response to the user
3. Display a goodbye message when the user exits

Note: The `getUserInput()` helper function is already provided for you - it handles prompting the user and returning their trimmed input.

## Expected Output

You should see an interactive chatbot that remembers the entire conversation:

```text
🤖 Terminal Chatbot
Type "exit" to quit

You: Hi, my name is Alex
AI: Hello Alex! Nice to meet you. How can I help you today?

You: What's my name?
AI: Your name is Alex, as you just told me!

You: exit
👋 Goodbye!
```

Notice how the AI remembers the user's name from the first message!

## Key Concepts

### The Chat Loop Pattern

A chatbot needs to continuously accept input and generate responses. This requires a loop that:

1. **Waits for user input** - The program should prompt and wait for the user to type something
2. **Checks exit conditions** - Determine if the user wants to stop chatting
3. **Updates conversation history** - Add the user's message to the messages array
4. **Generates a response** - Call the AI with the full conversation history
5. **Stores the response** - Add the AI's reply to the messages array
6. **Shows the response** - Display the AI's answer to the user
7. **Repeats** - Go back to step 1

This cycle continues until the user decides to exit. The key insight is that the messages array grows with each exchange, giving the AI more context for each response.

### Getting Terminal Input

A `getUserInput()` helper function is provided that uses the `prompts` package:

```typescript
async function getUserInput(): Promise<string> {
  const input = await prompts({
    type: 'text',
    name: 'message',
    message: 'You:',
  });
  return input.message.trim();
}

// Usage in your chat loop
const userMessage = await getUserInput();
```

This helper abstracts away the prompts details and provides a clean interface for getting user input. The `prompts` package provides a nice terminal UI with proper cursor handling.

### Conversation State Management

The messages array grows over time:

```typescript
// Initial state
const messages: ModelMessage[] = [
  { role: 'system', content: 'You are a helpful assistant' },
];

// After first exchange
[
  { role: 'system', content: 'You are a helpful assistant' },
  { role: 'user', content: 'Hi, my name is Alex' },
  { role: 'assistant', content: 'Hello Alex! Nice to meet you.' },
];

// After second exchange
[
  { role: 'system', content: 'You are a helpful assistant' },
  { role: 'user', content: 'Hi, my name is Alex' },
  { role: 'assistant', content: 'Hello Alex! Nice to meet you.' },
  { role: 'user', content: 'What's my name?' },
  { role: 'assistant', content: 'Your name is Alex!' },
];
```

Each `generateText()` call receives the ENTIRE history, so the AI always has full context.

## Experiments to Try

After completing the exercise, experiment with:

1. **Different system prompts** - Try different AI personalities (teacher, comedian, expert)
2. **Conversation limits** - Set a maximum number of messages to prevent token limits
3. **Message trimming** - Keep only the last N messages to manage context size
4. **Save conversation** - Write messages to a file when exiting
5. **Multi-line input** - Modify prompts to allow multi-line messages
6. **Streaming responses** - Use `streamText()` instead of `generateText()` for real-time output
7. **Special commands** - Add commands like `/clear` to reset conversation, `/save` to save history

## Advanced: Context Window Management

As conversations get longer, you'll hit token limits. Common strategies:

**1. Sliding window (keep recent messages):**

```typescript
const MAX_MESSAGES = 10;
if (messages.length > MAX_MESSAGES) {
  // Keep system message + last N messages
  messages = [messages[0], ...messages.slice(-MAX_MESSAGES)];
}
```

**2. Summarization (compress old messages):**

```typescript
// Periodically summarize old messages into a new system message
if (messages.length > 20) {
  const summary = await generateText({
    model,
    prompt: 'Summarize this conversation: ' + JSON.stringify(messages),
  });
  messages = [
    { role: 'system', content: summary.text },
    ...messages.slice(-5), // Keep recent messages
  ];
}
```

## Troubleshooting

**getUserInput() not working?**

- The `getUserInput()` helper is already provided in the exercise file
- Make sure you're using `await` when calling it: `await getUserInput()`
- The function returns a string, so assign it directly: `const userMessage = await getUserInput()`

**AI doesn't remember previous messages?**

- Ensure you're adding BOTH user and assistant messages to the array
- Check that `messages` is defined outside the loop (not recreated each time)
- Verify you're passing `messages` (not `prompt`) to `generateText()`
- Make sure you're using the same `messages` array throughout

**Loop never exits?**

- Check your exit condition is inside the loop
- Use `break` to exit the loop
- Make sure you're comparing the trimmed, lowercase version: `userMessage.toLowerCase() === 'exit'`

**Getting token limit errors?**

- Conversations can grow too long for the model's context window
- Implement message trimming (see "Advanced: Context Window Management")
- Consider using a model with a larger context window
- Keep the system prompt concise

**TypeScript errors about message roles?**

- Import and use the `ModelMessage` type from the AI SDK:

  ```typescript
  import { generateText, type ModelMessage } from 'ai';

  const messages: ModelMessage[] = [];
  ```

- This is the proper way to type messages - use SDK types instead of manual definitions
