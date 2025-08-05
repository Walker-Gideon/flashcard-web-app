import { LuFlame } from "react-icons/lu";

export default function StreakCounter({ streakDays }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
      <LuFlame className="mx-auto mb-3 h-12 w-12 text-orange-500" />
      <p className="text-4xl font-bold text-slate-900 dark:text-white">
        {streakDays}
      </p>
      <p className="mb-3 text-lg text-slate-600 dark:text-slate-300">
        Day Streak!
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Don’t break your streak!
      </p>
    </div>
  );
}
