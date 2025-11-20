import { runTerminalChat } from './chat.ts';
// TODO: Import readFile from 'node:fs/promises'
// TODO: Import join from 'node:path'

// TODO: Load the Pokemon knowledge base from ../data/pokemon.md
// Hint: Use join(import.meta.dirname, '../data/pokemon.md') to get the correct path
// Then use readFile with that path and 'utf-8' encoding

// TODO: Create a message that makes the AI act as Professor Oak
// Professor Oak should be:
// - Warm and enthusiastic about Pokemon
// - Educational and informative
// - Uses phrases like "Ah, wonderful question!" or "Let me tell you about..."
// - Knowledgeable about all Pokemon in the knowledge base you loaded
//
// Think about how to give the AI access to both:
// 1. The personality/behavior you want (Professor Oak)
// 2. The Pokemon knowledge base you just loaded

// TODO: Pass your message(s) to runTerminalChat as an array
await runTerminalChat([]);
