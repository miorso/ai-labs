import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.0-flash-lite');

const prompt =
  'Explain what recursion is in programming using a simple real-world analogy. Keep it to 2-3 sentences.';

const { text } = await generateText({
  model,
  prompt,
});

console.log(text);
