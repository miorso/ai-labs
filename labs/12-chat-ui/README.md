# Lab 12: Chat UI

## Overview

In this lab, you'll build a React chat interface that connects to the Chat API from Lab 11. You'll use the `useChat` hook from `@ai-sdk/react` to manage conversation state and render messages in a WhatsApp-style layout.

## Learning Objectives

- Use the `useChat` hook to manage chat state
- Understand `UIMessage` structure and how to render message parts
- Build reusable React components for chat interfaces
- Handle loading states during AI streaming

## Your Task

Build the chat UI progressively, one component at a time. The backend API (`api/chat.ts`) and entry point (`root.tsx`) are already provided.

### Part 1: Input Component (Input.tsx)

Complete the TODO in `exercise/client/components/Input.tsx`. The component signature is already provided.

Return a `<form>` with `onSubmit` handler containing an `<input>` with:

- `value={input}`
- `onChange={onChange}`
- `autoFocus`

**Styling** (copy this className for the `<input>`):

```
fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800
```

**Props explained:**

- `input` - The current input value (controlled component)
- `onChange` - Handler called when user types
- `onSubmit` - Handler called when form is submitted
- `autoFocus` - Automatically focus the input when page loads

**Styling explained:**

- `fixed bottom-0` - Pin to bottom of viewport
- `left-1/2 -translate-x-1/2` - Center horizontally
- `w-full max-w-2xl` - Full width up to 672px
- `p-2 mb-8` - Padding and bottom margin
- `border-2 border-zinc-700` - Dark gray border
- `rounded shadow-xl` - Rounded corners with shadow
- `bg-gray-800` - Dark background

**Test it!** Temporarily update `App.tsx` to render your Input:

```typescript
export const App = () => {
  return (
    <Input
      input=""
      onChange={() => {}}
      onSubmit={() => {}}
    />
  );
};
```

Run `pnpm run dev`, select `12-chat-ui` → `exercise`, and open http://localhost:3001. You should see the input fixed at the bottom.

### Part 2: Message Component (Message.tsx)

Complete the TODOs in `exercise/client/components/Message.tsx`. The component signature and imports are already provided.

1. Extract text from parts:
   ```typescript
   const text = parts
     .map((part) => (part.type === 'text' ? part.text : ''))
     .join('');
   ```
2. Return a `<div>` containing `<ReactMarkdown>{text}</ReactMarkdown>`

**Styling** (copy this className for the `<div>`):

```
prose prose-invert my-2 p-4 rounded-lg bg-gray-800
```

**Props explained:**

- `role` - Message author: `'user'` or `'assistant'`
- `parts` - Array of message content parts (text, tool calls, etc.)

**Styling explained:**

- `prose prose-invert` - Typography styles for markdown (light text on dark)
- `my-2` - Vertical margin between messages
- `p-4` - Padding inside bubble
- `rounded-lg` - Rounded corners
- `bg-gray-800` - Dark background

**Test it!** Update `App.tsx` to render a test message alongside your Input:

```typescript
export const App = () => {
  return (
    <div>
      <Message
        role="assistant"
        parts={[{ type: 'text', text: 'Hello! I am a **test message** with markdown.' }]}
      />
      <Input
        input=""
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </div>
  );
};
```

Refresh the page. You should see a styled message bubble with rendered markdown.

### Part 3: App Component (App.tsx)

Complete the TODOs in `exercise/client/components/App.tsx`. The imports are already provided.

1. Use the `useChat` hook:
   ```typescript
   const { messages, sendMessage } = useChat();
   ```
2. Create input state: `const [input, setInput] = useState('');`
3. Render messages and Input component:
   ```typescript
   return (
     <div className="...">
       {messages.map((message) => (
         <Message
           key={message.id}
           role={message.role}
           parts={message.parts}
         />
       ))}
       <Input
         input={input}
         onChange={(e) => setInput(e.target.value)}
         onSubmit={(e) => {
           e.preventDefault();
           if (!input.trim()) return;
           void sendMessage({ text: input });
           setInput('');
         }}
       />
     </div>
   );
   ```

**Styling** (copy this className for the container `<div>`):

```
flex flex-col w-full max-w-2xl pt-24 pb-32 mx-auto stretch
```

**Styling explained:**

- `flex flex-col` - Flexbox column layout (messages stack vertically)
- `w-full max-w-2xl` - Full width up to 672px
- `pt-24 pb-32` - Top/bottom padding (space for fixed input)
- `mx-auto` - Center horizontally
- `stretch` - Stretch items to fill width

**Test it!** Run the exercise and send a message. You should see a basic chat working.

