import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

function ChatProvider({ children }) {
  const [isChatShow, setIsChatShow] = useState(false);

  const value = { isChatShow, setIsChatShow };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined)
    throw new Error("ChatContext was used outside of it Provider");

  return context;
}

export { ChatProvider, useChat };
