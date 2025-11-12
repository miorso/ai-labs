# Lab 01: Choose Your Model

## Overview

In this lab, you'll learn how to select and use AI models with the Vercel AI SDK. You'll see how easy it is to switch between different providers (Google, Groq, Ollama) while keeping your code nearly identical.

## Learning Objectives

- Import and configure an AI provider - [Providers Documentation](https://sdk.vercel.ai/providers/ai-sdk-providers)
- Instantiate a language model
- Make your first API call with `generateText()` - [generateText Documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text)
- Understand provider interchangeability

## Prerequisites

Make sure you have at least one API key configured in your `.env` file:

```bash
# Choose one or more:
GOOGLE_GENERATIVE_AI_API_KEY=your_key_here
GROQ_API_KEY=your_key_here

# Or run Ollama locally (no API key needed):
# ollama pull llama3.2
```

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Import an AI SDK provider (e.g., `@ai-sdk/google`)
2. Import the `generateText` function from the `ai` package
3. Instantiate a model (e.g., `google('gemini-2.0-flash-lite')`)
4. Call `generateText()` with your model and a simple prompt
5. Log the response

## Recommended Models

**Google (Requires API key)** - [Documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai)

```typescript
import { google } from '@ai-sdk/google';
const model = google('gemini-2.0-flash-lite');
```

**Groq (Requires API key)** - [Documentation](https://sdk.vercel.ai/providers/ai-sdk-providers/groq)

```typescript
import { groq } from '@ai-sdk/groq';
const model = groq('llama-3.3-70b-versatile');
```

**Ollama (Local, no API key)** - [Documentation](https://sdk.vercel.ai/providers/community-providers/ollama)

```typescript
import { ollama } from 'ollama-ai-provider-v2';
const model = ollama('llama3.2');
```

## Expected Output

When you run the exercise successfully, you should see a friendly greeting from your chosen AI model:

```
Hello! How can I assist you today?
```

## Key Concepts

### Provider Interchangeability

The AI SDK abstracts away provider differences. Notice how you can swap providers by changing just two lines:

```typescript
// From Google:
import { google } from '@ai-sdk/google';
const model = google('gemini-2.0-flash-lite');

// To Groq:
import { groq } from '@ai-sdk/groq';
const model = groq('llama-3.3-70b-versatile');
```

The rest of your code stays the same!

## Troubleshooting

**Connection timeout errors?**

- If you see timeout errors, try disconnecting from VPN
- Corporate firewalls may block certain API endpoints

**API key errors?**

- Verify your `.env` file has the correct key for your chosen provider
- Make sure the key name matches (e.g., `GOOGLE_GENERATIVE_AI_API_KEY` for Google)

**Ollama connection refused?**

- Make sure Ollama is running: `ollama serve`
- Pull the model first: `ollama pull llama3.2`
