import { useFlash } from "../../context/FlashcardContext";
import CreateFlashcard from "./CreateFlashcard";
import FlashcardInit from "./FlashcardInit";
import { LuCheck } from "react-icons/lu";

export default function FlashcardLayout() {
  const { showCreateFlashcard, successFlashcard } = useFlash();

  return (
    <div>
      {!showCreateFlashcard ? <FlashcardInit /> : <CreateFlashcard />}

      {/* Will use this for different stuff */}
      {successFlashcard && (
        <Toast
          animation={successFlashcard}
          notify={true}
          classname={"text-green-600 dark:text-green-400 h-10 max-w-55"}
        >
          <LuCheck className="mr-1 h-4 w-4" />
          <span>Flashcard save successfully</span>
        </Toast>
      )}
    </div>
  );
}
