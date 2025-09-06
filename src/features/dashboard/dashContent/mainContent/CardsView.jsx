import { useGen } from "../../../../context/GeneralContext";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import CardContent from "../../../../ui/CardContent";
import CardDiscription from "../../../../ui/CardDiscription";

export default function CardsView() {
  const { todayFlashcards } = useGen();

  return (
    <CardOverview classname={"lg:col-span-2"}>
      <CardHeader title="Cards Created Today">
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
            <div
              key={flashcard.id}
              className="group flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
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
            </div>
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
