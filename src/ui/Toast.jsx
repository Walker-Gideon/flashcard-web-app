import { motion } from "motion/react";
import Overlay from "./Overlay";

export default function Toast({
  children,
  classname,
  model,
  type,
  classOverlay,
  animation,
  notify,
  duration,
  top,
}) {
  const styling = {
    main: "fixed top-5 left-1/2 z-50 -translate-x-1/2 rounded-sm text-sm text-white shadow-lg",
  };
  //"bg-green-600" : "bg-red-600"

  if (notify)
    return (
      <div className={`absolute inset-0 z-50 ${top ? `${top}` : `top-10`}`}>
        <motion.div
          initial={{ y: "-400%" }}
          animate={{ y: animation ? 0 : "-800%" }}
          exit={{ y: "-400%" }}
          transition={{
            duration: `${duration ? duration : 1.5}`,
            ease: "easeInOut",
          }}
          className={`mx-auto flex items-center justify-center rounded-sm border bg-slate-100 text-sm font-medium dark:bg-white ${classname ? `${classname}` : `h-10 max-w-50`}`}
        >
          {children}
        </motion.div>
      </div>
    );

  if (model)
    return (
      <Overlay model={model} type="notify" classname={classOverlay}>
        <motion.div
          initial={{ y: "-400%" }}
          animate={{ y: animation ? 0 : "-400%" }}
          exit={{ y: "-400%" }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
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
