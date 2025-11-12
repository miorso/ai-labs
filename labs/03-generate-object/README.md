# Lab 03: Generate Structured Objects

## Overview

In this lab, you'll learn how to use `generateObject()` to get structured, type-safe data from AI models. Instead of plain text, you'll define a schema and receive data that matches your exact specifications. This is incredibly useful for building applications that need predictable, parseable outputs.

## Learning Objectives

- Use `generateObject()` for structured output generation - [generateObject Documentation](https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object)
- Define schemas with Zod for type-safe AI responses - [Zod Documentation](https://zod.dev)
- Extract structured data from AI model responses
- Understand the benefits of structured outputs vs. text

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Import `generateObject` from the `ai` package
2. Import `z` from Zod to define schemas
3. Create a Zod schema for a book recommendation with specific fields (title, author, genre, yearPublished, summary, keyThemes, targetAudience)
4. Call `generateObject()` with your model, prompt, and schema
5. Observe the structured output logged to the console

## Expected Output

You should see a properly structured JavaScript object:

```
{
  title: 'The Pragmatic Programmer',
  author: 'Andrew Hunt and David Thomas',
  genre: 'Technology',
  yearPublished: 1999,
  summary: 'A comprehensive guide to software craftsmanship that covers topics from code organization to career development, offering practical advice and timeless principles for becoming a better programmer.',
  keyThemes: [
    'Software craftsmanship',
    'Code maintainability',
    'Professional development',
    'Best practices',
    'Continuous learning'
  ],
  targetAudience: 'Software developers at all levels who want to improve their craft and build better software'
}
```

## Key Concepts

### Why Structured Output?

Compare these two approaches:

**Plain text (hard to parse):**

```typescript
const { text } = await generateText({
  model,
  prompt: 'Tell me about a person named Alice who likes coding',
});
// Output: "Alice is 28 years old. She enjoys coding, reading, and hiking..."
// Now you need to parse this text yourself!
```

**Structured object (ready to use):**

```typescript
const { object } = await generateObject({
  model,
  prompt: 'Tell me about a person named Alice who likes coding',
  schema: personSchema,
});
// Output: { name: "Alice", age: 28, hobbies: ["coding", "reading", "hiking"], ... }
// Perfect! Ready to use in your app.
```

### Defining Schemas with Zod

[Zod](https://zod.dev) is a TypeScript-first schema validation library:

```typescript
import { z } from 'zod';

const personSchema = z.object({
  name: z.string(),
  age: z.number(),
  email: z.string(),
  hobbies: z.array(z.string()),
  isStudent: z.boolean(),
});
```

The AI SDK uses this schema to:

1. Tell the model exactly what structure to return
2. Validate the model's response matches your schema
3. Provide TypeScript types automatically

### The generateObject Response

```typescript
const result = await generateObject({
  model,
  prompt: 'Tell me about a person named Alice who likes coding',
  schema: personSchema,
});

console.log(result.object); // The structured object
console.log(result.usage); // Token usage stats
console.log(result.finishReason); // Why generation stopped
```

## Real-World Use Cases

Structured outputs are perfect for:

1. **Form Generation** - Generate form data that matches your app's structure
2. **API Responses** - Create predictable data for your frontend
3. **Data Extraction** - Pull structured info from unstructured text
4. **Configuration** - Generate valid config files
5. **Database Records** - Create objects ready to insert into your database

## Experiments to Try

After completing the exercise, experiment with:

1. **More Complex Schemas** - Add nested objects or optional fields
2. **Arrays of Objects** - Generate arrays by using `output: 'array'` parameter - [Documentation](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object#example-generate-an-array-using-a-schema)
3. **Enums** - Use `z.enum(['option1', 'option2'])` for constrained values - [Documentation](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-object#example-generate-an-enum)
4. **Different Prompts** - See how prompt affects the generated data
5. **Validation** - Try adding `.min()`, `.max()`, or `.email()` validators

## Troubleshooting

**Getting validation errors or unexpected output?**

The AI SDK validates model output against your Zod schema. If validation fails or the output doesn't match expectations:

- **Check schema-prompt alignment**: Make sure your schema matches what you're asking for in the prompt
- **Be specific**: Clearly describe required fields and their purpose in your prompt
- **Simplify if needed**: Complex or deeply nested schemas can be harder for models to follow
- **Add examples**: Include example outputs in your prompt to guide the model
- **Note**: Validation failures are rare with modern models (Gemini 2.0, GPT-4, Claude 3.5) but can happen with overly complex schemas
