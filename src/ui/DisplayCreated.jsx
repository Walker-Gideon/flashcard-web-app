import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "./Button";
import { useNote } from "../context/NoteContext";

export default function DisplayCreated({ title, timing, onClick, id }) {
  const { setNoteNotify, setNoteToDelete } = useNote();

  function handleDelete(id) {
    setNoteNotify((show) => !show);
    setNoteToDelete(id);
  }

  return (
    <div className="my-1 flex w-full cursor-pointer items-center justify-between gap-2 border-b border-stone-300 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700">
      <div role="button" onClick={onClick} className="w-full py-2 pl-4">
        <h1 className="medium:text-sm mb-1 text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="medium:text-xs text-sm text-slate-500 dark:text-slate-400">
          {timing}
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => handleDelete(id)}
        classname="text-slate-700 pr-4 dark:text-slate-200"
      >
        <RiDeleteBin5Line className="h-5 w-5" />
      </Button>
    </div>
  );
}
