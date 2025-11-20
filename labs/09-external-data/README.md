# Lab 09: Loading External Data

## Overview

In this lab, you'll learn how to enhance an AI model with external knowledge by loading data from files and incorporating it into model messages. You'll create "Professor Oak" - a Pokemon expert chatbot that can answer questions about all 151 Generation 1 Pokemon using a knowledge base loaded from a markdown file.

## Learning Objectives

- Incorporate external knowledge into system
- Create domain-specific AI experts with custom knowledge bases
- Understand how to combine personality traits with factual data

## Your Task

Complete the TODOs in `exercise/main.ts` to:

1. Import `readFile` from `node:fs/promises` and `join` from `node:path`
2. Load the Pokemon knowledge base using:
   ```typescript
   const pokemonData = await readFile(
     join(import.meta.dirname, '../data/pokemon.md'),
     'utf-8',
   );
   ```
   This uses `import.meta.dirname` to get the script's directory, ensuring the path works regardless of where you run the command from
3. Create a chatbot that acts as Professor Oak - a warm, enthusiastic Pokemon expert who can answer questions about all 151 Generation 1 Pokemon
4. Figure out how to give the AI access to both:
   - The Professor Oak personality/behavior
   - The Pokemon knowledge base you loaded from the file
5. Pass your message(s) to `runTerminalChat()` as an array

The `runTerminalChat()` function is already implemented in `chat.ts` and handles all the chat loop logic from Lab 08.

## Expected Output

You should see Professor Oak responding in character with accurate Pokemon information:

```text
🤖 Terminal Chatbot
Type "exit" to quit

You: Who are you?
AI: Ah, wonderful question! I'm Professor Oak from Pallet Town. I've dedicated my life to researching Pokemon and helping young trainers like yourself learn about these fascinating creatures. I'm here to share my knowledge with you!

You: Tell me about Pikachu
AI: Ah, Pikachu! One of the most popular Pokemon! Let me tell you about this Electric-type:

Pikachu is Pokemon #025, an Electric type with the abilities Static and Lightning Rod. When several of these Pokemon gather, their electricity could build and cause lightning storms.

As for stats, Pikachu has:
- HP: 35
- Attack: 55
- Defense: 40
- Sp. Attack: 50
- Sp. Defense: 50
- Speed: 90

Quite a speedy little Pokemon! Wonderful choice for any trainer!

You: exit
👋 Goodbye!
```

## Key Concepts

### Loading External Data

Node.js provides the `fs/promises` module for reading files asynchronously:

```typescript
import { readFile } from 'node:fs/promises';

const data = await readFile('./path/to/file.md', 'utf-8');
```

The `readFile()` function:

- Takes a file path (relative or absolute)
- Accepts an encoding (use 'utf-8' for text files)
- Returns a Promise that resolves to the file contents as a string
- Works great with top-level `await` in TypeScript

### Domain-Specific AI Experts

By combining:

1. **Personality instructions** (who the AI should be)
2. **Knowledge base** (what the AI should know)
3. **Behavioral guidelines** (how the AI should respond)

You create focused, expert AI assistants that excel in specific domains. This is more reliable than hoping the model already knows specialized information.

### Knowledge Base Format

The Pokemon data is formatted as markdown for readability:

```markdown
## Pikachu

- **Number**: #025
- **Type**: Electric
- **Abilities**: Static, Lightning Rod
- **Description**: When several of these Pokemon gather...

**Base Stats**:

- **HP**: 35
- **Attack**: 55
  ...
```

## Experiments to Try

After completing the exercise, experiment with:

1. **Markdown-formatted prompts** - Structure your system prompt with markdown headers, lists, and sections (see solution for example). This makes prompts more organized and can reduce token usage:

   ```typescript
   content: `# Role
   You are Professor Oak...
   
   ## Personality Traits
   - Warm and enthusiastic
   - A bit forgetful about names
   
   ## Speech Patterns
   - "Ah, wonderful question!"
   - "Now, what was my grandson's name again...?"`;
   ```

2. **Ask about different Pokemon** - Try all 151 Pokemon in the knowledge base
3. **Test the boundaries** - Ask about Pokemon that don't exist (Gen 2+) to see how the AI handles missing information
4. **Different personalities** - Change Professor Oak to be stern, funny, or overly dramatic
5. **Additional instructions** - Add rules like "always compare Pokemon to real animals" or "explain everything in rhymes"
6. **Structured responses** - Ask for comparisons, top 10 lists, or Pokemon recommendations based on criteria
7. **Other domains** - Create your own knowledge base (recipes, historical facts, product catalog)

## Advanced: Data Source Considerations

When loading external data, consider:

**1. File size and token limits:**

```typescript
// Large knowledge bases might exceed context windows
// Consider loading only relevant sections

const allPokemon = await readFile('./data/all.md', 'utf-8');
// This might be too large!

// Better: Load specific sections or summarize
const relevantPokemon = await readFile('./data/gen1-only.md', 'utf-8');
```

**2. Data freshness:**

```typescript
// Load data once at startup
const data = await readFile('./data.md', 'utf-8');
const systemMessage = { role: 'system', content: data };

// VS: Load fresh data for each request (slower but always current)
async function getSystemMessage() {
  const data = await readFile('./data.md', 'utf-8');
  return { role: 'system', content: data };
}
```

**3. Error handling:**

```typescript
try {
  const data = await readFile('./data/pokemon.md', 'utf-8');
} catch (error) {
  console.error('Failed to load knowledge base:', error);
  // Provide fallback or graceful degradation
}
```

## Troubleshooting

**File not found error?**

- Make sure you're using `join(import.meta.dirname, '../data/pokemon.md')` to resolve the path
- `import.meta.dirname` gives you the directory of the current module file
- This ensures the path works whether you run from the lab directory or project root with `pnpm run dev`

**AI doesn't use the Pokemon data?**

- Ensure the data is actually included in the message content
- Check you're using template literals with `${pokemonData}`
- Verify the data loaded correctly by logging it: `console.log(pokemonData.substring(0, 200))`

**AI provides incorrect Pokemon information?**

- The AI should only use the provided knowledge base
- Add instructions like "ONLY use the information provided in the knowledge base"
- Make it clear the AI should not use its training data for Pokemon facts

**Running out of tokens?**

- The complete 151 Pokemon dataset is large (~2000 lines)
- Most models can handle it, but if you hit limits try using a model with a larger context window
- Consider loading a subset of Pokemon instead

**AI breaks character?**

- Strengthen the personality instructions in the system message
- Add explicit examples of how Professor Oak would respond
- Include phrases Professor Oak should use regularly
