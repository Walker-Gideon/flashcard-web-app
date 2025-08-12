import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import Button from "../../../ui/Button";
import CreatedHeader from "./CreatedHeader";

export default function CreatedLayout({ handleBackToEdit, tags, pairs }) {
  const [index, setIndex] = useState(0); // current card index
  const [showFront, setShowFront] = useState(true); // term or definition
  const [direction, setDirection] = useState(0); // swipe direction

  function nextCard() {
    setDirection(1);
    setShowFront(true); // reset to term side
    setIndex((prev) => (prev + 1) % pairs.length);
  }

  function prevCard() {
    setDirection(-1);
    setShowFront(true);
    setIndex((prev) => (prev - 1 + pairs.length) % pairs.length);
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

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  const styling = {
    buttons: `button bg-slate-500 border-0 text-white hover:bg-slate-600 focus:ring-slate-300 p-2 rounded-full`,
    icons: "h-6 w-6",
    isDisabled: "opacity-50 disabled:cursor-not-allowed",
  };

  return (
    <div className="medium:p-8 medium:max-w-xl mx-auto flex h-screen flex-col items-center px-5 lg:max-w-5xl">
      <CreatedHeader handleBackToEdit={handleBackToEdit} tags={tags} />

      <div className="medium:mt-20 mx-auto mt-15 max-w-3xl">
        <div
          className="perspective medium:w-100 h-48 w-90 lg:w-150"
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
              <motion.div
                className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border border-stone-300 bg-white/70 text-xl font-medium shadow-lg backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white"
                variants={flipVariants}
                animate={showFront ? "front" : "back"}
                transition={{ duration: 0.5 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Front side */}
                <div
                  className="absolute flex h-full w-full items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {pairs[index].term || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </div>

                {/* Back side */}
                <div
                  className="absolute flex h-full w-full items-center justify-center bg-blue-100 dark:bg-slate-600"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  {pairs[index].definition || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </div>
              </motion.div>
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
