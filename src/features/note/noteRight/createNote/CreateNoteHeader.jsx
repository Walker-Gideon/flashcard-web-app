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
    notes,
    currentNote,
    readAlredyNote,
  } = useNote();
  const { user } = useAuth();

  async function saveNote(e) {
    e.preventDefault();

    if (!currentNote.title || !currentNote.content) return;

    // If editing, check if any changes were made
    if (currentNote.id) {
      const originalNote = notes.find((note) => note.id === currentNote.id);
      if (
        originalNote &&
        originalNote.title === currentNote.title &&
        originalNote.content === currentNote.content &&
        originalNote.noteName === currentNote.noteName
      ) {
        console.log("No changes detected — not saving.");
        return;
      }
    }

    try {
      await setDoc(
        doc(db, "users", user.uid, "notes", currentNote.id || uuidv4()),
        {
          title: currentNote.title,
          content: currentNote.content,
          noteName: currentNote.noteName,
          updatedAt: new Date(),
          ...(currentNote.id ? {} : { createdAt: new Date() }), // Keep createdAt only for new notes
        },
        { merge: true }, // ✅ Ensures update instead of overwrite
      );

      console.log(
        currentNote.id
          ? "Note updated successfully!"
          : "Note created successfully!",
      );
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
      <h1 className="maxmid:w-full w-48 truncate overflow-hidden text-sm font-semibold whitespace-nowrap text-slate-500 dark:text-slate-400">
        {readAlredyNote ? currentNote.noteName : "Untitled Note"}
      </h1>

      {readAlredyNote ? (
        <Button
          variant="primary"
          classname={"py-2 border-0"}
          color={
            "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          }
          // disabled={isSubmittingNote || !(title || content)}
          onClick={saveNote}
        >
          {/* {isSubmittingNote ? "Saving..." : "Save Note"} */}
          Save
        </Button>
      ) : (
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
      )}
    </header>
  );
}
