import { google } from '@ai-sdk/google';
import { generateText, type ModelMessage } from 'ai';

const model = google('gemini-2.5-flash-lite');

console.log('💬 Multi-Turn Conversation with Messages\n');

// TODO: Create a messages array with a multi-turn conversation:
// 1. A system message defining the AI's role (e.g., "You are a friendly coding mentor")
// 2. A user message asking a question
// 3. An assistant message with a response
// 4. Another user message that references the previous response
const messages = TODO;

// TODO: Call generateText with model and messages (not prompt!)
// The AI will use the full conversation history to generate a contextual response
const { text } = TODO;

// TODO: Add the AI's response to the messages array
// This demonstrates the pattern of accumulating conversation history

// TODO: Loop through the messages array and display each message
// Skip the system message in the output
// Display user messages as "User: ..." and assistant messages as "Assistant: ..."
