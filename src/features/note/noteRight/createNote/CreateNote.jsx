import { useNote } from "../../../../context/NoteContext";
import Input from "../../../../ui/Input";
import { EditorContent } from "@tiptap/react";

export default function CreateNote({
  onTitleChange,
  onContentChange,
  disabled,
  editor,
}) {
  const { title, content, currentNote, setCurrentNote, readAlredyNote } =
    useNote();

  if (!editor) {
    return null;
  }

  return (
    <div className="mx-4 my-2 h-full py-2">
      <Input
        type="text"
        id="note-title"
        name="title"
        placeholder="Title"
        value={readAlredyNote ? currentNote.title : title}
        onChange={
          readAlredyNote
            ? (e) => setCurrentNote({ ...currentNote, title: e.target.value })
            : onTitleChange
        }
        classname="w-full border-b border-stone-300 dark:border-slate-700 bg-transparent pb-2 text-xl font-bold text-slate-900 placeholder:text-gray-400 focus:outline-none medium:text-2xl dark:text-white dark:placeholder:text-gray-500"
        disabled={disabled}
      />

      <div className="mt-4 h-full flex-grow text-gray-900 placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-400">
        {/*
        <textarea
          id="note-content"
          name="content"
          placeholder="Start writing your note here..."
          value={readAlredyNote ? currentNote.content : content}
          onChange={
            readAlredyNote
              ? (e) =>
                  setCurrentNote({ ...currentNote, content: e.target.value })
              : onContentChange
          }
          className={`scroll-container h-full w-full resize-none bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none dark:text-white dark:placeholder:text-gray-400 ${textSize}`}
          disabled={disabled}
          style={{
            lineHeight: "1.6",
          }}
        />
            */}

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
