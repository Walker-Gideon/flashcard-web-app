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
    // flex-1
    <div className="flex-1 h-screen flex-col overflow-hidden p-1 bg-red-500 relative overflow-hidden">
      {/* chat-scrollbar overflow-y-auto */}
      {/* flex-1 overflow-y-scroll h-[50] */}
      <div className="pr-2 bg-green-500 h-100">
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
    </div>
  );
}
