import { motion } from "motion/react";

export default function Toast({ children, classname }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <motion.div
        initial={{ y: "-200%" }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        animate={{ y: "0" }}
        // bg-green-600
        className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-sm px-6 py-2 text-sm text-white shadow-lg ${classname}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
