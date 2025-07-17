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
  className,
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
        onClick={onClick}
        //   text-slate-950
        className={`cursor-pointer transition-colors duration-300 ${className}`}
      >
        {children}
      </button>
    );

  if (variant === "primary")
    return (
      <button
        disabled={disabled}
        type={type}
        whileTap={{ y: 1 }}
        onClick={onClick}
        // py-1.5
        className={`button focus:ring-2 focus:ring-slate-950 focus:outline-hidden ${color ? `` : `bg-slate-950 py-1.5 text-white hover:bg-slate-900`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${className}`}
      >
        {children}
      </button>
    );

  return (
    <motion.button
      disabled={disabled}
      onClick={() => startLoadingAndNavigate(to)}
      whileTap={{ y: 1 }}
      className={`button ${color ? `bg-stone-950 py-1.5 text-white hover:bg-slate-900` : `border-gray-600 py-[5px] font-bold`} ${btnPaddX ? `${btnPaddX}` : `medium:px-6 px-4`} ${className}`}
    >
      {children}
    </motion.button>
  );
}

/*
medium:py-2 medium:text-[0.74rem] cursor-pointer rounded-sm border border-slate-950 bg-transparent py-1.5 text-[0.7rem] font-semibold ${btnPaddX ? `${btnPaddX}` : `medium:px-10 px-8`}*/
