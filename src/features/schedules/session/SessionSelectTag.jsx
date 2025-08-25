import { useGen } from "../../../context/GeneralContext";

export default function SessionSelectTag() {
  const { formData, setFormData, flashcards, isSubmitting } = useGen();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Select Tag *
      </label>
      <select
        value={formData.tag}
        onChange={(e) => {
          const selectedTag = e.target.value;
          const selectedCard = flashcards.find(
            (card) => card.tags?.trim() === selectedTag,
          );
          const cardCount = selectedCard?.pairs?.length || 0;

          setFormData((prev) => ({
            ...prev,
            tag: selectedTag,
            tagId: selectedCard?.id || "",
            count: cardCount,
          }));
        }}
        className="input w-full disabled:cursor-not-allowed dark:bg-slate-700 dark:text-white"
        disabled={isSubmitting}
      >
        <option value="" disabled hidden>
          Select a flashcard tag
        </option>

        {flashcards.length === 0 ? (
          <option disabled>No flashcards found</option>
        ) : (
          flashcards.map((card) => (
            <option key={card.id} value={card.tags?.trim()}>
              {card.tags || "Untitled"}
            </option>
          ))
        )}
      </select>
    </div>
  );
}
