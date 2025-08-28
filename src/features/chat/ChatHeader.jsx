import { LuChevronsRight } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import HeaderText from "../../ui/HeaderText";
import Button from "../../ui/Button";
import { useChat } from "../../context/ChatContext";

export default function ChatHeader() {
  const { setIsChatShow, setIsRefreshing, isRefreshing, setMessages } =
    useChat();

  function handleRefreshChat() {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
      setMessages([
        {
          id: 1,
          text: "Hello! How can I assist you with your studies today?",
          sender: "ai",
        },
      ]);
    }, 1500);
  }

  return (
    <header className="mb-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          onClick={() => {
            setIsChatShow((show) => !show);
            setIsRefreshing(true);
          }}
        >
          <LuChevronsRight className="h-6 w-6 text-slate-400 dark:text-slate-500" />
        </Button>
        <HeaderText classname="sm:text-base">Study Assistant</HeaderText>
      </div>

      <Button
        disabled={isRefreshing}
        variant="outline"
        classname="disabled:cursor-not-allowed"
        onClick={handleRefreshChat}
      >
        <LuRefreshCw className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </Button>
    </header>
  );
}
