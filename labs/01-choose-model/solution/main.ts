import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
// import { ollama } from 'ollama-ai-provider-v2';

const model = google('gemini-2.0-flash-lite');
// const model = ollama('llama3.2');

const { text } = await generateText({ model, prompt: 'Say hello!' });

console.log(text);
