import { motion } from "motion/react";

export default function Button({ children, onClick, disabled, btnPaddX }) {
  return (
    <motion.button
      disabled={disabled}
      onClick={onClick}
      whileTap={{ y: 1 }}
      //   medium:text-[0.74rem] text-sm
      className={`medium:text-[0.74rem] cursor-pointer rounded-sm border bg-stone-950 py-1.5 text-[0.7rem] font-semibold text-slate-200 transition-colors duration-300 hover:bg-slate-900 hover:text-slate-100 ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`}`}
    >
      {children}
    </motion.button>
  );
}
