import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import FlashcardHeader from "./FlashcardHeader";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import ActionButton from "./createFlashcard/ActionButton";
import AddFlashcard from "./createFlashcard/AddFlashcard";
import FlashcardInput from "./createFlashcard/FlashcardInput";
import CreatedLayout from "./myCreated/CreatedLayout";
import { useFlash } from "../../context/FlashcardContext";
import { LuLoader } from "react-icons/lu";

export default function CreateFlashcard() {
  const {
    showPreview,
    setShowPreview,
    pairs,
    MAX_PAIRS,
    setTags,
    tags,
    setPairs,
    loadingCard,
    setLoadingCard,
  } = useFlash();

  // Handler for Create Flashcard button
  const handleCreateFlashcard = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.log("User not logged in");
      return;
    }

    setLoadingCard(true);
    const flashcardId = uuidv4(); // unique ID for each flashcard

    // Filter out empty pairs
    const filteredPairs = pairs.filter(
      (pair) => pair.term.trim() !== "" || pair.definition.trim() !== "",
    );

    const flashcardData = {
      tags: tags.trim() === "" ? "Untitled Deck" : tags.trim(),
      pairs: filteredPairs,
      createdAt: serverTimestamp(),
    };

    try {
      await setDoc(
        doc(db, "users", user.uid, "flashcards", flashcardId),
        flashcardData,
      );

      // clear form after a delay to show preview or feedback
      setTimeout(() => {
        setShowPreview(true);
        setPairs([
          { term: "", definition: "" },
          { term: "", definition: "" },
        ]);
        setTags("");
      }, 1000);
    } catch (error) {
      console.error("Error saving flashcard: ", error.message);
    } finally {
      setLoadingCard(false);
    }
  };

  // if (showPreview)
  //   return (
  //     <div>
  //     ;
  //     </div>
  //   );

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

      {loadingCard && (
        <div className="absolute inset-0 z-50 flex h-screen items-center justify-center">
          <div className="rounded-full bg-slate-800/50 p-2 shadow-sm dark:bg-slate-400/50">
            <LuLoader className="for spinning medium:h-6 medium:w-6 h-5 w-5 animate-spin text-white" />
          </div>
        </div>
      )}
    </div>
  );
}

/*
 // Add a new card
  const handleAddPair = () => {
    if (pairs.length < MAX_PAIRS) {
      setPairs([...pairs, { term: "", definition: "" }]);
    }
  };

  // Remove current card
  const handleRemovePair = () => {
    if (pairs.length > 1) {
      const updatedPairs = pairs.filter((_, i) => i !== index);
      setPairs(updatedPairs);

      // Adjust index to avoid going out of bounds
      setIndex((prev) => (prev >= updatedPairs.length ? updatedPairs.length - 1 : prev));
    }
  };
  */
