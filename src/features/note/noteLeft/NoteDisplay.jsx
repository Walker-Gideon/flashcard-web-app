import { LuNotebookText } from "react-icons/lu";

export default function NoteDisplay() {
  return (
    <main className="h-full">
      <div className="">
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <div
            className={`flex items-center justify-center rounded-full bg-stone-300 p-3 dark:bg-slate-700`}
          >
            <LuNotebookText className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </div>

          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            No notes found
          </p>
          {/* 
        <p className="medium:text-sm text-center text-xs text-stone-500"></p> */}
        </div>
      </div>
    </main>
  );
}
