import { useState } from "react";
import FlashcardHeader from "./FlashcardHeader";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import ActionButton from "./createFlashcard/ActionButton";
import AddFlashcard from "./createFlashcard/AddFlashcard";
import FlashcardInput from "./createFlashcard/FlashcardInput";

// CreateFlashcard Component - UI for creating and previewing a flashcard
// This component provides a form layout for creating a new flashcard with multiple terms/definitions,
// and a stylish preview section after creation. All sections are commented for clarity.

export default function CreateFlashcard() {
  // State to manage the list of term/definition pairs
  // Minimum 2 pairs, maximum 10 pairs (adjustable)
  const MIN_PAIRS = 2;
  const MAX_PAIRS = 10; // You can change this if you want more/less
  const [pairs, setPairs] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);

  // State for tags input
  const [tags, setTags] = useState("");

  // State to toggle between form and preview
  const [showPreview, setShowPreview] = useState(false);

  // Handler to add a new empty pair (if under max)
  const handleAddPair = () => {
    if (pairs.length < MAX_PAIRS) {
      setPairs([...pairs, { term: "", definition: "" }]);
    }
  };

  const handleReducePair = () => {
    // Get the id of the newly added and remove it
    // if (pairs.length < MAX_PAIRS) {
    //   setPairs([...pairs, { term: "", definition: "" }]);
    // }
  };

  // Handler to update term or definition in a specific pair
  const handlePairChange = (index, field, value) => {
    const updatedPairs = [...pairs];
    updatedPairs[index][field] = value;
    setPairs(updatedPairs);
  };

  // Handler for tags input
  const handleTagsChange = (e) => setTags(e.target.value);

  // Handler for Create Flashcard button
  const handleCreateFlashcard = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  // Handler to go back to edit mode
  const handleBackToEdit = () => setShowPreview(false);

  // --- Flashcard Preview UI ---
  if (showPreview) {
    return (
      <div className="mx-auto mt-10 h-screen max-w-xl overflow-y-scroll rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 shadow-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        {/* Preview Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            Your Flashcard Preview
          </h2>
          <button
            onClick={handleBackToEdit}
            className="rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
          >
            Back to Edit
          </button>
        </div>
        {/* Fun styling area - you can add color pickers, stickers, etc. here in the future */}
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Example: Tag display */}
          {tags && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {tags}
            </span>
          )}
          {/* Placeholder for future fun stuff */}
          {/* <button className="rounded bg-yellow-200 px-2 py-1 text-xs">🎨 Color</button> */}
        </div>
        {/* Flashcard Display Section */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg dark:border-blue-900 dark:bg-slate-800">
          <div className="mb-4 text-center text-lg font-semibold text-blue-600 dark:text-blue-300">
            Flashcard Terms & Definitions
          </div>
          <div className="space-y-6">
            {pairs.map((pair, idx) => (
              <div
                key={idx}
                className="group flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm transition hover:scale-[1.02] hover:border-blue-300 dark:border-blue-900 dark:bg-slate-700/60"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-200 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    Term{" "}
                    {pairs.length > 2
                      ? `#${idx + 1}`
                      : idx === 0
                        ? "One"
                        : "Two"}
                  </span>
                  <span className="text-base font-medium text-slate-800 dark:text-slate-100">
                    {pair.term || (
                      <span className="text-slate-400 italic">(empty)</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-green-200 px-2 py-0.5 text-xs font-bold text-green-800 dark:bg-green-800 dark:text-green-100">
                    Definition
                  </span>
                  <span className="text-base text-slate-700 dark:text-slate-200">
                    {pair.definition || (
                      <span className="text-slate-400 italic">(empty)</span>
                    )}
                  </span>
                </div>
                {/* Placeholder for future fun stuff, e.g. emoji, stickers, etc. */}
              </div>
            ))}
          </div>
        </div>
        {/* You can add more fun controls below, e.g. color pickers, stickers, etc. */}
      </div>
    );
  }

  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  // --- Flashcard Creation Form UI ---
  return (
    <div>
      {/* Header Section */}
      <FlashcardHeader text="Create Flashcard" classname="mb-4" />

      <CardOverview classname="medium:h-[70vh] mx-auto h-full max-w-3xl">
        <form className="space-y-4" onSubmit={handleCreateFlashcard}>
          {/* inputs */}
          <FlashcardInput pairs={pairs} handlePairChange={handlePairChange} />

          {/* Add More Button Section */}
          <AddFlashcard
            handleAddPair={handleAddPair}
            handleReducePair={handleReducePair}
            pairs={pairs}
            MAX_PAIRS={MAX_PAIRS}
          />

          {/* Tags Input (Optional) */}
          <div>
            <label htmlFor="tags" className={styling.label}>
              Tags (optional)
            </label>
            <Input
              id="tags"
              name="tags"
              type="text"
              value={tags}
              onChange={handleTagsChange}
              classname={styling.inputArea}
              placeholder="e.g. Biology, Chapter 2"
            />
          </div>

          {/* Action Buttons Section */}
          <ActionButton />

          {/* Max pairs info will use this as a toast for notification */}
          <div className="pt-2 text-right text-xs text-slate-400">
            {pairs.length >= MAX_PAIRS && (
              <span>
                Maximum of {MAX_PAIRS} terms & definitions per card reached.
              </span>
            )}
          </div>
        </form>
      </CardOverview>
    </div>
  );
}
