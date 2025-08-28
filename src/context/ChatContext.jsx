import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [isChatShow, setIsChatShow] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! How can I assist you with your studies today?",
      sender: "ai",
    },
  ]);

  const value = {
    isChatShow,
    setIsChatShow,
    inputMessage,
    setInputMessage,
    isTyping,
    setIsTyping,
    messages,
    setMessages,
    isRefreshing,
    setIsRefreshing,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("ChatContext was used outside of it Provider");

  return context;
}

export { ChatProvider, useChat };
