import Button from "../../../ui/Button";
import { LuEllipsisVertical } from "react-icons/lu";
import { GoDotFill } from "react-icons/go";
import { useFlash } from "../../../context/FlashcardContext";

export default function UserDisplayFC({
  title,
  timing,
  onClick,
  totalCards,
  id,
}) {
  const { setFlashcardToDelete, setFlashcardNotify } = useFlash();

  function handleDelete(id) {
    setFlashcardNotify((show) => !show);
    setTimeout(() => {
      setFlashcardToDelete(id);
    }, 2000);
  }

  return (
    <div
      // ${id === selectedNoteId ? "bg-slate-50 dark:bg-slate-700" : ""}
      className={`my-1 mb-4 flex w-full cursor-pointer items-center justify-between gap-2 rounded-sm border border-stone-300 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-slate-50 hover:shadow-xl dark:border-slate-700 dark:hover:bg-slate-700`}
    >
      <div role="button" onClick={onClick} className="w-full py-2 pl-4">
        <h1 className="medium:text-sm mb-1 w-40 truncate overflow-hidden whitespace-nowrap text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <span className="text-sm">
            {totalCards} {totalCards === 1 ? "card" : "cards"}
          </span>

          <span className="medium:text-xs mt-0.5 flex items-center gap-1 text-sm font-bold">
            <GoDotFill className="h-3 w-3 text-slate-500 dark:text-slate-400" />
            {timing}
          </span>
        </p>
      </div>

      <Button
        variant="outline"
        onClick={() => handleDelete(id)}
        classname="text-slate-700 pr-4 dark:text-slate-200"
      >
        <LuEllipsisVertical className="h-5 w-5" />
      </Button>
    </div>
  );
}
