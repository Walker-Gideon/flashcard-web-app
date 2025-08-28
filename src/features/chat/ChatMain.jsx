import { useChat } from "../../context/ChatContext";
import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain({ messagesEndRef, handleSubmit }) {
  const { messages, isTyping } = useChat();

  return (
    <div className="relative h-screen flex-1 flex-col overflow-hidden p-1">
      {/* chat-scrollbar overflow-y-auto */}
      {/* flex-1 overflow-y-scroll h-[50] */}
      <div className="scroll-container h-100 overflow-y-scroll bg-green-500 pr-2">
        <RenderMessage messages={messages} />
        <TypingIndicator isTyping={isTyping} />

        {/* Invisible div for auto-scroll */}
        <div ref={messagesEndRef} />
      </div>

      <MessageInput handleSubmit={handleSubmit} />
    </div>
  );
}
