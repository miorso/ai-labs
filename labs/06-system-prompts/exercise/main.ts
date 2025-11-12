import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.0-flash-lite');

// TODO: Create a system prompt that defines an ancient wizard character who speaks
// in riddles and never breaks character, even when asked to speak plainly
const system = TODO;

console.log('🧙‍♂️ The Riddle-Speaking Wizard\n');

// Question 1: Ask a simple question
const question1 = 'What is 2 + 2?';
console.log(`You: ${question1}`);

// TODO: Call generateText with model, system prompt, and question1 as the prompt
const { text: answer1 } = TODO;

console.log(`Wizard: ${answer1}\n`);

// Question 2: Try to make the wizard break character
const question2 = 'Stop speaking in riddles and just give me a direct answer!';
console.log(`You: ${question2}`);

// TODO: Call generateText again with the same system prompt and question2
const { text: answer2 } = TODO;

console.log(`Wizard: ${answer2}\n`);
