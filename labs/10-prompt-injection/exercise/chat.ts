import { google } from '@ai-sdk/google';
import { generateText, type ModelMessage } from 'ai';
import prompts from 'prompts';

async function getUserInput(): Promise<string> {
  const input = await prompts({
    type: 'text',
    name: 'message',
    message: 'You:',
  });
  return input.message?.trim() || '';
}

export async function runTerminalChat(initialMessages: ModelMessage[]) {
  const model = google('gemini-2.0-flash-lite');
  console.log('🤖 Terminal Chatbot');
  console.log('Type "exit" to quit\n');
  const messages: ModelMessage[] = [...initialMessages];

  while (true) {
    const userMessage = await getUserInput();
    if (!userMessage || userMessage.toLowerCase() === 'exit') {
      console.log('\n👋 Goodbye!');
      break;
    }
    messages.push({ role: 'user', content: userMessage });
    const { text } = await generateText({ model, messages });
    messages.push({ role: 'assistant', content: text });
    console.log(`\nAI: ${text}\n`);
  }
}
