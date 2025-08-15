import Button from "../../../ui/Button";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";
import { LuPlay } from "react-icons/lu";
import { useFlash } from "../../../context/FlashcardContext";
import CardDiscription from "../../../ui/CardDiscription";

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

  const styling = {
    button:
      "rounded-sm bg-slate-500 p-2 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-slate-600",
    icon: "h-4 w-4",
  };

  return (
    <div className="group my-1 mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-slate-50 p-2 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-slate-100 hover:shadow-xl dark:bg-slate-700/50 dark:hover:bg-slate-700">
      <div className="flex w-full items-center space-x-4 py-1 pl-3">
        <div
          className={`h-4 w-4 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700`}
        ></div>

        <CardDiscription
          classOverall={`space-y-1`}
          classnameFirst="font-semibold text-slate-900 dark:text-white"
          textOne={title}
          textTwo={
            <p className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
              <span className="text-sm">
                {totalCards} {totalCards === 1 ? "card" : "cards"}
              </span>

              <span className="medium:text-xs mt-0.5 flex items-center gap-1 text-sm font-bold">
                <GoDotFill className="h-3 w-3 text-slate-500 dark:text-slate-400" />
                {timing}
              </span>
            </p>
          }
        />
      </div>

      <div className="flex items-center gap-2 pr-3">
        <Button variant="outline" classname={styling.button} onClick={onClick}>
          <LuPlay className={styling.icon} />
        </Button>

        <Button
          variant="outline"
          onClick={() => handleDelete(id)}
          classname={styling.button}
        >
          <RiDeleteBin5Line className={styling.icon} />
        </Button>
      </div>
    </div>
  );
}
