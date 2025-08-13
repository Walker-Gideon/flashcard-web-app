import { useFlash } from "../../../context/FlashcardContext";
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import { RiDeleteBin5Line } from "react-icons/ri";

export default function FlashcardInput() {
  const { pairs, setPairs } = useFlash();

  // Handler to update term or definition in a specific pair
  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...pairs];
    updatedPairs[index][field] = value;
    setPairs(updatedPairs);
  };

  // Deleting unwanted card
  const handleRemovePair = (indexToRemove) => {
    setPairs(pairs.filter((_, index) => index !== indexToRemove));
  };

  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  return (
    <div className="medium:h-[41vh] medium:px-4 h-[36vh] space-y-6 overflow-y-scroll">
      {pairs.map((pair, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-600"
        >
          {/* Term Input */}
          <div>
            <div className="flex w-full items-center justify-between">
              <label htmlFor={`term-${idx}`} className={styling.label}>
                Term{" "}
                {pairs.length > 2 ? `#${idx + 1}` : idx === 0 ? "One" : "Two"}
              </label>

              <Button
                variant={"outline"}
                type="button"
                // onClick={handleReducePair}
                classname="mb-1.5 text-slate-500 dark:text-slate-200"
                // disabled={pairs.length >= MAX_PAIRS}
              >
                <RiDeleteBin5Line className="h-4 w-4" />
              </Button>
            </div>
            <Input
              id={`term-${idx}`}
              name={`term-${idx}`}
              type="text"
              value={pair.term}
              onChange={(e) => handlePairChange(idx, "term", e.target.value)}
              classname={styling.inputArea}
              placeholder="Enter term..."
            />
          </div>

          {/* Definition Input */}
          <div>
            <label htmlFor={`definition-${idx}`} className={styling.label}>
              Definition{" "}
              {pairs.length > 2 ? `#${idx + 1}` : idx === 0 ? "One" : "Two"}
            </label>
            <textarea
              id={`definition-${idx}`}
              name={`definition-${idx}`}
              rows={2}
              value={pair.definition}
              onChange={(e) =>
                handlePairChange(idx, "definition", e.target.value)
              }
              className={`resize-none ${styling.inputArea}`}
              placeholder="Enter definition..."
            />
          </div>
        </div>
      ))}
    </div>
  );
}
