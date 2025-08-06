import { useEffect, useRef, useState } from "react";

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
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Chat Assistant</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Ask me anything about your studies!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
