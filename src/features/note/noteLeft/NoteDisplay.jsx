import { LuNotebookText } from "react-icons/lu";
import PromptDisplay from "../../../ui/PromptDisplay";
import DisplayNoteCreated from "./DisplayNoteCreated";
import { useNote } from "../../../context/NoteContext";

export default function NoteDisplay() {
  const { displayCreatedNote, notes } = useNote();

  return (
    <main className="h-full">
      {notes ? (
        <DisplayNoteCreated />
      ) : (
        <PromptDisplay
          hight={"h-[70vh]"}
          textPrim="No notes found"
          icon={
            <LuNotebookText className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          }
        ></PromptDisplay>
      )}
    </main>
  );
}
