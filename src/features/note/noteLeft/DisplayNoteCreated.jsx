export default function DisplayNoteCreated() {
  return (
    <div className="">
      <div
        role="button"
        className="my-1 w-full cursor-pointer px-4 py-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700"
      >
        <h1 className="medium:text-sm mb-1 text-slate-900 dark:text-white">
          Title
        </h1>

        <p className="medium:text-xs text-sm text-slate-500 dark:text-slate-400">
          <span>X</span> <span>days ago</span>
        </p>
      </div>
    </div>
  );
}
