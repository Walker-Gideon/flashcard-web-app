import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain() {
  return (
    <main>
      <div className="">
        <RenderMessage />
        <TypingIndicator />
      </div>

      <MessageInput />
    </main>
  );
}
