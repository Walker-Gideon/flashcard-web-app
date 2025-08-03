import { useState } from "react";
import { LuX } from "react-icons/lu";
import { LuLoader } from "react-icons/lu";
import { useNote } from "../../../../context/NoteContext";
import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";
import Model from "../../../../ui/Model";

export default function CreateNoteLayoout() {
  const {
    setTitle,
    setContent,
    isSubmittingNote,
    setIsSubmittingNote,
    addNoteTitle,
    setAddNoteTitle,
    setCreateNote,
  } = useNote();
  const [error, setError] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const handleSaveNote = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmittingNote(true);

    setTimeout(() => {
      setCreateNote(false);
      setTitle("");
      setContent("");
    }, 1000);

    setAddNoteTitle((show) => !show);
  };

  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <form onSubmit={handleSaveNote} className="flex flex-grow flex-col">
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
      {addNoteTitle && (
        <Model
          type="text"
          name="noteTitle"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          placeholder="Enter note title here..."
          btnFirstText="Cancel"
          btnSecondText="Save"
        />
      )}
    </div>
  );
}
