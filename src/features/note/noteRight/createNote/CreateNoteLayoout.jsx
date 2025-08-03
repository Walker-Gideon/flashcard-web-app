import { useState } from "react";
import { LuX } from "react-icons/lu";
import { LuLoader } from "react-icons/lu";
import { useNote } from "../../../../context/NoteContext";
import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";
import Overlay from "../../../../ui/Overlay";
import { motion } from "motion/react";
import Input from "../../../../ui/Input";
import Button from "../../../../ui/Button";
import Toast from "../../../../ui/Toast";

export default function CreateNoteLayoout() {
  const { setTitle, setContent, isSubmittingNote, setIsSubmittingNote } =
    useNote();
  const [error, setError] = useState("");
  const [noteTitle, setNoteTitle] = useState("");

  const handleSaveNote = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmittingNote(true);
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
      <Toast
        model={true}
        classname={"flex items-center justify-center flex-col"}
      >
        <div className="medium:max-w-md mt-10 w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
          <Input
            type="text"
            name="noteTitle"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Enter note title here..."
            classname={"w-full dark:placeholder:text-white dark: text-white"}
          />

          <div className="mt-4 flex items-center justify-between">
            <Button variant="outline" classname={"primaryButton"}>
              Skip
            </Button>
            <Button variant="outline" classname={"primaryButton"}>
              Save
            </Button>
          </div>
        </div>
      </Toast>
    </div>
  );
}
