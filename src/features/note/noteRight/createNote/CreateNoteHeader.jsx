import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "../../../../context/NoteContext";
import Button from "../../../../ui/Button";
import { useAuth } from "../../../../context/AuthContext";

export default function CreateNoteHeader() {
  const {
    title,
    content,
    isSubmittingNote,
    setAddNoteTitle,
    noteName,
    currentNote,
  } = useNote();
  const { user } = useAuth();

  async function saveNote() {
    if (!currentNote.title || !currentNote.content) return;

    try {
      await setDoc(
        doc(db, "users", user.uid, "notes", currentNote.id || uuidv4()),
        {
          title: currentNote.title,
          content: currentNote.content,
          updatedAt: new Date(),
        },
      );
      console.log("Note saved successfully!");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  function handleSaveNote(e) {
    e.preventDefault();
    setAddNoteTitle(true);
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-stone-300 px-4 dark:border-slate-700">
      <h1 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
        {/* Need to write a logic to display the note name on click from the note display */}
        {noteName ? noteName : "Untitled Note"}
      </h1>

      <Button
        variant="primary"
        classname={"py-2 border-0"}
        color={
          "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        }
        disabled={isSubmittingNote || !(title || content)}
        onClick={handleSaveNote}
      >
        {isSubmittingNote ? "Saving..." : "Save Note"}
      </Button>
    </header>
  );
}
