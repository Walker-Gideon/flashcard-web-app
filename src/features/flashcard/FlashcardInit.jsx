import { LuNotebookText } from "react-icons/lu";
import Button from "../../ui/Button";
import PromptDisplay from "../../ui/PromptDisplay";
import FlashcardHeader from "./FlashcardHeader";
import { useFlash } from "../../context/FlashcardContext";
import useLazyLoading from "../../ui/LazyLoading";

export default function FlashcardInit() {
  const { setShowCreateFlashcard } = useFlash();
  const lazyLoading = useLazyLoading();

  function handleCreateFlashcard() {
    setShowCreateFlashcard((show) => !show);
  }

  return (
    <div>
      <FlashcardHeader text="My Flashcards" />

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
    </div>
  );
}
