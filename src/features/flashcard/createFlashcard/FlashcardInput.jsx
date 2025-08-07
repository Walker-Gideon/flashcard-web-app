import Input from "../../../ui/Input";

export default function FlashcardInput({ pairs, handlePairChange }) {
  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  return (
    <div className="medium:h-[41vh] medium:px-4 space-y-6 overflow-y-scroll">
      {pairs.map((pair, idx) => (
        <div
          key={idx}
          className="flex flex-col gap-4 rounded-lg bg-slate-50 p-4 dark:bg-slate-600"
        >
          {/* Term Input */}
          <div>
            <label htmlFor={`term-${idx}`} className={styling.label}>
              Term{" "}
              {pairs.length > 2 ? `#${idx + 1}` : idx === 0 ? "One" : "Two"}
            </label>
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
