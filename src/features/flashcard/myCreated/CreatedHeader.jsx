import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuEllipsis } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import CreateBtn from "./CreateBtn";

export default function CreatedHeader({ handleBackToEdit, tags }) {
  const [isVisible, setIsVisible] = useState(false);

  const styling = {
    smalleOverView:
      "absolute top-12 right-0 flex w-50 flex-col items-start gap-2 rounded-2xl border border-stone-300 bg-white/70 p-2 text-[0.8rem] text-slate-900 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white",
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

        {/* This is for the small screen */}
        <AnimatePresence initial={false}>
          {isVisible ? (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className={`${styling.smalleOverView} medium:relative medium:top-0 medium:border-0 medium:bg-transparent medium:dark:bg-transparent medium:flex-row medium:whitespace-nowrap medium:hidden`}
            >
              <CreateBtn handleBackToEdit={handleBackToEdit} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <CreateBtn
          handleBackToEdit={handleBackToEdit}
          classname={`hidden ${styling.smalleOverView} medium:relative medium:top-0 medium:border-0 medium:bg-transparent medium:dark:bg-transparent medium:flex-row medium:whitespace-nowrap medium:inline-flex`}
        />
      </div>
    </header>
  );
}
