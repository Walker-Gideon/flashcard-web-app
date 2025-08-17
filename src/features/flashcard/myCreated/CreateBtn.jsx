import Button from "../../../ui/Button";
import { LuCheckCheck } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { useFlash } from "../../../context/FlashcardContext";
import useLazyLoading from "../../../ui/LazyLoading";

export default function CreateBtn({ isVisible, setIsVisible }) {
  const {
    setShowPreview,
    setShowCreateFlashcard,
    setEditMode,
    setEditFlashcardId,
    setEditTags,
    setEditPairs,
    editFlashcardData,
  } = useFlash();

  const lazyLoading = useLazyLoading(setShowPreview, 1000);
  const lazyLoadingFlashcard = useLazyLoading(setShowCreateFlashcard, 1000);

  function isButtonVisible() {
    setIsVisible(!isVisible);
  }

  function handleBackToEdit() {
    lazyLoading(false);
    isButtonVisible();

    // State to manage the editing flashcard
    if (Object.keys(editFlashcardData).length !== 0) {
      console.log(`Flashcard data in edit button`, editFlashcardData);
      setEditMode(true);
      setEditFlashcardId(editFlashcardData.id);
      setEditTags(editFlashcardData.tags || "");
      setEditPairs(editFlashcardData.pairs || []);
    }
  }

  function handleToFlashcard() {
    lazyLoadingFlashcard(false);
    isButtonVisible();
    handleBackToEdit();
  }

  const styling = {
    button:
      "w-full text-start px-4 hover:bg-slate-600 transition-colors duration-300 py-2 transition-colors duration-500 hover:rounded-sm flex items-center gap-2",
    icon: "bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 p-1 h-5 w-5 rounded-sm",
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleBackToEdit}
        classname={styling.button}
      >
        <LuPencilLine className={styling.icon} />
        Edit
      </Button>

      <hr className="w-full border border-stone-300 dark:border-slate-700" />

      <Button
        variant="outline"
        onClick={handleToFlashcard}
        classname={styling.button}
      >
        <LuCheckCheck className={styling.icon} />
        Done
      </Button>
    </>
  );
}
