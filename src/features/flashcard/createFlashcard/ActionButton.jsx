import { useFlash } from "../../../context/FlashcardContext";
import Button from "../../../ui/Button";
import useLazyLoading from "../../../ui/LazyLoading";

export default function ActionButton() {
  const {
    setShowCreateFlashcard,
    setPairs,
    pairs,
    setTags,
    editMode,
    setEditTags,
    setEditPairs,
    setEditFlashcardId,
    setShowPreview,
    controlAction
  } = useFlash();
  const lazyLoading = useLazyLoading(setShowCreateFlashcard, 1000);
  const lazyLoadingPreview = useLazyLoading(setShowPreview, 1000);

  console.log("controlAction", controlAction)

  const isButtonDisabled = pairs.some(
    (pair) => pair.term.trim() === "" || pair.definition.trim() === "",
  );

  function handleCancel(e) {
    e.preventDefault();

    if (editMode) {
      lazyLoadingPreview(true);

      setTimeout(() => {
        setEditPairs([
          { term: "", definition: "" },
          { term: "", definition: "" },
        ]);
        setEditTags("");
        setEditFlashcardId("");
      }, 1000);
    } else {
      lazyLoading(false);

      setTimeout(() => {
        setPairs([
          { term: "", definition: "" },
          { term: "", definition: "" },
        ]);
        setTags("");
      }, 1000);
    }
  }

  return (
    <div className="medium:pt-10 justify-end flex  gap-3 pt-7">
      <Button
        variant="outline"
        classname="primaryButton px-12"
        onClick={handleCancel}
      >
        Cancel
      </Button>

      <Button
        variant="outline"
        type="submit"
        disabled={editMode ? null : isButtonDisabled}
        classname="primaryButton sm:py-1 sm:px-3 disable: disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {editMode ? "Save" : "Create"} Flashcard
      </Button>
    </div>
  );
}
