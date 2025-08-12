import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";

import NoteLeftLayout from "./noteLeft/NoteLeftLayout";
import NoteRightLayout from "./noteRight/NoteRightLayout";
import Notify from "../../ui/Notify";
import { useNote } from "../../context/NoteContext";

export default function NoteLayout() {
  const {
    noteNotify,
    setNoteNotify,
    setNotes,
    noteToDelete,
    setReadAlredyNote,
    setCreateNote,
  } = useNote();

  const handleDeleteNote = async (noteId) => {
    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", noteId));

      // Update UI without refetching
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      setNoteNotify(false);
      setTimeout(() => {
        setCreateNote(false);
        setReadAlredyNote(false);
      }, 500);
    } catch (error) {
      console.error("Error deleting note:", error);
      return error;
    }
  };

  return (
    <div className="medium:grid medium:grid-cols-[17.5rem_auto] h-screen w-full overflow-hidden">
      <NoteLeftLayout />
      <NoteRightLayout />

      {/* Notification for delete */}
      {noteNotify && (
        <Notify
          classname={`max-w-2xs medium:max-w-xs px-4 py-3 flex`}
          btnClass={`dark:text-slate-900 dark:border-stone-500 border-slate-500`}
          animation={noteNotify}
          message="Are you sure you want to delete this note? This action cannot be undone."
          btnFirstText="Cancel"
          onClickFirst={() => setNoteNotify((show) => !show)}
          btnSecondText="Delete"
          onClickSecond={() => handleDeleteNote(noteToDelete)}
        />
      )}
    </div>
  );
}
