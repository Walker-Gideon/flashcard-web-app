import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";
import { motion, AnimatePresence } from "motion/react";
import { LuArrowRight } from "react-icons/lu";
import { LuArrowLeft } from "react-icons/lu";
import Button from "../../../ui/Button";
import { useAuth } from "../../../context/AuthContext";
import { useFlash } from "../../../context/FlashcardContext";
import { useGen } from "../../../context/GeneralContext";

export default function CreatedContentFC() {
  const { user, fetchUserData } = useAuth();
  const {
    currentFlashcard,
    readAlredyFlashcard,
    setTags,
    newlyFlashcard,
    editFlashcardId,
    setReviewComplete,
  } = useFlash();
  const { updateStreak } = useGen();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFront, setShowFront] = useState(true);

  // Display flashcard on mount
  useEffect(() => {
    if (!user?.uid || !editFlashcardId) return;

    const flashcardRef = query(
      collection(db, "users", user.uid, "flashcards"),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(flashcardRef, (snapshot) => {
      const allFlashcards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Find the one that was just created or edited
      const selectedCard = allFlashcards.find(
        (card) => card.id === editFlashcardId,
      );

      // Display only that card
      if (selectedCard) {
        setTags([selectedCard]);
      } else {
        setTags([]); // fallback
      }
    });

    return () => unsubscribe();
  }, [user, editFlashcardId, setTags]);

  const currentPairs = readAlredyFlashcard
    ? currentFlashcard.pairs
    : newlyFlashcard.pairs;

  const handleReviewComplete = async () => {
    await updateStreak();
    await fetchUserData(user.uid);
  };

  const nextCard = async () => {
    if (index === currentPairs.length - 1) {
      setTimeout(async () => {
        await handleReviewComplete();
        setReviewComplete(true);
      }, 500);
      return;
    }

    setDirection(1);
    // setIndex((prev) => (prev + 1) % currentPairs.length);
    setIndex((prev) => prev + 1);
    setShowFront(true);
  };

  function prevCard() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + currentPairs.length) % currentPairs.length);
    setShowFront(true);
  }

  function flipCard() {
    setShowFront((prev) => !prev);
  }

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  const styling = {
    buttons: `button w-20 bg-slate-500 border-0 text-white hover:bg-slate-600 focus:ring-slate-300 p-3 medium:p-4 justify-center flex items-center rounded-full`,
    icons: "h-7 w-7",
    isDisabled: "opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <>
      <div className="medium:mt-10 mt-15 w-full md:mx-auto md:max-w-3xl">
        <div className="perspective medium:h-85 h-70 w-full" onClick={flipCard}>
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="h-full w-full"
            >
              <div
                className="relative flex h-full w-full cursor-pointer items-center justify-center text-xl font-medium"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  className="relative h-full w-full rounded-2xl border border-stone-300 bg-white/70 shadow-lg transition-all dark:border-slate-700 dark:bg-slate-800/70 dark:text-white"
                  style={{
                    transformStyle: "preserve-3d",
                    position: "relative",
                  }}
                  animate={{ rotateX: showFront ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 flex h-full flex-col items-center justify-center px-6 py-4 text-xl font-semibold md:px-10"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {currentPairs[index]?.term}
                    <span className="absolute bottom-4 text-xs text-gray-400 italic">
                      Tap to view answer
                    </span>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-6 py-4 md:px-10"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)",
                    }}
                  >
                    {currentPairs[index]?.definition}
                    <span className="absolute bottom-4 text-xs text-gray-400 italic">
                      Tap to view question
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-8 flex items-center space-x-8">
        <Button
          variant="outline"
          classname={`${styling.buttons} ${index === 0 ? `${styling.isDisabled}` : ""}`}
          disabled={index === 0}
          onClick={prevCard}
        >
          <LuArrowLeft className={styling.icons} />
        </Button>

        <div className="font-bold dark:text-white">
          <p className="text-xl">
            {index + 1} / {currentPairs.length}
          </p>
        </div>

        <Button
          variant="outline"
          classname={`${styling.buttons}  `}
          onClick={nextCard}
        >
          <LuArrowRight className={styling.icons} />
        </Button>
      </div>
    </>
  );
}
