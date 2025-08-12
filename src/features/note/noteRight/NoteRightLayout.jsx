import { useNote } from "../../../context/NoteContext";
import CreateNoteLayoout from "./createNote/CreateNoteLayoout";
import NoteMainPrompt from "./NoteMainPrompt";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function NoteRightLayout() {
  const { createNote } = useNote();

  /*
  const editor = useEditor({
    extensions: [
      StarterKit, // Bold, Italic, Headings, Lists, etc.
      // Underline, // Adds underline
    ],
    content: "<p>Start writing your note...</p>",
  });
  
  if (!editor) {
    return null;
  }
  */

  return (
    <div>
      {!createNote ? (
        <div className="medium:block hidden">
          <NoteMainPrompt />
        </div>
      ) : (
        <CreateNoteLayoout />
        /* 
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <button onClick={() => editor.chain().focus().toggleBold().run()}>
              Bold
            </button>
            <button onClick={() => editor.chain().focus().toggleItalic().run()}>
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              Underline
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </button>
          </div>

          <EditorContent editor={editor} style={{ minHeight: "150px" }} />
        </div>
        */
      )}
    </div>
  );
}
