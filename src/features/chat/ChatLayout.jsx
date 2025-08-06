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
    <div className="medium:w-90 w-ful defaultColor absolute top-0 right-0 h-screen border-l border-stone-300 shadow-2xl dark:border-slate-700 dark:shadow-slate-700">
      <div className="flex min-h-screen flex-col px-4 py-2">
        <ChatHeader />
        {/* 
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                AI Chat Assistant
              </h1>
              <p className="mt-1 text-slate-600 dark:text-slate-400">
                Ask me anything about your studies!
              </p>
                  */}

        {/* Chat Messages Area */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
          <div className="chat-messages-scroll">
            {/* Render existing messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-wrapper ${message.sender === "user" ? "user-message" : "ai-message"}`}
              >
                <div
                  className={`message-bubble ${
                    message.sender === "user" ? "user-bubble" : "ai-bubble"
                  }`}
                >
                  <div className="message-header">
                    {message.sender === "ai" && (
                      <LuBrain className="message-icon ai-icon" />
                    )}
                    {message.sender === "user" && (
                      <LuUser className="message-icon user-icon" />
                    )}
                    <span className="message-sender">
                      {message.sender === "user" ? "You" : "FlashMaster AI"}
                    </span>
                  </div>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="message-wrapper ai-message">
                <div className="message-bubble ai-bubble">
                  <div className="message-header">
                    <LuBrain className="message-icon ai-icon" />
                    <span className="message-sender">FlashMaster AI</span>
                  </div>
                  <p className="typing-indicator">Typing...</p>
                </div>
              </div>
            )}

            {/* Invisible div for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Form */}
          <form onSubmit={handleSubmit} className="chat-input-form">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your question here..."
              className="chat-input"
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
              className="chat-send-button"
              disabled={inputMessage.trim() === "" || isTyping}
            >
              <LuSendHorizontal className="send-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
