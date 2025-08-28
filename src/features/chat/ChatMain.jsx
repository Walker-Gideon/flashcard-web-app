import { useChat } from "../../context/ChatContext";
import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain({ messagesEndRef, handleSubmit }) {
  const { messages, isTyping } = useChat();

  return (
    <div className="relative h-screen flex-1 flex-col overflow-hidden p-1">
      <div className="scroll-container medium:h-120 h-118 overflow-y-scroll pr-2">
        <RenderMessage messages={messages} />
        <TypingIndicator isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput handleSubmit={handleSubmit} />
    </div>
  );
}
