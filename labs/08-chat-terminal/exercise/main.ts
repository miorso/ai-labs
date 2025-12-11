import { google } from '@ai-sdk/google';
import { generateText, type ModelMessage } from 'ai';
import prompts from 'prompts';

async function getUserInput(): Promise<string> {
  const input = await prompts({
    type: 'text',
    name: 'message',
    message: 'You:',
  });
  return input.message?.trim() || '';
}

const model = google('gemini-2.5-flash-lite');

console.log('🤖 Terminal Chatbot');
console.log('Type "exit" to quit\n');

// TODO: Initialize a messages array with a system message defining the AI's behavior
// The array should have proper types for role ('system' | 'user' | 'assistant') and content
const messages = TODO;

// TODO: Create a chat loop that:
// 1. Gets user input using prompts
// 2. Checks if user wants to exit (empty message or "exit")
// 3. Adds user message to messages array
// 4. Calls generateText with model and messages
// 5. Adds AI response to messages array
// 6. Displays the AI response
// The loop should continue until the user types "exit"

// Hint: Use while (true) for the loop
// Hint: Don't forget to display a goodbye message when exiting
