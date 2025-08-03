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
      <Overlay model={true}>
        <motion.div
          initial={{ y: "-400%" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          animate={{ y: "0" }}
          // ${classname} Type === "success" ? "bg-green-600" : "bg-red-600" px-6
          className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-sm bg-green-600 p-2 text-sm text-white shadow-lg`}
        >
          <Input
            type="text"
            name="noteTitle"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            placeholder="Enter note title here..."
          />

          <div className="">
            <Button>Skip</Button>
            <Button>Save</Button>
          </div>
        </motion.div>
      </Overlay>
    </div>
  );
}
