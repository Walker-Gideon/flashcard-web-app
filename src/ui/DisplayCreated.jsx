import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { RiDeleteBin5Line } from "react-icons/ri";
import Button from "./Button";
import { useNote } from "../context/NoteContext";

export default function DisplayCreated({ title, timing }) {
  const { setNotes } = useNote();

  const handleDeleteNote = async (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    try {
      await deleteDoc(doc(db, "users", user.uid, "notes", noteId));

      // Update UI without refetching
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

      alert("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note");
    }
  };

  return (
    <div
      role="button"
      className="my-1 flex w-full cursor-pointer items-center justify-between border-b border-stone-300 px-4 py-2 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700"
    >
      <div className="">
        <h1 className="medium:text-sm mb-1 text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="medium:text-xs text-sm text-slate-500 dark:text-slate-400">
          {timing}
        </p>
      </div>

      <Button
        variant="outline"
        onClick={handleDeleteNote}
        classname="text-slate-700 dark:text-slate-200"
      >
        <RiDeleteBin5Line className="h-5 w-5" />
      </Button>
    </div>
  );
}