### Part 4: Add Loading State

Enhance the chat with loading indicators:

**In `App.tsx`:**

1. Get `status` from `useChat`:
   ```typescript
   const { messages, sendMessage, status } = useChat();
   ```
2. Create loading state: `const isLoading = status === 'streaming';`
3. Prevent submit while loading:
   ```typescript
   if (isLoading || !input.trim()) return;
   ```
4. Pass `isLoading` to Input: `<Input ... isLoading={isLoading} />`

**In `Input.tsx`:**

1. Add `isLoading: boolean` to the props (both destructuring and type)
2. Add `disabled={isLoading}` to the input
3. Add dynamic placeholder:
   ```typescript
   placeholder={isLoading ? 'Thinking...' : 'Enter your message here.'}
   ```

**Updated styling** for `<input>` (adds disabled styles):

```
fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl p-2 mb-8 border-2 border-zinc-700 rounded shadow-xl bg-gray-800 transition-colors focus:outline-none focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
```

**New styling explained:**

- `transition-colors` - Smooth color transitions
- `focus:outline-none focus:border-blue-500` - Blue border on focus
- `disabled:opacity-50 disabled:cursor-not-allowed` - Dimmed and no-click cursor when disabled

**Test it!** Send a message and watch the input. It should show "Thinking...", become disabled while streaming, then re-enable when done.

### Part 5: WhatsApp-style Messages

Enhance messages with role-based styling:

1. In `Message.tsx`, update the className to be conditional based on role:
   - User messages: blue background, aligned right
   - AI messages: gray background, aligned left

**Updated styling** for the message `<div>`:

```typescript
className={`prose prose-invert my-2 p-4 rounded-lg max-w-[80%] ${role === 'user' ? 'bg-blue-900 self-end' : 'bg-gray-800 self-start'}`}
```

**New styling explained:**

- `max-w-[80%]` - Limit bubble width to 80% of container
- `bg-blue-900` - Dark blue for user messages
- `bg-gray-800` - Dark gray for AI messages
- `self-end` - Align to right (user)
- `self-start` - Align to left (AI)

**Test it!** Send a few messages. Your messages should appear blue on the right, AI responses gray on the left - just like WhatsApp!

## Key Concepts

### The useChat Hook

`useChat` from `@ai-sdk/react` provides everything needed for chat state management:

```typescript
const {
  messages, // UIMessage[] - conversation history
  sendMessage, // Send a new message
  status, // 'idle' | 'streaming' | 'error'
} = useChat();
```

It automatically:

- Calls POST `/api/chat` when you send a message
- Parses the SSE stream from `toUIMessageStreamResponse()`
- Updates `messages` array in real-time as tokens arrive

### UIMessage Structure

Each message has this structure:

```typescript
{
  id: "msg_123",
  role: "user" | "assistant",
  parts: [
    { type: "text", text: "Hello!" },
    // Can also have tool calls, images, etc.
  ],
  createdAt: Date,
}
```

The `parts` array contains the actual content. For text messages, filter for `type === 'text'`.

### Why ReactMarkdown?

AI responses often contain markdown formatting (headers, lists, code blocks). `ReactMarkdown` renders this properly instead of showing raw markdown syntax.

## Running the Exercise

```bash
pnpm run dev
# Select: 12-chat-ui
# Select: exercise
```

Open `http://localhost:3001` in your browser.

## Expected Output

After completing all parts, you should have:

- A centered chat container
- Messages with markdown rendering
- User messages (blue) aligned right
- AI messages (gray) aligned left
- Fixed input at the bottom
- "Thinking..." placeholder while streaming
- Disabled input during streaming

## Experiments to Try

1. **Add timestamps** - Display `createdAt` for each message
2. **Auto-scroll** - Scroll to bottom when new messages arrive
3. **Clear chat** - Add a button to reset the conversation
4. **Error handling** - Display errors when the API fails
5. **Typing indicator** - Show animated dots while AI is responding

## Troubleshooting

**Messages not appearing?**

- Check browser console for errors
- Verify `api/chat.ts` exists and exports a POST function
- Ensure you're mapping over `messages` correctly

**Input not working?**

- Verify `onChange` updates state with `e.target.value`
- Check that `onSubmit` calls `e.preventDefault()`

**Styling not applying?**

- Ensure `index.css` is imported in `root.tsx`
- Check that TailwindCSS classes are spelled correctly

**"Thinking..." not showing?**

- Verify you're using `status` from `useChat`
- Check that `isLoading` is passed to Input component

**Messages not aligned?**

- Ensure the container has `flex flex-col`
- Check that `self-end` and `self-start` are in the Message className
