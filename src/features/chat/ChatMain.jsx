import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain({
  messages,
  isTyping,
  messagesEndRef,
  setInputMessage,
  inputMessage,
  handleSubmit,
}) {
  return (
    <main className="flex h-full flex-1 flex-col overflow-hidden bg-red-500 p-1">
      {/* chat-scrollbar overflow-y-auto */}
      <div className="h-[50vh] flex-1 overflow-y-scroll bg-green-500 pr-2">
        <RenderMessage messages={messages} />
        <TypingIndicator isTyping={isTyping} />

        {/* Invisible div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput
        isTyping={isTyping}
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
