import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";

import { useFlash } from "../../context/FlashcardContext";
import Notify from "../../ui/Notify";
import CreateFlashcardLayout from "./CreateFlashcardLayout";
import FlashcardInit from "./FlashcardInit";
import { AnimatePresence } from "motion/react";

export default function FlashcardLayout() {
  const {
    showCreateFlashcard,
    setFlashcardNotify,
    flashcardNotify,
    setReadAlredyFlashcard,
    flashcardToDelete,
  } = useFlash();

  const handleDeleteFlashcard = async (flashcardsId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "flashcards", flashcardsId));

      setFlashcardNotify(false);
      setTimeout(() => {
        setReadAlredyFlashcard(false);
      }, 500);
    } catch (error) {
      console.error("Error deleting card:", error);
      return error;
    }
  };

  return (
    <div>
      {showCreateFlashcard ? <CreateFlashcardLayout /> : <FlashcardInit />}

      {/* Notification for delete */}
      <AnimatePresence>
        {flashcardNotify && (
          <Notify
            classname={`max-w-2xs medium:max-w-xs px-4 py-3 flex`}
            btnClass={`dark:text-slate-900 dark:border-stone-500 border-slate-500`}
            animation={flashcardNotify}
            message="Are you sure you want to delete this flashcard? This action cannot be undone."
            btnFirstText="Cancel"
            onClickFirst={() => setFlashcardNotify((show) => !show)}
            btnSecondText="Delete"
            onClickSecond={() => handleDeleteFlashcard(flashcardToDelete)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
