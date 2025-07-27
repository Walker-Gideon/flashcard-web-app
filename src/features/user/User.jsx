import { LuUser } from "react-icons/lu";

export default function User() {
  return (
    <div
      className={`transitioningColors z-50 flex h-8 w-8 items-center justify-center rounded-full bg-slate-500 dark:text-slate-50`}
    >
      <LuUser className="text-white" />
    </div>
  );
}
