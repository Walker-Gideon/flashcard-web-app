import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { AnimatePresence } from "motion/react";
import NoteLeftLayout from "./noteLeft/NoteLeftLayout";
import NoteRightLayout from "./noteRight/NoteRightLayout";
import Notify from "../../ui/Notify";
import { useNote } from "../../context/NoteContext";
import Toast from "../../ui/Toast";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";

export default function NoteLayout() {
  const {
    noteNotify,
    setNoteNotify,
    noteToDelete,
    setReadAlredyNote,
    setCreateNote,
  } = useNote();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteNote = async (noteId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", noteId));

      setNoteNotify(false);
      setTimeout(() => {
        setLoadingDelete(true);

        setTimeout(() => {
          setCreateNote(false);
          setReadAlredyNote(false);
          setLoadingDelete(false);
        }, 3000);
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
      <AnimatePresence>
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
      </AnimatePresence>

      {/* Toast after deletion */}
      <AnimatePresence>
        {loadingDelete && (
          <Toast
            animation={loadingDelete}
            notify={true}
            classname={"text-green-600 dark:text-green-400 h-10 max-w-60"}
          >
            <LuCheck className="mr-1 h-4 w-4" />
            <span>Note deleted successfully!</span>
          </Toast>
        )}
      </AnimatePresence>
    </div>
  );
}
