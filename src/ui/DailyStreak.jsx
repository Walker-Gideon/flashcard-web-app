import { useAuth } from "../context/AuthContext";

export default function DailyStreak() {
  const { userData } = useAuth();
  console.log(userData.streakCount);
  return (
    <span className="medium:text-xl text-lg font-bold text-slate-900 dark:text-white">
      {userData.streakCount}
    </span>
  );
}
