import { useNav } from "../../../context/NavigateContext";
import Button from "../../../ui/Button";
import Logo from "../../../ui/Logo";
import { LuX } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";
import { motion } from "motion/react";

export default function LargeHeader() {
  const { setShowSidebar, setNavShowOverLay, resize, setResize } = useNav();
  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  function handleResizeNavWidth() {
    setResize((show) => !show);
  }

  const styling = {
    iconsButton: "cursor-pointer text-xl text-slate-900 dark:text-white",
  };

  return (
    <header
      className={`transitioningColors border-b border-stone-300 px-2 py-2 dark:border-slate-700`}
    >
      <div className="transitioningColors medium:mt-0 medium:h-auto mt-0.5 flex h-13 flex-col gap-4 rounded-sm bg-slate-100 px-1 py-2 dark:bg-slate-700/50">
        <div className={`flex items-center justify-between`}>
          <div className="flex items-center gap-1 font-bold text-slate-950 uppercase">
            <div />
            <Logo logo={true} classname="z-50" />
            <motion.span
              layout
              transition={{
                type: "spring",
                visualDuration: 0.2,
                bounce: 0.2,
              }}
              className={`medium:text-base transitioning z-30 text-sm font-bold text-slate-900 dark:text-white ${resize ? "translate-x-0 delay-75" : "-translate-x-[150px]"} inline-block`}
            >
              walkwise
            </motion.span>
          </div>

          <Button
            variant="outline"
            onClick={handleClick}
            classname={`medium:hidden block ${styling.iconsButton}`}
          >
            <LuX />
          </Button>
        </div>

        <div
          className={`transitioning flex items-center ${resize ? `justify-end` : `justify-center`}`}
        >
          <Button
            variant="outline"
            onClick={handleResizeNavWidth}
            classname={`medium:block hidden ${styling.iconsButton}`}
          >
            <LuChevronRight
              className={`transform transition-transform duration-1000 ease-in-out ${resize ? `rotate-180` : `rotate-0`}`}
            />
          </Button>
        </div>
      </div>
    </header>
  );
}
