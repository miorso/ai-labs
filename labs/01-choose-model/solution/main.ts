import { google } from '@ai-sdk/google';
// import { groq } from '@ai-sdk/groq';
// import { ollama } from 'ollama-ai-provider-v2';

const model = google('gemini-2.0-flash-lite');
// const model = groq('llama-3.3-70b-versatile');
// const model = ollama('llama3.2');

console.log(model);
