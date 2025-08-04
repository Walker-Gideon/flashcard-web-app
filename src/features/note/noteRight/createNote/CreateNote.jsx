import { useNote } from "../../../../context/NoteContext";
import Input from "../../../../ui/Input";

export default function CreateNote({
  onTitleChange,
  onContentChange,
  disabled,
}) {
  /*
  const {
    title,
    content,
    activeBtn,
    setSelectedText,
    selectedText,
    applyFormatting,
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

  const handleTextSelection = (e) => {
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      setSelectedText({
        start,
        end,
        text: selectedText,
      });
    } else {
      setSelectedText({ start: 0, end: 0, text: "" });
    }
  };

  const handleKeyDown = (e) => {
    // Keyboard shortcuts for formatting
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          if (selectedText.text) {
            applyFormatting("bold");
          }
          break;
        case "i":
          e.preventDefault();
          if (selectedText.text) {
            applyFormatting("italic");
          }
          break;
        case "u":
          e.preventDefault();
          if (selectedText.text) {
            applyFormatting("underline");
          }
          break;
      }
    }
  };

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
          onSelect={handleTextSelection}
          onMouseUp={handleTextSelection}
          onKeyUp={handleTextSelection}
          onKeyDown={handleKeyDown}
          className={`scroll-container h-full w-full resize-none bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none dark:text-white dark:placeholder:text-gray-400 ${textSize}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
  */

  const { title, content, applyFormatting, setTextareaRef } = useNote();

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          applyFormatting("bold");
          break;
        case "i":
          e.preventDefault();
          applyFormatting("italic");
          break;
        case "u":
          e.preventDefault();
          applyFormatting("underline");
          break;
        case "1":
          if (e.shiftKey) {
            e.preventDefault();
            applyFormatting("h1");
          }
          break;
        case "2":
          if (e.shiftKey) {
            e.preventDefault();
            applyFormatting("h2");
          }
          break;
      }
    }
  };

  return (
    <div className="mx-4 my-2 h-full py-2">
      {/* Title Input */}
      <Input
        type="text"
        id="note-title"
        name="title"
        placeholder="Note Title"
        value={title}
        onChange={onTitleChange}
        classname="w-full border-b border-stone-300 dark:border-slate-700 bg-transparent pb-2 text-xl font-bold text-slate-900 placeholder:text-gray-400 focus:outline-none medium:text-2xl dark:text-white dark:placeholder:text-gray-500"
        disabled={disabled}
      />

      {/* Content Textarea */}
      <div className="mt-4 h-full flex-grow">
        <textarea
          ref={(ref) => setTextareaRef(ref)}
          id="note-content"
          name="content"
          placeholder="Start writing your note here... 

Use **bold**, *italic*, __underline__ for formatting
Use # for H1, ## for H2

Keyboard shortcuts:
• Ctrl+B for bold
• Ctrl+I for italic  
• Ctrl+U for underline
• Ctrl+Shift+1 for H1
• Ctrl+Shift+2 for H2"
          value={content}
          onChange={onContentChange}
          onKeyDown={handleKeyDown}
          className="scroll-container h-full w-full resize-none bg-transparent font-mono text-sm leading-relaxed text-gray-900 placeholder:text-gray-500 focus:outline-none md:text-base dark:text-white dark:placeholder:text-gray-400"
          disabled={disabled}
          style={{
            lineHeight: "1.6",
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", monospace',
          }}
        />
      </div>

      {/* Formatting Help */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        <details className="cursor-pointer">
          <summary className="hover:text-gray-700 dark:hover:text-gray-300">
            Formatting Help
          </summary>
          <div className="mt-2 space-y-1 pl-4">
            <div>
              <code>**bold text**</code> → <strong>bold text</strong>
            </div>
            <div>
              <code>*italic text*</code> → <em>italic text</em>
            </div>
            <div>
              <code>__underlined text__</code> → <u>underlined text</u>
            </div>
            <div>
              <code># Heading 1</code> → Large heading
            </div>
            <div>
              <code>## Heading 2</code> → Medium heading
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
