import Button from "../../../../ui/Button";

export default function CreateNoteSubHeader() {
  const base =
    "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700 dark:text-white";
  const styling = {
    h1: base + " px-2.5",
    h2: base + "",
    bold: base + " font-bold px-3",
    italic: base + " italic px-3.5",
    underline: base + " underline px-3",
  };

  return (
    <div className="mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700">
      <Button
        variant="outline"
        classname={styling.h1}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        H1
      </Button>

      <Button
        variant="outline"
        classname={styling.h2}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        H2
      </Button>

      <Button
        variant="outline"
        classname={styling.bold}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        B
      </Button>

      <Button
        variant="outline"
        classname={styling.italic}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        I
      </Button>

      <Button
        variant="outline"
        classname={styling.underline}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        U
      </Button>
    </div>
  );
}
