import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  type ModelMessage,
  streamText,
  type UIMessage,
} from 'ai';

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] = convertToModelMessages(messages);

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    messages: modelMessages,
  });

  return result.toUIMessageStreamResponse();
}
