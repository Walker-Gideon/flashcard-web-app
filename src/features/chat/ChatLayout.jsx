import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMain from "./ChatMain";
import { useChat } from "../../context/ChatContext";

export default function ChatLayout() {
  const { isChatShow } = useChat();
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you with your studies today?",
      sender: "ai",
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const createPrompt = (userInput) => {
    return `You are a helpful study assistant. Respond to the following message:\n"${userInput}"`
  }

  const apiKey = import.meta.env.VITE_CHAT_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };
      
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);
     
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: createPrompt(inputMessage) }] }],
          }),
        }
      );

      const responseData = await response.json()

      const newAiMessage = {
        id: messages.length + 2,
        text: responseData.candidates?.[0]?.content?.parts?.[0]?.text || "",
        sender: "ai",
      };

      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch(error) {
      console.error("Error talking to Gemini:", error)
    } finally {
      setIsTyping(false);
    }
  }



  return (
    <div
      className={`medium:w-90 defaultColor absolute top-0 right-0 z-50 w-full transform border-l border-stone-300 shadow-2xl transition-transform duration-500 dark:border-slate-700 dark:shadow-slate-700 ${!isChatShow ? `hidden translate-x-100` : `translate-0`}`}
    >
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
