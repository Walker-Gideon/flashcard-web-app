import { useState } from "react";
import { useNote } from "../../../../context/NoteContext";
import Button from "../../../../ui/Button";

export default function CreateNoteSubHeader() {
  const { dispatch } = useNote();
  const [select, setSelect] = useState("h1");

  const base =
    "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700";
  const primColors = "bg-slate-500 text-white hover:bg-slate-600";
  const secColors =
    "text-slate-900  hover:text-white dark:text-white hover:bg-slate-600";
  const styling = {
    h1: base + ` px-2.5 ${select === "h1" ? `${primColors}` : `${secColors}`}`,
    h2: base + ` ${select === "h2" ? `${primColors}` : `${secColors}`}`,
    bold:
      base +
      ` font-bold px-3 ${select === "bold" ? `${primColors}` : `${secColors}`}`,
    italic:
      base +
      ` italic px-3.5 ${select === "italic" ? `${primColors}` : `${secColors}`}`,
    underline:
      base +
      ` underline px-3 ${select === "underline" ? `${primColors}` : `${secColors}`}`,
  };

  return (
    <div className="mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700">
      <Button
        variant="outline"
        classname={styling.h1}
        onClick={(e) => {
          e.preventDefault();

          setSelect("h1");
          dispatch({ type: "SHOW_NORMAL_SIZE" });
        }}
      >
        H1
      </Button>

      <Button
        variant="outline"
        classname={styling.h2}
        onClick={(e) => {
          e.preventDefault();

          setSelect("h2");
          dispatch({ type: "SHOW_INCREASE_SIZE" });
        }}
      >
        H2
      </Button>

      <Button
        variant="outline"
        classname={styling.bold}
        onClick={(e) => {
          e.preventDefault();

          setSelect("bold");
          dispatch({ type: "SHOW_BOLD" });
        }}
      >
        B
      </Button>

      <Button
        variant="outline"
        classname={styling.italic}
        onClick={(e) => {
          e.preventDefault();

          setSelect("italic");
          dispatch({ type: "SHOW_ITALIC" });
        }}
      >
        I
      </Button>

      <Button
        variant="outline"
        classname={styling.underline}
        onClick={(e) => {
          e.preventDefault();

          setSelect("underline");
          dispatch({ type: "SHOW_UNDERLINE" });
        }}
      >
        U
      </Button>
    </div>
  );
}
