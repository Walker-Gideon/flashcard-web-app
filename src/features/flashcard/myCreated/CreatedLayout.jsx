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
                    className="absolute inset-0 flex items-center justify-center px-6 py-4 text-xl font-semibold"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    {pairs[index].term || (
                      <span className="text-gray-400 italic">(empty)</span>
                    )}
                  </div>

                  {/* Back Side */}
                  <div
                    className="absolute inset-0 flex items-center justify-center px-6 py-4"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    {pairs[index].definition || (
                      <span className="text-gray-400 italic">(empty)</span>
                    )}
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
