import { isSameDay } from "date-fns";
import { useGen } from "../../../../context/GeneralContext";
import { LuBookOpen } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import CardContent from "../../../../ui/CardContent";
import CardDiscription from "../../../../ui/CardDiscription";
import { useMemo } from "react";

export default function CardsView({
  setShowReviewModal,
  setSelectedFlashcard,
}) {
  const { flashcards } = useGen();
  const handleFlashcardClick = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setShowReviewModal(true);
  };

  const todayFlashcards = useMemo(() => {
    return flashcards
      .filter((card) => isSameDay(card.createdAt.toDate(), new Date()))
      .sort((a, b) => a.createdAt.toDate() - b.createdAt.toDate());
  }, [flashcards]);

  console.log("all today's card ", todayFlashcards);

  return (
    <CardOverview classname={"lg:col-span-2"}>
      <CardHeader title="Cards Due Today">
        {todayFlashcards.length !== 0 && (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-900/30 dark:text-slate-300">
            {todayFlashcards.length} card
            {todayFlashcards.length <= 1 ? "" : "s"}
          </span>
        )}
      </CardHeader>

      <div className="scroll-container h-190 space-y-3 overflow-y-scroll">
        {todayFlashcards.length !== 0 ? (
          todayFlashcards.map((flashcard) => (
            <CardContent
              key={flashcard.id}
              role="button"
              type="innerCard"
              onClick={() => handleFlashcardClick(flashcard)}
            >
              <CardContent classname="flex items-center space-x-4">
                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700"></div>
                <CardDiscription
                  classnameFirst="font-medium text-slate-900 dark:text-white"
                  classnameSecond="text-sm text-slate-500 dark:text-slate-400"
                  textOne={flashcard.tags}
                  textTwo={`${flashcard.pairs.length} card${flashcard.pairs.length <= 1 ? "" : "s"}`}
                />
              </CardContent>
              <CardContent classname="flex items-center space-x-3">
                <LuChevronRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-slate-600 dark:group-hover:text-slate-300" />
              </CardContent>
            </CardContent>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-sm text-slate-500 dark:text-slate-50">
              No card created today!.
            </p>
          </div>
        )}
      </div>
    </CardOverview>
  );
}
