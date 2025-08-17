import { useFlash } from "../../../context/FlashcardContext";
import Button from "../../../ui/Button";
import { LuPlus } from "react-icons/lu";

export default function AddFlashcard() {
  const { pairs, MAX_PAIRS, setPairs, editMode, editPairs, setEditPairs } =
    useFlash();

  const handleAddPair = () => {
    const currentPairs = editMode ? editPairs : pairs;
    const newPair = { term: "", definition: "" };

    if (currentPairs.length < MAX_PAIRS) {
      const updated = [...currentPairs, newPair];
      editMode ? setEditPairs(updated) : setPairs(updated);
    }
  };

  return (
    <div className="mt-5 flex items-center justify-end gap-2">
      <Button
        variant={"outline"}
        type="button"
        onClick={handleAddPair}
        classname="primaryButton disabled:cursor-not-allowed disabled:opacity-80 flex items-center gap-2"
        disabled={pairs.length >= MAX_PAIRS}
      >
        <LuPlus className="h-4 w-4" /> Add card
      </Button>
    </div>
  );
}
