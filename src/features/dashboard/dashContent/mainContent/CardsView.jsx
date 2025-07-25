import { useState } from "react";
import { LuBookOpen } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";

export default function CardsView({ mockData }) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null);

  const handleFlashcardClick = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setShowReviewModal(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "easy":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "medium":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "hard":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  return (
    <CardOverview classname={"lg:col-span-2"}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Cards Due Today
        </h3>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
          {mockData.flashcardsDue.filter((card) => card.due === "Today").length}{" "}
          cards
        </span>
      </div>

      <div className="space-y-3">
        {mockData.flashcardsDue.slice(0, 5).map((flashcard) => (
          <div
            key={flashcard.id}
            className="group flex cursor-pointer items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700"
            onClick={() => handleFlashcardClick(flashcard)}
          >
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700">
                <LuBookOpen className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {flashcard.term}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {flashcard.subject}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${getDifficultyColor(flashcard.difficulty)}`}
              >
                {flashcard.difficulty}
              </span>
              <LuChevronRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300" />
            </div>
          </div>
        ))}
      </div>
    </CardOverview>
  );
}
