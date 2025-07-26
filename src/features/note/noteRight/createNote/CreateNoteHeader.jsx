import Button from "../../../../ui/Button";

export default function CreateNoteHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-stone-300 px-4 dark:border-slate-700">
      <h1 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        Untitled Note
      </h1>

      <Button
        variant="primary"
        classname={"py-2 border-0"}
        color={
          "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
        }
        onClick={() => {}}
      >
        Save document
      </Button>
    </header>
  );
}
