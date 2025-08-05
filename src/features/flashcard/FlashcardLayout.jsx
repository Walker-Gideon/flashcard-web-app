import { useFlash } from "../../context/FlashcardContext";
import ChatLayout from "../chat/ChatLayout";
import CreateFlashcard from "./CreateFlashcard";
import FlashcardInit from "./FlashcardInit";

export default function FlashcardLayout() {
  const { showCreateFlashcard } = useFlash();

  return (
    <div className="h-screen">
      <div className="">
        {!showCreateFlashcard ? <FlashcardInit /> : <CreateFlashcard />}
      </div>

      <ChatLayout />
    </div>
  );
}
