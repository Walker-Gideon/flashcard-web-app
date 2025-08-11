import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { LuCheck } from "react-icons/lu";
import { useNote } from "../../../../context/NoteContext";
import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";
import Model from "../../../../ui/Model";
import { AnimatePresence } from "motion/react";
import Toast from "../../../../ui/Toast";

export default function CreateNoteLayoout() {
  const {
    title,
    content,
    noteName,
    setTitle,
    setContent,
    setNoteName,
    isSubmittingNote,
    setIsSubmittingNote,
    addNoteTitle,
    setAddNoteTitle,
    setCreateNote,
    setDisplayCreatedNote,
  } = useNote();
  const [error, setError] = useState("");

  const handleSubmitting = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("User not logged in");
      return;
    }

    const noteId = uuidv4(); // unique ID for each note

    const noteData = {
      title,
      content,
      noteName,
      createdAt: new Date(),
    };

    try {
      await setDoc(doc(db, "users", user.uid, "notes", noteId), noteData);

      if (!noteName) {
        setAddNoteTitle(true);
      } else {
        setAddNoteTitle(false);
        setError("");
        setIsSubmittingNote(true);
      }

      // clear form
      setTimeout(() => {
        setCreateNote(false);
        setTitle("");
        setContent("");
        setNoteName("");
        setError("");
        setIsSubmittingNote(false);
        setDisplayCreatedNote(true);
      }, 3000);
    } catch (error) {
      console.error("Error saving note: ", error.message);
    }
  };

  const handelCanale = async (e) => {
    e.preventDefault();
    setAddNoteTitle(false);
    setNoteName("");
  };

  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <form onSubmit={handleSubmitting} className="flex flex-grow flex-col">
        <CreateNoteHeader />

        <main className="medium:h-[90vh] scroll-container h-[74vh] overflow-y-scroll">
          <CreateNoteSubHeader />
          <CreateNote
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            disabled={isSubmittingNote}
          />
        </main>

        {error && (
          <Toast
            animation={error}
            notify={true}
            classname={"text-red-600 dark:text-red-400"}
          >
            <LuX className="mr-1 h-4 w-4" />
            <span>{error}</span>
          </Toast>
        )}

        {isSubmittingNote && (
          <Toast
            animation={isSubmittingNote}
            notify={true}
            classname={"text-green-600 dark:text-green-400"}
          >
            <LuCheck className="mr-1 h-4 w-4" />
            <span>Note save successiful</span>
          </Toast>
        )}
      </form>

      {/* Notification for delete */}

      <AnimatePresence>
        {addNoteTitle && (
          <Model
            type="text"
            name="noteTitle"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder="Name this Note"
            animation={addNoteTitle}
            btnFirstText="Cancel"
            onClickFirst={handelCanale}
            btnSecondText="Save"
            onClickSecond={handleSubmitting}
            required={true}
            disabledSec={!noteName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
