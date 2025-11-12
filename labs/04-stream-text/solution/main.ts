import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

const model = google('gemini-2.0-flash-lite');

const prompt =
  'Tell a short story about an AI that became a real human in 2-3 paragraphs';

const { textStream } = streamText({
  model,
  prompt,
});

for await (const chunk of textStream) {
  process.stdout.write(chunk);
}
