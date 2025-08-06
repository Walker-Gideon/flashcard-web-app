import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";

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
    <div className="medium:w-90 w-ful defaultColor absolute top-0 right-0 z-50 border-l border-stone-300 shadow-2xl dark:border-slate-700 dark:shadow-slate-700">
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
                  */}

        {/* Chat Messages Area */}
        <ChatMain
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          handleSubmit={handleSubmit}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
        />
      </div>
    </div>
  );
}
