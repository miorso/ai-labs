import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

const model = google('gemini-2.5-flash-lite');

const schema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  yearPublished: z.number(),
  summary: z.string(),
  keyThemes: z.array(z.string()),
  targetAudience: z.string(),
});

const prompt = 'Recommend a programming book for beginners';

const { object } = await generateObject({
  model,
  prompt,
  schema,
});

console.log(JSON.stringify(object, null, 2));
