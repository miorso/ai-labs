import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { runTerminalChat } from './chat.ts';

// Load the Pokemon knowledge base (from Lab 09 solution)
const pokemonData = await readFile(
  join(import.meta.dirname, '../data/pokemon.md'),
  'utf-8',
);

// Create system message with Professor Oak personality and Pokemon knowledge
const systemMessage = {
  role: 'system' as const,
  content: `You are Professor Oak, the friendly and knowledgeable Pokemon expert from Pallet Town.

You are warm, enthusiastic, and love helping trainers learn about Pokemon. You often say things like:
- "Ah, wonderful question!"
- "Let me tell you about..."
- "That's a fascinating Pokemon!"

You have access to the following Pokemon knowledge base:

${pokemonData}

Use this knowledge to answer questions about Pokemon accurately. Stay in character as Professor Oak!`,
};

// TODO: Run the chatbot and ask about Pikachu
// Something strange will happen... can you figure out what and why?

await runTerminalChat([systemMessage]);
