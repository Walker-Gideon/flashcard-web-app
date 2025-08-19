import { useFlash } from "../../context/FlashcardContext";
import CreateFlashcard from "./CreateFlashcard";
import CreatedLayout from "./myCreated/CreatedLayout";

export default function CreateFlashcardLayout() {
  const { showPreview } = useFlash();

  return <div>{showPreview ? <CreatedLayout /> : <CreateFlashcard />}</div>;
}
