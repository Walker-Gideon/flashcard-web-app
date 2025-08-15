import { useFlash } from "../../context/FlashcardContext";
import CreateFlashcardLayout from "./CreateFlashcardLayout";
import FlashcardInit from "./FlashcardInit";

export default function FlashcardLayout() {
  const { showCreateFlashcard } = useFlash();

  return (
    <div>
      {showCreateFlashcard ? <CreateFlashcardLayout /> : <FlashcardInit />}
    </div>
  );
}
