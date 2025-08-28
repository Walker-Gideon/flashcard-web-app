import { LuChevronsRight } from "react-icons/lu";
import { LuRefreshCw } from "react-icons/lu";
import HeaderText from "../../ui/HeaderText";
import Button from "../../ui/Button";
import { useChat } from "../../context/ChatContext";

export default function ChatHeader() {
  const { setIsChatShow } = useChat();

  function handleRefreshChat() {
    console.log("refresh click");
  }

  return (
    <header className="mb-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          onClick={() => setIsChatShow((show) => !show)}
        >
          <LuChevronsRight className="h-6 w-6 text-slate-400 dark:text-slate-500" />
        </Button>
        <HeaderText classname="sm:text-base">Study Assistant</HeaderText>
      </div>

      <Button variant="outline" onClick={handleRefreshChat}>
        <LuRefreshCw className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </Button>
    </header>
  );
}
