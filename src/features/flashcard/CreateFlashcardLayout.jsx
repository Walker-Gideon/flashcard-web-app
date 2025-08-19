import { useFlash } from "../../context/FlashcardContext";
import CreateFlashcard from "./CreateFlashcard";
import CreatedLayout from "./myCreated/CreatedLayout";
import ReviewSummary from "./ReviewSummary";

export default function CreateFlashcardLayout() {
  const { showPreview, reviewComplete } = useFlash();

  return (
    <div>
      {showPreview ? (
        <>{reviewComplete ? <ReviewSummary /> : <CreatedLayout />}</>
      ) : (
        <CreateFlashcard />
      )}
    </div>
  );
}
