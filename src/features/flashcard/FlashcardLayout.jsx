import { deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { useFlash } from "../../context/FlashcardContext";
import Notify from "../../ui/Notify";
import CreateFlashcardLayout from "./CreateFlashcardLayout";
import FlashcardInit from "./FlashcardInit";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import Toast from "../../ui/Toast";
import { LuCheck } from "react-icons/lu";

export default function FlashcardLayout() {
  const {
    showCreateFlashcard,
    setFlashcardNotify,
    flashcardNotify,
    setReadAlredyFlashcard,
    flashcardToDelete,
  } = useFlash();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteFlashcard = async (flashcardsId) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "flashcards", flashcardsId));

      setFlashcardNotify(false);

      setTimeout(() => {
        setLoadingDelete(true);

        setTimeout(() => {
          setReadAlredyFlashcard(false);
          setLoadingDelete(false);
        }, 3000);
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

      {/* Toast after deletion */}
      <AnimatePresence>
        {loadingDelete && (
          <Toast
            animation={loadingDelete}
            notify={true}
            classname={"text-green-600 dark:text-green-400 h-10 max-w-65"}
          >
            <LuCheck className="mr-1 h-4 w-4" />
            <span>Flashcard deleted successfully!</span>
          </Toast>
        )}
      </AnimatePresence>
    </div>
  );
}
