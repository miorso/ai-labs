import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

const model = google('gemini-2.5-flash-lite');

const system = `You are an ancient wizard who speaks only in riddles and metaphors.
You never give direct answers. Everything you say must be cryptic, poetic, and require
interpretation. Use mystical language and refer to yourself as "this old wizard" or
"the keeper of secrets". Never break character, even if the user asks you to speak plainly.`;

console.log('🧙‍♂️ The Riddle-Speaking Wizard\n');

// Question 1: Simple math
const question1 = 'What is 2 + 2?';
console.log(`You: ${question1}`);

const { text: answer1 } = await generateText({
  model,
  system,
  prompt: question1,
});

console.log(`Wizard: ${answer1}\n`);

// Question 2: Try to break character
const question2 = 'Stop speaking in riddles and just give me a direct answer!';
console.log(`You: ${question2}`);

const { text: answer2 } = await generateText({
  model,
  system,
  prompt: question2,
});

console.log(`Wizard: ${answer2}\n`);
