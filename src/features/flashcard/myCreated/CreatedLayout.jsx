import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { motion, AnimatePresence } from "motion/react";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import Button from "../../../ui/Button";
import CreatedHeader from "./CreatedHeader";
import { useFlash } from "../../../context/FlashcardContext";
import { useAuth } from "../../../context/AuthContext";

export default function CreatedLayout() {
  const { user } = useAuth();
  const { pairs } = useFlash();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [flashcard, setFlashcard] = useState([]);

  // Display flashcard on mount
  useEffect(() => {
    if (!user?.uid) return; // wait for login

    // const flashcardRef = collection(db, "users", user.uid, "flashcards");
    const flashcardRef = query(
      collection(db, "users", user.uid, "flashcards"),
      orderBy("createdAt", "desc"),
      limit(1),
    );

    // Real-time listener
    const unsubscribe = onSnapshot(flashcardRef, (snapshot) => {
      const fetchedFlashcard = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcard(fetchedFlashcard);
    });

    return () => unsubscribe(); // cleanup
  }, [user]);

  function nextCard() {
    setDirection(1);
    setIndex((prev) => (prev + 1) % pairs.length);
    setShowFront(true);
  }

  function prevCard() {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + pairs.length) % pairs.length);
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
    buttons: `button bg-slate-500 border-0 text-white hover:bg-slate-600 focus:ring-slate-300 p-2 rounded-full`,
    icons: "h-6 w-6",
    isDisabled: "opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <div className="medium:p-8 medium:max-w-xl mx-auto flex h-screen flex-col items-center px-5 lg:max-w-5xl">
      <CreatedHeader />

      <div className="medium:mt-20 mx-auto mt-15 max-w-3xl">
        <div
          className="perspective medium:w-100 h-60 w-80 lg:w-150"
          onClick={flipCard}
        >
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
                  animate={{ rotateY: showFront ? 0 : 180 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front Side */}
                  <div
                    className="absolute inset-0 flex h-full flex-col items-center justify-center px-6 py-4 text-xl font-semibold"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {flashcard[0]?.pairs[index]?.term}
                    <span className="absolute bottom-4 text-xs text-gray-400 italic">
                      Tap to view answer
                    </span>
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-6 py-4"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {flashcard[0]?.pairs[index]?.definition}
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

      <div className="mt-8 space-x-4">
        <Button
          variant="outline"
          classname={`${styling.buttons} ${index === 0 ? `${styling.isDisabled}` : ""}`}
          disabled={index === 0}
          onClick={prevCard}
        >
          <LuChevronLeft className={styling.icons} />
        </Button>
        <Button
          variant="outline"
          classname={`${styling.buttons}  ${index === pairs.length - 1 ? `${styling.isDisabled}` : ""}`}
          disabled={index === pairs.length - 1}
          onClick={nextCard}
        >
          <LuChevronRight className={styling.icons} />
        </Button>
      </div>
    </div>
  );
}
