import { useEffect, useRef, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { LuSendHorizontal } from "react-icons/lu";

// interface Message {
// const  Message = {
//   id: number,
//   text: string,
//   sender: "user" | "ai",
// }

export default function ChatLayout() {
  // const [messages, setMessages] = useState<Message[]>([
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you with your studies today?",
      sender: "ai",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef < HTMLDivElement > null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /*
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputMessage.trim() === "") return

    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    }
    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const randomResponse = chatMockData.aiResponses[Math.floor(Math.random() * chatMockData.aiResponses.length)]
    const newAiMessage: Message = {
      id: messages.length + 2,
      text: randomResponse,
      sender: "ai",
    }
    setMessages((prevMessages) => [...prevMessages, newAiMessage])
    setIsTyping(false)
  }
    */

  return (
    <div className="medium:w-90 w-ful defaultColor absolute top-0 right-0 h-screen border-l border-stone-300 shadow-2xl dark:border-slate-700 dark:shadow-slate-700">
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              AI Chat Assistant
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Ask me anything about your studies!
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
          <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 shadow-sm ${
                    message.sender === "user"
                      ? "rounded-br-none bg-blue-500 text-white"
                      : "rounded-bl-none bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white"
                  }`}
                >
                  <div className="mb-1 flex items-center">
                    {message.sender === "ai" && (
                      <Brain className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    )}
                    {message.sender === "user" && (
                      <User className="mr-2 h-4 w-4 text-white" />
                    )}
                    <span className="text-sm font-semibold">
                      {message.sender === "user" ? "You" : "FlashMaster AI"}
                    </span>
                  </div>
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-[70%] rounded-lg rounded-bl-none bg-slate-100 p-3 text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white">
                  <div className="mb-1 flex items-center">
                    <LuBrain className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold">
                      FlashMaster AI
                    </span>
                  </div>
                  <p className="animate-pulse text-sm">Typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            // onSubmit={handleSubmit}
            className="mt-6 flex items-center space-x-4"
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className="h-12 flex-1 resize-none overflow-hidden rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  // handleSubmit(e);
                }
              }}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="rounded-xl bg-blue-600 p-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={inputMessage.trim() === "" || isTyping}
            >
              <LuSendHorizontal className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Custom Scrollbar Style */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(
              148,
              163,
              184,
              0.5
            ); /* slate-400 with opacity */
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(148, 163, 184, 0.7);
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: rgba(
              71,
              85,
              105,
              0.5
            ); /* slate-600 with opacity */
          }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: rgba(71, 85, 105, 0.7);
          }
        `}</style>
      </div>
    </div>
  );
}
