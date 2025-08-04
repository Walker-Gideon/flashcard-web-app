import { useNote } from "../../../../context/NoteContext";
import Input from "../../../../ui/Input";

export default function CreateNote({
  onTitleChange,
  onContentChange,
  disabled,
}) {
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

Select text and use the formatting buttons above to apply:
• Bold formatting
• Italic formatting  
• Underline formatting
• Heading styles

Keyboard shortcuts:
• Ctrl+B for bold
• Ctrl+I for italic  
• Ctrl+U for underline
• Ctrl+Shift+1 for H1
• Ctrl+Shift+2 for H2"
          value={content}
          onChange={onContentChange}
          onKeyDown={handleKeyDown}
          className="scroll-container h-full w-full resize-none bg-transparent text-sm leading-relaxed text-gray-900 placeholder:text-gray-500 focus:outline-none md:text-base dark:text-white dark:placeholder:text-gray-400"
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
              Select text and click <strong>B</strong> for bold formatting
            </div>
            <div>
              Select text and click <em>I</em> for italic formatting
            </div>
            <div>
              Select text and click <u>U</u> for underline formatting
            </div>
            <div>
              Select text and click <strong>H1</strong> for large heading
            </div>
            <div>
              Select text and click <strong>H2</strong> for medium heading
            </div>
            <div className="mt-2 text-gray-400">
              Or use keyboard shortcuts: Ctrl+B, Ctrl+I, Ctrl+U
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
