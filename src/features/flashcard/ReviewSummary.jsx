import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useFlash } from "../../context/FlashcardContext";
import Button from "../../ui/Button";
import HeaderText from "../../ui/HeaderText";
import { LuCheck } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import useLazyLoading from "../../ui/LazyLoading";
import { useGen } from "../../context/GeneralContext";

export default function ReviewSummary() {
  const { userData } = useAuth();
  const { updateStreak } = useGen();
  const {
    setReviewComplete,
    readAlredyFlashcard,
    currentFlashcard,
    newlyFlashcard,
    setShowCreateFlashcard,
  } = useFlash();
  const lazyLoadingFlashcard = useLazyLoading(setShowCreateFlashcard, 1000);

  useEffect(() => {
    updateStreak(); // only runs once when this screen loads
  }, [updateStreak]);

  function HandleBackToFlashcard() {
    lazyLoadingFlashcard(false);

    setTimeout(() => {
      setReviewComplete(false);
    }, 3000);
  }

  const currentPairs = readAlredyFlashcard
    ? currentFlashcard.pairs
    : newlyFlashcard.pairs;

  return (
    <div className="mt-10 w-full p-6 md:mx-auto md:max-w-3xl">
      <div className="flex w-full items-center justify-between">
        <div className="">
          <HeaderText className="text-2xl font-bold">
            Review Complete!
          </HeaderText>
          <p className="medium:text-4xl middle:text-5xl mt-2 text-2xl text-slate-900 lg:text-6xl dark:text-white">
            You reviewed all your flashcards.
          </p>
        </div>

        <span className="medium:text-9xl -rotate-90 transform text-7xl">
          🎉
        </span>
      </div>

      <p className="medium:text-xl mt-6 mb-4 font-medium text-slate-900 dark:text-white">
        How you're doing
      </p>

      <div className="flex items-center gap-6">
        <div>
          <div className="flex h-25 w-25 items-center justify-center rounded-full border-8 border-green-200 text-green-200 dark:border-green-300/30 dark:text-green-300/30">
            <LuCheck className="h-16 w-16" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="medium:w-60 flex w-full items-center justify-between rounded-full bg-green-200 px-3 py-2 text-sm font-bold text-green-900 dark:bg-green-300/30 dark:text-white">
            <span>Completed</span>
            <span>{currentPairs.length}</span>
          </p>
          <p className="medium:w-60 flex w-full items-center justify-between rounded-full bg-slate-500 px-3 py-2 text-sm font-bold text-white">
            <span>Terms left</span>
            <span>0</span>
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            🔥 Current Streak: {userData.streakCount}-day
          </p>
        </div>
      </div>

      <div className="medium:mt-8 mt-10 flex w-full justify-between gap-4">
        <Button
          variant="outline"
          classname="cursor-pointer dark:text-white flex items-center gap-1 text-sm"
          onClick={() => {
            setTimeout(() => {
              setReviewComplete(false);
            }, 500);
          }}
        >
          <LuArrowLeft />
          Review Again
        </Button>

        <Button
          variant="outline"
          classname="primaryButton"
          onClick={HandleBackToFlashcard}
          className="btn-primary"
        >
          Back to Flashcard
        </Button>
      </div>
    </div>
  );
}
