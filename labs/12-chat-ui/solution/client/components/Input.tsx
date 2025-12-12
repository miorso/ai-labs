import type { ChangeEvent, FormEvent } from 'react';

export const Input = ({
  input,
  onChange,
  onSubmit,
  isLoading,
}: {
  input: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
}) => (
  <form onSubmit={onSubmit}>
    <input
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800 transition-colors focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      value={input}
      placeholder={isLoading ? 'Thinking...' : 'Enter your message here.'}
      onChange={onChange}
      disabled={isLoading}
      autoFocus
    />
  </form>
);
