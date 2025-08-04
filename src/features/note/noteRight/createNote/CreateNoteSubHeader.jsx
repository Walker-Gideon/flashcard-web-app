import { useState } from "react";
import { useNote } from "../../../../context/NoteContext";
import Button from "../../../../ui/Button";

export default function CreateNoteSubHeader() {
  // const { dispatch, applyFormatting, selectedText } = useNote();
  // const [select, setSelect] = useState("h1");

  /*
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
  */

  /*
  const handleFormatting = (formatType) => {
    if (selectedText.text) {
      // If text is selected, apply formatting to selected text
      applyFormatting(formatType);
    } else {
      // If no text is selected, just update the active button
      setSelect(formatType);
      dispatch({ type: `SHOW_${formatType.toUpperCase()}` });
    }
  };
  */

  /*
  return (
    <div className="mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700">
      <Button
        variant="outline"
        classname={styling.h1}
        onClick={(e) => {
          e.preventDefault();
          handleFormatting("h1");
        }}
      >
        H1
      </Button>

      <Button
        variant="outline"
        classname={styling.h2}
        onClick={(e) => {
          e.preventDefault();
          handleFormatting("h2");
        }}
      >
        H2
      </Button>

      <Button
        variant="outline"
        classname={styling.bold}
        onClick={(e) => {
          e.preventDefault();
          handleFormatting("bold");
        }}
      >
        B
      </Button>

      <Button
        variant="outline"
        classname={styling.italic}
        onClick={(e) => {
          e.preventDefault();
          handleFormatting("italic");
        }}
      >
        I
      </Button>

      <Button
        variant="outline"
        classname={styling.underline}
        onClick={(e) => {
          e.preventDefault();
          handleFormatting("underline");
        }}
      >
        U
      </Button>
    </div>
  );
  */

  const { applyFormatting, activeBtn } = useNote();

  const base =
    "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700 transition-all duration-200";
  const activeColors = "bg-emerald-500 text-white border-emerald-500";
  const inactiveColors =
    "text-slate-900 hover:text-white dark:text-white hover:bg-slate-600 hover:border-slate-600";

  const getButtonClass = (buttonType) => {
    const isActive = activeBtn === buttonType;
    return `${base} ${isActive ? activeColors : inactiveColors}`;
  };

  const buttons = [
    { type: "h1", label: "H1", className: "px-2.5" },
    { type: "h2", label: "H2", className: "px-2.5" },
    { type: "bold", label: "B", className: "px-3 font-bold" },
    { type: "italic", label: "I", className: "px-3.5 italic" },
    { type: "underline", label: "U", className: "px-3 underline" },
  ];

  return (
    <div className="mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700">
      {buttons.map(({ type, label, className }) => (
        <Button
          key={type}
          variant="outline"
          classname={`${getButtonClass(type)} ${className}`}
          onClick={(e) => {
            e.preventDefault();
            applyFormatting(type);
          }}
          title={`Apply ${type} formatting (${type === "bold" ? "Ctrl+B" : type === "italic" ? "Ctrl+I" : type === "underline" ? "Ctrl+U" : ""})`}
        >
          {label}
        </Button>
      ))}

      {/* Markdown Preview Toggle */}
      <div className="ml-auto">
        <Button
          variant="outline"
          classname={`${base} px-3 text-xs`}
          onClick={(e) => {
            e.preventDefault();
            // TODO: Toggle markdown preview
          }}
        >
          Preview
        </Button>
      </div>
    </div>
  );
}
