import Button from "../../../ui/Button";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

export default function AddFlashcard({
  handleReducePair,
  handleAddPair,
  pairs,
  MAX_PAIRS,
}) {
  return (
    <div className="mt-5 flex items-center justify-end gap-2">
      {/* Reduce the flashcard nd this will disply only if you add a flashcard */}
      <Button
        variant={"outline"}
        type="button"
        onClick={handleReducePair}
        classname="primaryButton disabled:cursor-not-allowed disabled:opacity-80 flex items-center gap-2"
        disabled={pairs.length >= MAX_PAIRS}
      >
        <LuMinus className="h-4 w-4" />
      </Button>

      {/* Only show if under max pairs */}
      <Button
        variant={"outline"}
        type="button"
        onClick={handleAddPair}
        classname="primaryButton disabled:cursor-not-allowed disabled:opacity-80 flex items-center gap-2"
        disabled={pairs.length >= MAX_PAIRS}
      >
        <LuPlus className="h-4 w-4" />
      </Button>
    </div>
  );
}
