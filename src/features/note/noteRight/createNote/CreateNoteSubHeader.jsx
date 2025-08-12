import Button from "../../../../ui/Button";
import { LuAlignLeft } from "react-icons/lu";
import { LuAlignJustify } from "react-icons/lu";
import { LuAlignRight } from "react-icons/lu";
import { LuAlignCenter } from "react-icons/lu";

const editingTools = [
  {
    text: "H1",
    style: "px-2.5",
    activeCheck: (editor) => editor.isActive("heading", { level: 1 }),
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    text: "H2",
    activeCheck: (editor) => editor.isActive("heading", { level: 2 }),
    command: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    text: "B",
    style: "font-bold px-[13px]",
    activeCheck: (editor) => editor.isActive("bold"),
    command: (editor) => editor.chain().focus().toggleBold().run(),
  },
  {
    text: "I",
    style: "italic px-[14px]",
    activeCheck: (editor) => editor.isActive("italic"),
    command: (editor) => editor.chain().focus().toggleItalic().run(),
  },
  {
    text: "U",
    style: "underline px-[11px]",
    activeCheck: (editor) => editor.isActive("underline"),
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
  },
  {
    text: "H",
    style: "px-[11px]",
    activeCheck: (editor) => editor.isActive("highlight"),
    command: (editor) => editor.chain().focus().toggleHighlight().run(),
  },
];

const textAlignButtons = [
  { align: "left", icon: LuAlignLeft },
  { align: "center", icon: LuAlignCenter },
  { align: "right", icon: LuAlignRight },
  { align: "justify", icon: LuAlignJustify },
];

export default function CreateNoteSubHeader({ editor }) {
  const styling = {
    base: "font-medium text-sm border p-2 rounded-sm cursor-pointer border-stone-300 dark:border-slate-700 transition-all duration-200",
    isActive: "bg-slate-500 text-white hover:bg-slate-600",
    notActive:
      "text-slate-900 hover:text-white dark:text-white hover:bg-slate-600",
  };

  return (
    <div
      className={`mx-4 flex h-16 items-center gap-2 border-b border-stone-300 dark:border-slate-700`}
    >
      {editingTools.map((data, index) => (
        <Button
          key={index}
          variant="outline"
          classname={`${data.style} ${styling.base} ${data.activeCheck(editor) ? `${styling.isActive}` : `${styling.notActive}`}`}
          onClick={(e) => {
            e.preventDefault();
            data.command(editor);
          }}
        >
          {data.text}
        </Button>
      ))}

      {textAlignButtons.map((btn, index) => (
        <Button
          key={index}
          variant="outline"
          classname={`px-[9.5px] py-[11px] ${styling.base} ${
            editor.isActive({ textAlign: btn.align })
              ? `${styling.isActive}`
              : `${styling.notActive}`
          }`}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign(btn.align).run();
          }}
        >
          <btn.icon />
        </Button>
      ))}
    </div>
  );
}
