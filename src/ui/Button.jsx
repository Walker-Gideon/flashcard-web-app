import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useLoader } from "../context/LoaderContext";

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

  const navigate = useNavigate();
  const startLoadingAndNavigate = (to) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(to);
    }, 500);
  };

  if (variant === "outline")
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        //   text-slate-950
        className={`cursor-pointer transition-colors duration-300 ${classname}`}
      >
        {children}
      </button>
    );

  if (variant === "primary")
    return (
      <motion.button
        disabled={disabled}
        type={type}
        whileTap={{ y: 1 }}
        onClick={onClick}
        // py-1.5
        className={`button font-semibold transition-colors focus:ring-2 focus:outline-hidden ${color ? `${color}` : `bg-slate-950 py-2 text-white hover:bg-slate-900 focus:ring-slate-950`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${classname}`}
      >
        {children}
      </motion.button>
    );

  return (
    // py-1.5 but chnage it to py-2 and py-[5px] to py-[7px]
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

/*
medium:py-2 medium:text-[0.74rem] cursor-pointer rounded-sm border border-slate-500 bg-transparent py-1.5 text-[0.7rem] font-semibold ${btnPaddX ? `${btnPaddX}` : `medium:px-10 px-8`}*/
