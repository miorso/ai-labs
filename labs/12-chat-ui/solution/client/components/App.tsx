import { useChat } from '@ai-sdk/react';
import { Message } from './Message.tsx';
import { Input } from './Input.tsx';
import { useState } from 'react';

export const App = () => {
  const { messages, sendMessage, status } = useChat();

  const [input, setInput] = useState('');

  const isLoading = status === 'streaming';

  return (
    <div className="flex flex-col w-full max-w-2xl pt-24 pb-32 mx-auto stretch">
      {messages.map((message) => (
        <Message key={message.id} role={message.role} parts={message.parts} />
      ))}
      <Input
        input={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={(e) => {
          e.preventDefault();
          if (isLoading || !input.trim()) return;
          void sendMessage({ text: input });
          setInput('');
        }}
        isLoading={isLoading}
      />
    </div>
  );
};
