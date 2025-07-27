import { LuUser } from "react-icons/lu";

export default function User({ classname }) {
  return (
    <div
      className={`transitioningColors z-50 flex items-center justify-center rounded-full bg-slate-500 dark:text-slate-50 ${classname ? `${classname}` : `h-8 w-8`}`}
    >
      <LuUser className="text-white" />
    </div>
  );
}
