import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../../../ui/Button";
import HeaderText from "../../../ui/HeaderText";
import { LuEllipsis } from "react-icons/lu";

export default function CreatedHeader({ handleBackToEdit, tags }) {
  const [isVisible, setIsVisible] = useState(false);

  const styling = {
    smalleOverView:
      "absolute top-12 right-0 flex w-50 flex-col items-start gap-2 rounded-2xl border border-stone-300 bg-white/70 p-2 text-[0.8rem] text-slate-900 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white",
    buttonSmall:
      "w-full text-start px-4 hover:bg-slate-600 transition-colors duration-300 py-2 transition-colors duration-500 hover:rounded-sm",
    buttonMedium: "medium:bg-slate-500 medium:rounded-sm",
  };

  return (
    <header className="medium:mt-0 medium:mb-6 mt-10 flex w-full items-center justify-between gap-2">
      <HeaderText>{tags ? tags : "Untitled Flashcard"}</HeaderText>

      <div className="relative">
        <motion.button
          whileTap={{ y: 1 }}
          onClick={() => setIsVisible(!isVisible)}
          className="medium:hidden block cursor-pointer rounded-full bg-gradient-to-r from-slate-200 to-slate-300 p-2 transition-colors duration-300 dark:from-slate-600 dark:to-slate-700"
        >
          <LuEllipsis className="h-5 w-5 dark:text-white" />
        </motion.button>

        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styling.smalleOverView} medium:relative medium:top-0 medium:border-0 medium:bg-transparent medium:dark:bg-transparent medium:flex-row medium:whitespace-nowrap`}
            ></motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
