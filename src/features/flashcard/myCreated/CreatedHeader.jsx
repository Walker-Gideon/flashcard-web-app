import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuEllipsis } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import CreateBtn from "./CreateBtn";

export default function CreatedHeader({ handleBackToEdit, tags }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <header className="medium:mt-0 medium:mb-6 mt-15 flex w-full items-center justify-between gap-2">
      <HeaderText>{tags ? tags : "Untitled Flashcard"}</HeaderText>

      <div className="relative">
        <motion.button
          whileTap={{ y: 1 }}
          onClick={() => setIsVisible(!isVisible)}
          className="cursor-pointer rounded-full bg-gradient-to-r from-slate-200 to-slate-300 p-2 transition-colors duration-300 dark:from-slate-600 dark:to-slate-700"
        >
          <LuEllipsis className="h-5 w-5 dark:text-white" />
        </motion.button>

        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-12 right-0 flex w-50 flex-col items-start gap-2 rounded-2xl border border-stone-300 bg-white/70 p-2 text-[0.8rem] text-slate-900 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white"
            >
              <CreateBtn handleBackToEdit={handleBackToEdit} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
