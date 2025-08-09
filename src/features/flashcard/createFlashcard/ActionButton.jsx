import { useFlash } from "../../../context/FlashcardContext";
import Button from "../../../ui/Button";
import useLazyLoading from "../../../ui/LazyLoading";

export default function ActionButton() {
  const { setShowCreateFlashcard } = useFlash();
  const lazyLoading = useLazyLoading(setShowCreateFlashcard, 1000);

  function handleCreateFlashcard(e) {
    e.preventDefault();
    lazyLoading(false);
  }

  return (
    <div className="medium:pt-10 flex justify-end gap-3 pt-7">
      {/* Cancel Button (UI only) */}
      <Button
        variant="outline"
        // type="button"
        // disabled:cursor-not-allowed disabled:opacity-80
        classname="primaryButton px-12"
        // disabled
        onClick={handleCreateFlashcard}
      >
        Cancel
      </Button>

      {/* Create Button (UI only) */}
      <Button
        variant="outline"
        type="submit"
        classname="primaryButton sm:py-1 sm:px-3"
      >
        Create Flashcard
      </Button>
    </div>
  );
}
