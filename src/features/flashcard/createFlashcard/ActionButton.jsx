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
  } = useFlash();
  const lazyLoading = useLazyLoading(setShowCreateFlashcard, 1000);
  const lazyLoadingPreview = useLazyLoading(setShowPreview, 1000);

  const isButtonDisabled = pairs.some(
    (pair) => pair.term.trim() === "" || pair.definition.trim() === "",
  );

  // on edit the cancle button will take you back to the flashcard set
  function handleCancel(e) {
    e.preventDefault();

    if (editMode) {
      lazyLoadingPreview(true);

      setEditPairs([
        { term: "", definition: "" },
        { term: "", definition: "" },
      ]);
      setEditTags("");
      setEditFlashcardId("");
    } else {
      lazyLoading(false);

      setPairs([
        { term: "", definition: "" },
        { term: "", definition: "" },
      ]);
      setTags("");
    }
  }

  return (
    <div className="medium:pt-10 medium:justify-end flex justify-center gap-3 pt-7">
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
