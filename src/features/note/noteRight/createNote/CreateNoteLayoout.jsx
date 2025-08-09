import { doc, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../../firebase";
import { v4 as uuidv4 } from "uuid"; // to generate unique noteId\
import { useState } from "react";
import { LuX } from "react-icons/lu";
import { LuLoader } from "react-icons/lu";
import { useNote } from "../../../../context/NoteContext";
import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";
import Model from "../../../../ui/Model";
import { AnimatePresence } from "motion/react";

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
  } = useNote();
  const [error, setError] = useState("");
  const [isRequired, setIsRequired] = useState(true);
  const [isSaveClick, setIsSaveClick] = useState(false);

  /*
    if (!noteName) {
        setIsRequired(false);
        setAddNoteTitle(true);
      } else {
        setAddNoteTitle(false);
        setError("");
        setIsSubmittingNote(true);

        setTimeout(() => {
          setCreateNote(false);
          //
          setIsSubmittingNote(false);
        }, 2000);
      }
        */

  const handleSubmitting = async (e) => {
    e.preventDefault();
    setIsSaveClick(true);

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
      alert("Note saved successfully!");

      // clear form
      setTitle("");
      setContent("");
      setNoteName("");
      setError("");
    } catch (error) {
      console.error("Error saving note: ", error);
      alert(error.message);
    }
  };

  const handelCanale = async (e) => {
    e.preventDefault();
    setAddNoteTitle(false);

    if (isSaveClick) {
      console.log(isSaveClick + " I am " + isSaveClick);

      // we will save it on this without name
    }
  };

  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <form onSubmit={handleSubmitting} className="flex flex-grow flex-col">
        <CreateNoteHeader
          setIsRequired={setIsRequired}
          setIsSaveClick={setIsSaveClick}
        />

        <main className="medium:h-[90vh] scroll-container h-[74vh] overflow-y-scroll">
          <CreateNoteSubHeader />
          <CreateNote
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            disabled={isSubmittingNote}
          />
        </main>

        {error && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-red-600 dark:text-red-400">
            <LuX className="mr-1 h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        {isSubmittingNote && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-blue-600 dark:text-blue-400">
            <LuLoader className="mr-1 h-4 w-4 animate-spin" />
            <span>Saving note...</span>
          </div>
        )}
      </form>

      {/* Call the toast here to display the save note */}
      <AnimatePresence>
        {addNoteTitle && (
          <Model
            type="text"
            name="noteTitle"
            value={noteName}
            onChange={(e) => setNoteName(e.target.value)}
            placeholder={`${isRequired ? `Enter note title here...` : `Please enter note title or Cancel and Save`} `}
            animation={addNoteTitle}
            btnFirstText="Cancel"
            onClickFirst={handelCanale}
            btnSecondText="Save"
            onClickSecond={handleSubmitting}
            required={isRequired}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
