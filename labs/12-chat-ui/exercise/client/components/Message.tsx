import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from 'ai';
import ReactMarkdown from 'react-markdown';

export const Message = ({
  role,
  parts,
}: {
  role: UIMessage['role'];
  parts: UIMessagePart<UIDataTypes, UITools>[];
}) => {
  // TODO: Extract text from parts (filter for type === 'text' and join)
  // TODO: Return a <div> containing <ReactMarkdown>{text}</ReactMarkdown>
};
