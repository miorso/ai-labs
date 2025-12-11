import { google } from '@ai-sdk/google';
// TODO: Import streamObject from 'ai'
// TODO: Import z from 'zod'

const model = google('gemini-2.5-flash-lite');

// TODO: Create a Zod schema for a D&D campaign with the following structure:
// - campaign: object with:
//   - title: string
//   - setting: string
//   - difficulty: enum of 'easy', 'medium', 'hard', 'deadly'
//   - characters: array of objects with name (string), class (string), level (number), backstory (string)
//   - enemies: array of objects with name (string), type (string), description (string)
//   - plot: string
const schema = TODO;

const prompt =
  'Generate a Dungeons & Dragons campaign for 3-4 players at level 5';

// TODO: Call streamObject with your model, prompt, and schema
// TODO: Destructure partialObjectStream from the result
const { partialObjectStream } = TODO;

// TODO: Use a for await loop to iterate over partialObjectStream
// TODO: Inside the loop:
//   1. Clear the console with console.clear()
//   2. Display the partial object using JSON.stringify(partialObject, null, 2)
