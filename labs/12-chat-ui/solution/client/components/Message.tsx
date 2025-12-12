import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from 'ai';
import ReactMarkdown from 'react-markdown';

export const Message = ({
  role,
  parts,
}: {
  role: UIMessage['role'];
  parts: UIMessagePart<UIDataTypes, UITools>[];
}) => {
  const text = parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('');

  return (
    <div
      className={`prose prose-invert my-2 p-4 rounded-lg max-w-[80%] ${role === 'user' ? 'bg-blue-900 self-end' : 'bg-gray-800 self-start'}`}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
};
