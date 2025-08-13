import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import FlashcardHeader from "./FlashcardHeader";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import ActionButton from "./createFlashcard/ActionButton";
import AddFlashcard from "./createFlashcard/AddFlashcard";
import FlashcardInput from "./createFlashcard/FlashcardInput";
import CreatedLayout from "./myCreated/CreatedLayout";
import { useFlash } from "../../context/FlashcardContext";

export default function CreateFlashcard() {
  const { showPreview, setShowPreview, pairs, MAX_PAIRS, setTags, tags } =
    useFlash();

  // Handler for Create Flashcard button
  const handleCreateFlashcard = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  if (showPreview)
    return (
      <div>
        <CreatedLayout />;
      </div>
    );

  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  return (
    <div className="medium:overflow-hidden h-screen w-full overflow-y-scroll px-8">
      <div>
        <FlashcardHeader text="Create Flashcard" classname="medium:my-4" />

        <CardOverview classname="medium:h-[70vh] mx-auto max-w-3xl medium:mt-2 mt-4">
          <form className="space-y-2" onSubmit={handleCreateFlashcard}>
            <FlashcardInput />
            <AddFlashcard />

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
                onChange={(e) => setTags(e.target.value)}
                classname={styling.inputArea}
                placeholder="e.g. Biology, Chapter 2"
              />
            </div>
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
