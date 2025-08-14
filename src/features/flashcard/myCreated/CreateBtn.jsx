import Button from "../../../ui/Button";
import { LuCheckCheck } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { useFlash } from "../../../context/FlashcardContext";
import useLazyLoading from "../../../ui/LazyLoading";

export default function CreateBtn({ isVisible, setIsVisible }) {
  const { setShowPreview, setShowCreateFlashcard } = useFlash();

  const lazyLoading = useLazyLoading(setShowPreview, 1000);
  const lazyLoadingFlashcard = useLazyLoading(setShowCreateFlashcard, 1000);

  // Handler to go back to edit mode
  function handleBackToEdit(bool) {
    lazyLoading(bool);
    setIsVisible(!isVisible);
  }

  // Handler to go back to flashcard scren
  function handleBackToFlashcard() {
    setShowCreateFlashcard(true);

    // handleBackToEdit(false);
    setIsVisible(!isVisible);
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
        onClick={() => handleBackToEdit(false)}
        classname={styling.button}
      >
        <LuPencilLine className={styling.icon} />
        Edit
      </Button>

      <hr className="w-full border border-stone-300 dark:border-slate-700" />

      <Button
        variant="outline"
        onClick={handleBackToFlashcard}
        classname={styling.button}
      >
        <LuCheckCheck className={styling.icon} />
        Done
      </Button>
    </>
  );
}
