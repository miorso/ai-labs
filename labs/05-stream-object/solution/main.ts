import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { z } from 'zod';

const model = google('gemini-2.5-flash-lite');

const schema = z.object({
  campaign: z.object({
    title: z.string(),
    setting: z.string(),
    difficulty: z.enum(['easy', 'medium', 'hard', 'deadly']),
    characters: z.array(
      z.object({
        name: z.string(),
        class: z.string(),
        level: z.number(),
        backstory: z.string(),
      }),
    ),
    enemies: z.array(
      z.object({
        name: z.string(),
        type: z.string(),
        description: z.string(),
      }),
    ),
    plot: z.string(),
  }),
});

const prompt =
  'Generate a Dungeons & Dragons campaign for 3-4 players at level 5';

const { partialObjectStream } = streamObject({
  model,
  prompt,
  schema,
});

for await (const partialObject of partialObjectStream) {
  console.clear();
  console.log(JSON.stringify(partialObject, null, 2));
}
