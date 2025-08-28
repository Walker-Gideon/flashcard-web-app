import { LuBrain } from "react-icons/lu";
import { useChat } from "../../context/ChatContext";

export default function TypingIndicator() {
  const { isTyping } = useChat();

  return (
    <div>
      {isTyping && (
        <div className="mb-4 flex justify-start">
          <div className="max-w-[70%] rounded-lg rounded-bl-none bg-slate-100 p-3 text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white">
            <div className="mb-1 flex items-center">
              <LuBrain className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-semibold">WalkWise AI</span>
            </div>
            <p className="animate-pulse text-sm">Typing...</p>
          </div>
        </div>
      )}
    </div>
  );
}
