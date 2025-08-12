import { LuNotebookText } from "react-icons/lu";
import PromptDisplay from "../../../ui/PromptDisplay";
import Button from "../../../ui/Button";
import { useNote } from "../../../context/NoteContext";
import useLazyLoading from "../../../ui/LazyLoading";

export default function NoteMainPrompt() {
  const { setCreateNote, setContent } = useNote();
  const lazyTaggle = useLazyLoading(setCreateNote, 2000);

  function handleCreateNote() {
    lazyTaggle(true);
    setContent("<p>Start...</p>");
  }

  return (
    <div className="h-full">
      <PromptDisplay
        hight={"h-screen"}
        textPrim="Select a note to view"
        textSec={
          <span className="flex min-w-sm flex-col items-center">
            <span>Choose a note from the sidebar or tap "Create </span>{" "}
            <span>Note" to make one.</span>{" "}
          </span>
        }
        icon={
          <LuNotebookText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        }
      >
        <Button
          variant="primary"
          classname={"mt-2 py-2 border-0"}
          color={
            "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
          }
          onClick={handleCreateNote}
        >
          Create Note
        </Button>
      </PromptDisplay>
    </div>
  );
}
