import { useFlash } from "../../../context/FlashcardContext";
import Button from "../../../ui/Button";
import useLazyLoading from "../../../ui/LazyLoading";

export default function ActionButton() {
  const { setShowCreateFlashcard, setPairs, setTags } = useFlash();
  const lazyLoading = useLazyLoading(setShowCreateFlashcard, 1000);

  function handleCreateFlashcard(e) {
    e.preventDefault();
    lazyLoading(false);

    setPairs([
      { term: "", definition: "" },
      { term: "", definition: "" },
    ]);
    setTags("");
  }

  return (
    <div className="medium:pt-10 medium:justify-end flex justify-center gap-3 pt-7">
      <Button
        variant="outline"
        classname="primaryButton px-12"
        onClick={handleCreateFlashcard}
      >
        Cancel
      </Button>

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
