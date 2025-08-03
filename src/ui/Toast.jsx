import { motion } from "motion/react";
import Overlay from "./Overlay";

export default function Toast({
  children,
  classname,
  model,
  type,
  classOverlay,
}) {
  const styling = {
    main: "fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-sm text-sm text-white shadow-lg",
  };
  //"bg-green-600" : "bg-red-600"

  if (model)
    return (
      <Overlay model={model} type="notify" classname={classOverlay}>
        <motion.div
          initial={{ y: "-200%" }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          animate={{ y: "0" }}
          className={`p-2 ${styling[type]} ${classname}`}
        >
          {children}
        </motion.div>
      </Overlay>
    );

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <motion.div
        initial={{ y: "-200%" }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
        animate={{ y: "0" }}
        className={`px-6 py-2 ${styling[type]} ${classname}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
