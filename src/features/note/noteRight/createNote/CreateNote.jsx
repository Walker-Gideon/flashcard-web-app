import { useNote } from "../../../../context/NoteContext";
import Input from "../../../../ui/Input";

export default function CreateNote({
  onTitleChange,
  onContentChange,
  disabled,
  editor,
}) {
  const {
    title,
    content,
    activeBtn,
    currentNote,
    setCurrentNote,
    readAlredyNote,
  } = useNote();

  let textSize;
  if (activeBtn === "h1") {
    textSize = "text-sm md:text-base";
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
        value={readAlredyNote ? currentNote.title : title}
        onChange={
          readAlredyNote
            ? (e) => setCurrentNote({ ...currentNote, title: e.target.value })
            : onTitleChange
        }
        classname="w-full border-b border-stone-300 dark:border-slate-700 bg-transparent pb-2 text-xl font-bold text-slate-900 placeholder:text-gray-400 focus:outline-none medium:text-2xl dark:text-white dark:placeholder:text-gray-500"
        disabled={disabled}
      />

      <div className="mt-4 h-full flex-grow">
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
      </div>

      {/* Now in use */}
      <div className="">{editor}</div>

      {/* Formatting Help 
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <details className="cursor-pointer">
          <summary className="hover:text-gray-700 dark:hover:text-gray-300">
            Formatting Help
          </summary>
          <div className="mt-2 space-y-1 pl-4">
            <div>
              Select text and click <strong>B</strong> for bold formatting
              (Ctrl+B)
            </div>
            <div>
              Select text and click <em>I</em> for italic formatting (Ctrl+I)
            </div>
            <div>
              Select text and click <u>U</u> for underline formatting (Ctrl+U)
            </div>
            <div>
              Select text and click <strong>H1</strong> for large heading
              (Ctrl+Shift+1)
            </div>
            <div>
              Select text and click <strong>H2</strong> for medium heading
              (Ctrl+Shift+2)
            </div>
            <div className="mt-2 text-gray-400">
              Or use keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+Shift+1,
              Ctrl+Shift+2
            </div>
          </div>
        </details>
      </div>
      */}
    </div>
  );
}
