import { useFlash } from "../../context/FlashcardContext";
import CreateFlashcard from "./CreateFlashcard";
import FlashcardInit from "./FlashcardInit";

export default function FlashcardLayout() {
  const { showCreateFlashcard } = useFlash();

  return (
    <div className="">
      {!showCreateFlashcard ? <FlashcardInit /> : <CreateFlashcard />}
    </div>
  );
}
