import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.5-flash-lite');

// TODO: Create a prompt that asks the model to explain a concept
// Example: "Explain what TypeScript is in 2-3 sentences"
const prompt = TODO;

// TODO: Call generateText with your model and prompt
const { text } = TODO;

console.log(text);
