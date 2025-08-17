import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import FlashcardHeader from "./FlashcardHeader";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import ActionButton from "./createFlashcard/ActionButton";
import AddFlashcard from "./createFlashcard/AddFlashcard";
import FlashcardInput from "./createFlashcard/FlashcardInput";
import { useFlash } from "../../context/FlashcardContext";
import Loader from "../../ui/Loader";

export default function CreateFlashcard() {
  const {
    setShowPreview,
    pairs,
    MAX_PAIRS,
    setTags,
    tags,
    setPairs,
    loadingCard,
    setLoadingCard,
    setReadAlredyFlashcard,
    setNewlyFlashcard,
    editMode,
    setEditMode,
    editTags,
    setEditTags,
    editPairs,
    setEditPairs,
    editFlashcardId,
    setEditFlashcardId,
    SetEditFlashcardData,
  } = useFlash();

  /*
  // Handler for Create Flashcard button
  const handleCreateFlashcard = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    setLoadingCard(true);

    const flashcardId = uuidv4();

    // Filter out empty pairs
    const filteredPairs = pairs.filter(
      (pair) => pair.term.trim() !== "" || pair.definition.trim() !== "",
    );

    const flashcardData = {
      tags: tags.trim() === "" ? "Untitled Deck" : tags.trim(),
      pairs: filteredPairs,
      createdAt: serverTimestamp(),
    };

    setNewlyFlashcard({
      id: flashcardId,
      ...flashcardData,
    });

    try {
      await setDoc(
        doc(db, "users", user.uid, "flashcards", flashcardId),
        flashcardData,
      );

      setTimeout(() => {
        setShowPreview(true);
        setReadAlredyFlashcard(false);
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
  */

  const handleSaveFlashcard = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;

    setLoadingCard(true);

    const isEditing = editMode;
    const id = isEditing ? editFlashcardId : uuidv4();
    const currentTags = isEditing ? editTags.trim() : tags.trim();
    const currentPairs = isEditing ? editPairs : pairs;

    const filteredPairs = currentPairs.filter(
      (pair) => pair.term.trim() !== "" || pair.definition.trim() !== "",
    );

    const flashcardData = {
      tags: currentTags === "" ? "Untitled Deck" : currentTags,
      pairs: filteredPairs,
      ...(isEditing ? {} : { createdAt: serverTimestamp() }),
    };

    try {
      await setDoc(doc(db, "users", user.uid, "flashcards", id), flashcardData);

      if (!isEditing) {
        setNewlyFlashcard({ id, ...flashcardData });
      }

      // Reset state for both create/edit
      setTimeout(() => {
        setShowPreview(true);
        setReadAlredyFlashcard(false);
        setEditMode(false);
        setEditPairs([]);
        setEditTags("");
        setEditFlashcardId("");
        setPairs([
          { term: "", definition: "" },
          { term: "", definition: "" },
        ]);
        setTags("");
        SetEditFlashcardData({});
      }, 1000);
    } catch (error) {
      console.error("Error saving flashcard:", error.message);
    } finally {
      setLoadingCard(false);
    }
  };

  const styling = {
    label:
      "mb-1 block medium:text-xs text-sm font-medium text-slate-500 dark:text-slate-400",
    inputArea: "w-full input text-slate-900 dark:text-white",
  };

  return (
    <div className="medium:overflow-hidden h-screen w-full overflow-y-scroll px-8">
      <div>
        <FlashcardHeader
          text={editMode ? "Edit Flashcard Set" : "Create a new flashcard set"}
          classname="medium:my-4"
        />

        <CardOverview classname="medium:h-[70vh] mx-auto max-w-3xl medium:mt-8 mt-14">
          <form className="space-y-2" onSubmit={handleSaveFlashcard}>
            <FlashcardInput />
            <AddFlashcard />

            {/* Tags Input (Optional) */}
            <div>
              <label htmlFor="tags" className={styling.label}>
                {editMode ? "Rename Tags" : "Tags"} (optional)
              </label>
              <Input
                id="tags"
                name="tags"
                type="text"
                value={editMode ? editTags : tags}
                onChange={
                  editMode
                    ? (e) => setEditTags(e.target.value)
                    : (e) => setTags(e.target.value)
                }
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

      {loadingCard && <Loader loadingSpin={true} />}
    </div>
  );
}
