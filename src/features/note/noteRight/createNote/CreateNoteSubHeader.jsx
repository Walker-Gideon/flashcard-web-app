import { useState } from "react";
import Button from "../../../../ui/Button";
import { LuAlignLeft } from "react-icons/lu";
import { LuAlignJustify } from "react-icons/lu";
import { LuAlignRight } from "react-icons/lu";
import { LuAlignCenter } from "react-icons/lu";

export default function CreateNoteSubHeader({ editor }) {
  const [select, setSelect] = useState("h1");

  const base =
    "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700 transition-all duration-200";
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
    <div
      className={`mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700`}
    >
      <Button
        variant="outline"
        // classname={styling.h1}
        classname={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
      >
        H1
      </Button>

      <Button
        variant="outline"
        classname={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
      >
        H2
      </Button>

      <Button
        variant="outline"
        classname={editor.isActive("bold") ? "is-active" : ""}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        B
      </Button>

      <Button
        variant="outline"
        classname={editor.isActive("italic") ? "is-active" : ""}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        I
      </Button>

      <Button
        variant="outline"
        classname={styling.underline}
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        title="Underline (Ctrl+U)"
      >
        U
      </Button>

      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHighlight().run();
        }}
        classname="mt-2 rounded border border-yellow-400 bg-yellow-200 px-4 py-1"
      >
        H
      </Button>

      {/* Alignments */}
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        classname={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
      >
        <LuAlignLeft />
      </Button>
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        classname={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
      >
        <LuAlignCenter />
      </Button>
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        classname={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
      >
        <LuAlignRight />
      </Button>
      <Button
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
        classname={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
      >
        <LuAlignJustify />
      </Button>
    </div>
  );
}
