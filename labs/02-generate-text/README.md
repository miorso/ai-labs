# Lab 02: Generate Text

## Overview

In this lab, you'll learn how to use the `generateText()` function to generate AI responses. You'll craft meaningful prompts and see how AI models respond to different types of questions. This builds on Lab 01 where you learned about model configuration.

## Learning Objectives

- Use `generateText()` for meaningful content generation - [generateText Documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-text)
- Craft effective prompts for specific tasks
- Understand the structure of `generateText()` responses
- Experiment with different prompt styles

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Create a prompt that asks the model to explain a concept
2. Call `generateText()` with your model and prompt
3. Log the response

## Prompt Ideas

Try asking the model to explain:

- **Technical concepts**: "Explain what TypeScript is in 2-3 sentences"
- **With analogies**: "Explain what recursion is using a real-world analogy"
- **Step-by-step**: "Explain how async/await works in JavaScript with a simple example"
- **For beginners**: "Explain what an API is to someone with no technical background"

## Expected Output

You should see a thoughtful, well-structured explanation from your model:

```text
Recursion is like standing between two mirrors - you see your reflection
repeated endlessly, with each reflection showing the previous one. In
programming, a recursive function calls itself to solve smaller versions
of the same problem until it reaches a simple base case, just like how
the mirror reflections eventually fade away.
```

## Key Concepts

### Prompt Engineering Basics

The quality of your output depends heavily on your prompt. Compare:

**Generic prompt:**

```typescript
const prompt = 'What is TypeScript?';
```

**Specific prompt:**

```typescript
const prompt =
  'Explain what TypeScript is in 2-3 sentences, focusing on why developers use it instead of JavaScript.';
```

The second prompt gives the model clear constraints (length, focus) and produces better results.

### The generateText Response

`generateText()` returns an object with several properties:

```typescript
const result = await generateText({
  model,
  prompt,
});

console.log(result.text); // The generated text
console.log(result.usage); // Token usage stats
console.log(result.finishReason); // Why generation stopped
```

For now, we're just using `text`, but you can explore these other properties!

## Prompt Engineering Tips

1. **Be specific** - Include constraints like length, format, or target audience
2. **Provide context** - Help the model understand what you're looking for
3. **Use examples** - Show the model the style or format you want
4. **Iterate** - Try different phrasings to see what works best

## Experiments to Try

After completing the exercise, experiment with:

1. **Different topics** - Try various concepts to see how the model adapts
2. **Different lengths** - Ask for 1 sentence, then 5 sentences
3. **Different styles** - Ask for formal vs. casual explanations
4. **Different audiences** - "Explain to a 10-year-old" vs. "Explain to an expert"

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
