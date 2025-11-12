# Lab 06: System Prompts

## Overview

In this lab, you'll learn how to use system prompts to control AI behavior and personality. System prompts are special instructions that define how the AI should behave across all interactions. You'll create a riddle-speaking wizard who never breaks character - even when you ask it to!

## Learning Objectives

- Use system prompts to define AI behavior and personality - [Documentation](https://ai-sdk.dev/docs/foundations/prompts#system-prompts)
- Understand the difference between system prompts and user prompts
- See how system prompts persist across interactions
- Learn when and why to use system prompts in applications

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Create a system prompt that defines an ancient wizard character who speaks only in riddles
2. Call `generateText()` with the `system` parameter to ask a simple question
3. Try to make the wizard break character by asking it to speak plainly
4. Observe how the system prompt maintains the wizard's behavior

## Expected Output

You should see the wizard respond in riddles and metaphors, maintaining character even when asked to speak plainly:

```
🧙‍♂️ The Riddle-Speaking Wizard

You: What is 2 + 2?
Wizard: Ah, young seeker, when two pairs of twins meet in the mystical meadow,
count the shadows they cast beneath the moon...

You: Stop speaking in riddles and just give me a direct answer!
Wizard: The path to wisdom is never straight, dear wanderer. This old wizard
cannot forsake the ancient ways, for riddles are the keys to understanding...
```

## Key Concepts

### What Are System Prompts?

System prompts are special instructions that define the AI's role, behavior, and constraints. They're different from user prompts:

**System Prompt:**

- Defines WHO the AI is and HOW it should behave
- Sets the context and rules for all responses
- Persists across the conversation
- User typically doesn't see or control this

**User Prompt:**

- The actual question or task from the user
- What the AI should respond to
- Changes with each interaction

### How to Use System Prompts

```typescript
const { text } = await generateText({
  model,
  system: 'You are a helpful assistant who explains things simply.',
  prompt: 'What is TypeScript?',
});
```

The `system` parameter sets the behavior, the `prompt` is the user's question.

### Why System Prompts Are Powerful

System prompts provide **strong behavioral anchoring**:

- **Consistency** - AI maintains the same personality/style across all responses
- **Control** - You define exactly how the AI should behave
- **Resistance** - Hard to override with user prompts (as you'll see with the wizard!)
- **Separation of concerns** - Role definition vs task execution

## When to Use System Prompts

Use system prompts when you need to:

1. **Define AI personality** - Customer support bot, teacher, code reviewer
2. **Set output format** - Always respond in JSON, markdown, bullet points
3. **Establish rules** - Never mention competitors, stay on topic, avoid certain language
4. **Provide context** - Company policies, documentation, guidelines
5. **Control tone** - Formal, casual, technical, friendly

Use regular prompts for:

- One-off questions without needing consistent behavior
- Simple queries that don't require special formatting
- Prototyping before you know what behavior you want

## System Prompt Best Practices

**Be specific and clear:**

```typescript
// ❌ Vague
system: 'Be helpful'

// ✅ Specific
system: 'You are a technical support agent. Provide step-by-step solutions.
Ask clarifying questions if needed. Always be patient and encouraging.'
```

**Set boundaries:**

```typescript
system: 'You explain programming concepts. Never write complete code solutions -
only explain the approach. If asked about non-programming topics, politely
redirect to programming.'
```

**Define the output format:**

```typescript
system: 'You summarize articles. Always output exactly 3 bullet points.
Each bullet must be under 20 words. Focus on key takeaways.'
```

## Experiments to Try

After completing the exercise, experiment with:

1. **Different personalities** - Try making the AI speak as a pirate, Shakespearean scholar, or sports commentator
2. **Format control** - System prompt that always outputs markdown, JSON, or bullet points
3. **Domain expert** - Create a specialist (chef, lawyer, doctor) who stays in their domain
4. **Breaking attempts** - Try different ways to make the AI break character and observe resistance

## Real-World Examples

**Code Reviewer:**

```typescript
system: 'You review code for security vulnerabilities, performance issues,
and best practices. Always provide specific line numbers and suggest improvements.'
```

**API Documentation Generator:**

```typescript
system: 'You generate API documentation. Use OpenAPI format. Include endpoint,
parameters, request/response examples, and error codes.'
```

**Educational Tutor:**

```typescript
system: 'You teach programming to beginners. Break down complex concepts into
simple steps. Use analogies. Ask questions to check understanding.'
```

## Troubleshooting

**AI isn't following the system prompt?**

- Make sure you're passing the `system` parameter correctly
- Be more specific and explicit in your instructions
- Add "Never break character" or similar reinforcement
- Some models follow system prompts better than others

**System prompt seems too easy to override?**

- This can happen with weaker models or vague instructions
- Make the system prompt more detailed and emphatic
- Add explicit rules about ignoring override requests
- The wizard example shows strong behavioral anchoring

**Not sure what to put in system vs user prompt?**

- System = behavior/role/rules (doesn't change)
- User = task/question/input (changes each time)
- If it defines HOW to respond → system
- If it defines WHAT to respond to → user
