import { useNote } from "../../../../context/NoteContext";
import Input from "../../../../ui/Input";

export default function CreateNote({
  onTitleChange,
  onContentChange,
  disabled,
}) {
  const { title, content, activeBtn } = useNote();

  let textSize;
  if (activeBtn === "h1") {
    textSize = "text-sm";
  } else if (activeBtn === "h2") {
    textSize = "text-lg";
  } else if (activeBtn === "bold") {
    textSize = "font-bold";
  } else if (activeBtn === "italic") {
    textSize = "italic";
  } else if (activeBtn === "underline") {
    textSize = "underline";
  }

  return (
    <div className="mx-4 my-2 h-full py-2">
      <Input
        type="text"
        id="note-title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
        classname="w-full border-b border-stone-300 dark:border-slate-700 bg-transparent pb-2 text-xl font-bold text-slate-900 placeholder:text-gray-400 focus:outline-none medium:text-2xl dark:text-white dark:placeholder:text-gray-500"
        disabled={disabled}
      />

      <div className="mt-4 h-full flex-grow">
        <textarea
          id="note-content"
          name="content"
          placeholder="Start writing your note here..."
          value={content}
          onChange={onContentChange}
          className={`scroll-container h-full w-full resize-none bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none md:text-base dark:text-white dark:placeholder:text-gray-400 ${textSize}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
