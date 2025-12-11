import { google } from '@ai-sdk/google';
// TODO: Import streamText from 'ai'

const model = google('gemini-2.5-flash-lite');

// TODO: Create a prompt that generates enough text to see streaming in action
// Example: "Tell a short story about an AI that became a real human in 2-3 paragraphs"
const prompt = TODO;

// TODO: Call streamText with your model and prompt, and destructure textStream
const { textStream } = TODO;

// TODO: Use a for await loop to iterate over textStream
// TODO: Inside the loop, use process.stdout.write() to display each chunk
