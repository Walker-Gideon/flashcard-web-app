import { LuNotebookText } from "react-icons/lu";
import PromptDisplay from "../../../ui/PromptDisplay";
import Button from "../../../ui/Button";
import { useNote } from "../../../context/NoteContext";
import { useLoader } from "../../../context/LoaderContext";

export default function NoteMainPrompt() {
  const { setCreateNote } = useNote();
  const { setLoading } = useLoader();

  function handleCreateNote() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCreateNote((show) => !show);
    }, 1000);
  }

  return (
    <div className="h-full">
      <PromptDisplay
        hight={"h-screen"}
        textPrim="Select a note to view"
        textSec='Or tap "Create Note" to make one.'
        icon={
          <LuNotebookText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        }
      >
        <Button
          variant="primary"
          classname={
            "flex items-center gap-2 mt-2 justify-center py-2 border-0"
          }
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
