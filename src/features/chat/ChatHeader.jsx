import { LuChevronsRight } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import HeaderText from "../../ui/HeaderText";
import Button from "../../ui/Button";
import { useChat } from "../../context/ChatContext";

export default function ChatHeader() {
  const { setIsChatShow } = useChat();

  const styling = {
    icon: "h-6 w-6 text-slate-400 dark:text-slate-500",
  };

  return (
    <header className="mb-4 flex w-full items-center justify-between">
      <div className="flex items-center space-x-1">
        <Button
          variant="outline"
          onClick={() => setIsChatShow((show) => !show)}
        >
          <LuChevronsRight className={styling.icon} />
        </Button>
        <HeaderText classname="sm:text-base">AI Chat</HeaderText>
      </div>

      <Button variant="outline">
        <LuPlus className={styling.icon} />
      </Button>
    </header>
  );
}
