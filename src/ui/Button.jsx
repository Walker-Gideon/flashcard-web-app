import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useLoader } from "../context/LoaderContext";
import useLazyLoading from "./LazyLoading";

export default function Button({
  children,
  to,
  disabled,
  color,
  btnPaddX,
  variant,
  classname,
  onClick,
  type,
}) {
  const { setLoading } = useLoader();
  const Loader = useLazyLoading();

  const navigate = useNavigate();
  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 500);
  };

  const base = "cursor-pointer transition-colors duration-300";

  const styling = {
    outline: base + ` ${classname}`,
    primary:
      base +
      ` button font-semibold transition-colors focus:ring-2 focus:outline-hidden ${color ? `${color}` : `bg-slate-500 py-2 text-white hover:bg-slate-600 focus:ring-slate-500`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${classname}`,
  };

  // variant === "outline"
  if (variant)
    return (
      <button
        disabled={disabled}
        type={type}
        onClick={onClick}
        // className={`cursor-pointer transition-colors duration-300 ${classname}`}
        className={styling[variant]}
      >
        {children}
      </button>
    );

  /*
  if (variant === "primary")
    return (
      <motion.button
        disabled={disabled}
        type={type}
        whileTap={{ y: 1 }}
        onClick={onClick}
        className={`button font-semibold transition-colors focus:ring-2 focus:outline-hidden ${color ? `${color}` : `bg-slate-500 py-2 text-white hover:bg-slate-600 focus:ring-slate-500`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${classname}`}
      >
        {children}
      </motion.button>
    );
    */

  return (
    <motion.button
      disabled={disabled}
      onClick={() => startLoadingAndNavigate(to)}
      whileTap={{ y: 1 }}
      className={`button transition-colors ${color ? `border-0 bg-slate-500 py-2 font-semibold text-white hover:bg-slate-600` : `border-stone-300 py-[7px] font-bold text-slate-700 hover:border-slate-400`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${classname}`}
    >
      {children}
    </motion.button>
  );
}
