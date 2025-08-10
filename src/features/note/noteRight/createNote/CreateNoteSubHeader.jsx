import { useState } from "react";
import { useNote } from "../../../../context/NoteContext";
import Button from "../../../../ui/Button";

export default function CreateNoteSubHeader() {
  const { dispatch } = useNote();
  // , applyRichTextFormatting, selectedText
  const [select, setSelect] = useState("h1");

  const base =
    "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700 transition-all duration-200";
  const primColors = "bg-slate-500 text-white hover:bg-slate-600";
  const secColors =
    "text-slate-900  hover:text-white dark:text-white hover:bg-slate-600";

  // Visual feedback when text is selected
  // const hasSelectedText = selectedText.text && selectedText.text.length > 0;

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

  /*
  const handleFormatting = (formatType) => {
    if (hasSelectedText) {
      // If text is selected, apply formatting to selected text
      applyRichTextFormatting(formatType);
    } else {
      // If no text is selected, just update the active button
      setSelect(formatType);
      dispatch({ type: `SHOW_${formatType.toUpperCase()}` });
    }
  };
  */

  return (
    <div
      // ${hasSelectedText ? "bg-blue-50 dark:bg-blue-900/20" : ""}
      className={`mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700`}
    >
      <Button
        variant="outline"
        classname={styling.h1}
        onClick={(e) => {
          e.preventDefault();
          // handleFormatting("h1");
        }}
        title="Heading 1 (Ctrl+Shift+1)"
      >
        H1
      </Button>

      <Button
        variant="outline"
        classname={styling.h2}
        onClick={(e) => {
          e.preventDefault();
          // handleFormatting("h2");
        }}
        title="Heading 2 (Ctrl+Shift+2)"
      >
        H2
      </Button>

      <Button
        variant="outline"
        classname={styling.bold}
        onClick={(e) => {
          e.preventDefault();
          // handleFormatting("bold");
        }}
        title="Bold (Ctrl+B)"
      >
        B
      </Button>

      <Button
        variant="outline"
        classname={styling.italic}
        onClick={(e) => {
          e.preventDefault();
          // handleFormatting("italic");
        }}
        title="Italic (Ctrl+I)"
      >
        I
      </Button>

      <Button
        variant="outline"
        classname={styling.underline}
        onClick={(e) => {
          e.preventDefault();
          // handleFormatting("underline");
        }}
        title="Underline (Ctrl+U)"
      >
        U
      </Button>
    </div>
  );
}
