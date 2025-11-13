import { google } from '@ai-sdk/google';
import { generateText, type ModelMessage } from 'ai';

const model = google('gemini-2.0-flash-lite');

console.log('💬 Multi-Turn Conversation with Messages\n');

const messages: ModelMessage[] = [
  {
    role: 'system',
    content: 'You are a friendly coding mentor who explains concepts clearly.',
  },
  {
    role: 'user',
    content: 'What is recursion in programming?',
  },
  {
    role: 'assistant',
    content:
      'Recursion is when a function calls itself to solve a problem by breaking it into smaller, similar sub-problems. Think of it like Russian nesting dolls - each doll contains a smaller version of itself until you reach the smallest one.',
  },
  {
    role: 'user',
    content:
      'Can you give me a simple example based on what you just explained?',
  },
];

const { text } = await generateText({
  model,
  messages,
});

messages.push({ role: 'assistant', content: text });

for (const message of messages) {
  if (message.role !== 'system') {
    const label = message.role === 'user' ? 'User' : 'Assistant';
    console.log(`${label}: ${message.content}\n`);
  }
}
