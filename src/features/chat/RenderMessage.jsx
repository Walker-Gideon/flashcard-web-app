import { LuUser } from "react-icons/lu";
import { LuBrain } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import { useChat } from "../../context/ChatContext";

export default function RenderMessage() {
  const { messages, isRefreshing } = useChat();

  return (
    <>
      {isRefreshing ? (
        <div className="flex h-full w-full items-center justify-center">
          <span>
            <LuRefreshCw className="for spinning h-6 w-6 animate-spin text-slate-400 dark:text-slate-500" />
          </span>
        </div>
      ) : (
        <div>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                  message.sender === "user"
                    ? "rounded-br-none bg-slate-500 text-white"
                    : "rounded-bl-none bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                }`}
              >
                <div className="mb-1 flex items-center">
                  {message.sender === "ai" && (
                    <LuBrain className="mr-2 h-4 w-4 text-slate-600 dark:text-slate-400" />
                  )}
                  {message.sender === "user" && (
                    <LuUser className="mr-2 h-4 w-4 text-white" />
                  )}
                  <span className="text-sm font-semibold">
                    {message.sender === "user" ? "You" : "WalkWise AI"}
                  </span>
                </div>
                <p className="message-text">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
