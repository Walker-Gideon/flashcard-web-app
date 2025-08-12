import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useNote } from "../../../../context/NoteContext";
import Button from "../../../../ui/Button";
import { useAuth } from "../../../../context/AuthContext";
import { LuCheck } from "react-icons/lu";
import Toast from "../../../../ui/Toast";
import { useState } from "react";

export default function CreateNoteHeader() {
  const {
    title,
    content,
    setCreateNote,
    setTitle,
    setContent,
    setNoteName,
    isSubmittingNote,
    setAddNoteTitle,
    notes,
    currentNote,
    readAlredyNote,
    setReadAlredyNote,
    setSelectedNoteId,
  } = useNote();
  const { user } = useAuth();
  const [success, setSuccess] = useState(false);

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

    setSuccess(true);

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
        { merge: true }, // Ensures update instead of overwrite
      );

      // clear form
      setTimeout(() => {
        setSelectedNoteId(null);
        setCreateNote(false);
        setReadAlredyNote(false);
        setTitle("");
        setContent("");
        setNoteName("");
      }, 2000);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  }

  function handleSaveNote(e) {
    e.preventDefault();
    setAddNoteTitle(true);
  }

  const originalNote = notes.find((note) => note.id === currentNote.id);
  const unChanged =
    originalNote &&
    originalNote.title === currentNote.title &&
    originalNote.content === currentNote.content &&
    originalNote.noteName === currentNote.noteName;

  return (
    <>
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
            disabled={unChanged}
            onClick={saveNote}
          >
            Save Note
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

      {success && (
        <Toast
          animation={success}
          notify={true}
          classname={"text-green-600 dark:text-green-400 h-10 max-w-55"}
        >
          <LuCheck className="mr-1 h-4 w-4" />
          <span>Note updated successfully</span>
        </Toast>
      )}
    </>
  );
}
