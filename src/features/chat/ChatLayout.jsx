import { useEffect, useRef, useState } from "react";
import { LuBrain } from "react-icons/lu";
import { LuSendHorizontal } from "react-icons/lu";
import { LuUser } from "react-icons/lu";
import ChatHeader from "./ChatHeader";

// ChatLayout Component - AI Chat Interface
export default function ChatLayout() {
  // State for managing chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you with your studies today?",
      sender: "ai",
    },
  ]);

  // State for input message
  const [inputMessage, setInputMessage] = useState("");

  // State for typing indicator
  const [isTyping, setIsTyping] = useState(false);

  // Ref for auto-scrolling to bottom
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission for sending messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    // Create new user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI response (replace with actual AI integration later)
    const aiResponses = [
      "That's a great question! Let me help you understand that better.",
      "I can see you're working hard on your studies. Here's what I think...",
      "Based on your question, here's a helpful explanation...",
      "Great progress! Here's some additional information...",
      "I understand your query. Let me break this down for you...",
    ];

    const randomResponse =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];

    const newAiMessage = {
      id: messages.length + 2,
      text: randomResponse,
      sender: "ai",
    };

    // Add AI message to chat
    setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    setIsTyping(false);
  };

  return (
    <div className="medium:w-90 w-ful defaultColor absolute top-0 right-0 border-l border-stone-300 shadow-2xl dark:border-slate-700 dark:shadow-slate-700">
      {/* min-h-screen */}
      <div className="flex min-h-screen flex-col px-4 py-2">
        <ChatHeader />
        {/* 
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                AI Chat Assistant
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Ask me anything about your studies!
              </p>

              match /b/{bucket}/o {
      match /{allPaths=**} {
         allow read, write: if request.auth != null;
      }
    }
                  */}

        {/* Chat Messages Area */}
        <div className="flex flex-1 flex-col overflow-hidden p-1">
          {/* chat-scrollbar */}
          <div className="scroll-container h-0 flex-1 overflow-y-auto bg-amber-300 pr-2">
            {/* Render existing messages */}
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

            {/* Typing indicator */}
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

            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex items-center space-x-2"
          >
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className="h-12 flex-1 resize-none overflow-hidden rounded-sm border border-stone-300 bg-slate-50 p-3 text-sm text-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-slate-500"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              disabled={isTyping}
            />
            <button
              type="submit"
              className="rounded-sm bg-slate-500 p-3 text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-80"
              disabled={inputMessage.trim() === "" || isTyping}
            >
              <LuSendHorizontal className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
