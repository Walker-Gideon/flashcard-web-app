import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain({ messagesEndRef, handleSubmit }) {
  return (
    <div className="relative h-screen flex-1 flex-col overflow-hidden p-1">
      <div className="scroll-container medium:h-116 h-143 overflow-y-scroll pr-2">
        <RenderMessage />
        <TypingIndicator />
        <div ref={messagesEndRef} />
      </div>

      <MessageInput handleSubmit={handleSubmit} />
    </div>
  );
}
