import { useState } from "react";
import FlashcardHeader from "./FlashcardHeader";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import ActionButton from "./createFlashcard/ActionButton";
import AddFlashcard from "./createFlashcard/AddFlashcard";
import FlashcardInput from "./createFlashcard/FlashcardInput";
import CreatedLayout from "./myCreated/CreatedLayout";
import useLazyLoading from "../../ui/LazyLoading";

export default function CreateFlashcard() {
  const MIN_PAIRS = 2; // Minimum 2 pairs, maximum 10 pairs (adjustable)
  const MAX_PAIRS = 10; // You can change this if you want more/less
  const [pairs, setPairs] = useState([
    { term: "", definition: "" },
    { term: "", definition: "" },
  ]);

  // State for tags input
  const [tags, setTags] = useState("");

  // State to toggle between form and preview
  const [showPreview, setShowPreview] = useState(false);

  // Calling lazing loading on the back button
  const lazyLoading = useLazyLoading(setShowPreview, 1000);

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
  function handleBackToEdit() {
    lazyLoading(false);
  }

  // --- Flashcard Preview UI ---
  if (showPreview)
    return (
      <div>
        <CreatedLayout
          handleBackToEdit={handleBackToEdit}
          tags={tags}
          pairs={pairs}
        />
        ;
      </div>
    );

  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  // --- Flashcard Creation Form UI ---
  return (
    <div className="medium:overflow-hidden h-screen w-full overflow-y-scroll px-8">
      <div className="">
        {/* Header Section */}
        <FlashcardHeader text="Create Flashcard" classname="medium:my-4" />

        <CardOverview classname="medium:h-[70vh] mx-auto max-w-3xl medium:mt-2 mt-4">
          <form className="space-y-2" onSubmit={handleCreateFlashcard}>
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
    </div>
  );
}
