import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";
import { useFlash } from "../../context/FlashcardContext";
import { LuNotebookText } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import Button from "../../ui/Button";
import PromptDisplay from "../../ui/PromptDisplay";
import FlashcardHeader from "./FlashcardHeader";
import useLazyLoading from "../../ui/LazyLoading";
import UserCreatedFCLayout from "./userCreatedFlashcards/UserCreatedFCLayout";
import Input from "../../ui/Input";

export default function FlashcardInit() {
  const { user } = useAuth();
  const {
    setShowCreateFlashcard,
    queryFlashcard,
    setQueryFlashcard,
    displayCreatedFlashcard,
    setFilteredFlashcard,
  } = useFlash();
  const [hasFlashcard, setHasFlashcard] = useState(false);
  const lazyLoading = useLazyLoading(setShowCreateFlashcard, 1000);

  useEffect(() => {
    if (!user?.uid) return;

    const flashcardRef = collection(db, "users", user.uid, "flashcards");

    const unsubscribe = onSnapshot(flashcardRef, (snapshot) => {
      setHasFlashcard(snapshot.size > 0);
    });

    return () => unsubscribe();
  }, [user]);

  function handleCreateFlashcard() {
    lazyLoading(true);
  }

  const handleFlashcardSearch = (e) => {
    const value = e.target.value;
    setQueryFlashcard(value);

    // Show notes that match the typed term
    const results = displayCreatedFlashcard.filter((flashcard) =>
      flashcard.tags.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredFlashcard(results);
  };

  return (
    <div>
      <div className="medium:flex-col medium:mt-0 medium:p-0 medium:px-4 medium:items-end mt-8 flex w-full flex-col-reverse items-center gap-3 p-4">
        <FlashcardHeader
          text="My Flashcards"
          hasFlashcard={hasFlashcard}
          handleCreateFlashcard={handleCreateFlashcard}
        />

        {hasFlashcard && (
          <div className="medium:my-6 medium:max-w-80 middle:max-w-xl relative w-full">
            <Input
              type="text"
              name="query"
              value={queryFlashcard}
              onChange={handleFlashcardSearch}
              placeholder="Search flashcards"
              classname={
                "w-full px-2 bg-transparent dark:border-slate-700 dark:placeholder:text-slate-400 dark:text-white medium:right-0"
              }
            />
            <LuSearch className="absolute top-2.5 right-2 text-sm text-slate-600 dark:text-slate-300" />
          </div>
        )}
      </div>

      <>
        {hasFlashcard ? (
          <UserCreatedFCLayout />
        ) : (
          <div className="h-full">
            <PromptDisplay
              hight={"h-[80dvh]"}
              textPrim="You haven't created any flashcards yet."
              textSec={
                <span className="flex min-w-sm flex-col items-center">
                  'Get started by tapping "Create Flashcard".'
                </span>
              }
              icon={
                <LuNotebookText className="h-6 w-6 text-slate-600 dark:text-slate-300" />
              }
            >
              <Button
                variant="primary"
                classname={"mt-2 py-2 border-0"}
                color={
                  "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
                }
                onClick={handleCreateFlashcard}
              >
                Create Flashcard
              </Button>
            </PromptDisplay>
          </div>
        )}
      </>
    </div>
  );
}
