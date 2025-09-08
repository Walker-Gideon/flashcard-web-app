import { useAuth } from "../context/AuthContext";

export default function DailyStreak({ classname }) {
  const { userData } = useAuth();

  return (
    <span
      className={`${classname ? `${classname}` : `medium:text-xl text-lg font-bold text-slate-900 dark:text-white`}`}
    >
      {userData?.streakCount}
    </span>
  );
}
