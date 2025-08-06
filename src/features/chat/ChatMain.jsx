import MessageInput from "./MessageInput";
import RenderMessage from "./RenderMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatMain() {
  return (
    <main className="flex h-full flex-1 flex-col overflow-hidden bg-red-500 p-1">
      <div className="">
        <RenderMessage />
        <TypingIndicator />
      </div>

      <MessageInput />
    </main>
  );
}
