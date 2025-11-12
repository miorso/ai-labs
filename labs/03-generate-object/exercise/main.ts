import { google } from '@ai-sdk/google';
// TODO: Import generateObject from 'ai'
// TODO: Import z from 'zod'

const model = google('gemini-2.0-flash-lite');

// TODO: Create a Zod schema for a book recommendation with the following fields:
// - title: string
// - author: string
// - genre: string
// - yearPublished: number
// - summary: string
// - keyThemes: array of strings
// - targetAudience: string
const schema = TODO;

const prompt = 'Recommend a programming book for beginners';

// TODO: Call generateObject with your model, prompt, and schema
const { object } = TODO;

console.log(JSON.stringify(object, null, 2));
