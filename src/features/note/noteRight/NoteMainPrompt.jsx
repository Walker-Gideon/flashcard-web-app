import { LuNotebookText } from "react-icons/lu";
import PromptDisplay from "../../../ui/PromptDisplay";

export default function NoteMainPrompt() {
  return (
    <div className="h-full">
      <PromptDisplay
        hight={"h-screen"}
        textPrim="Select a note to view"
        textSec='Or tap "Create Note" to make one.'
      >
        <LuNotebookText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
      </PromptDisplay>
    </div>
  );
}
