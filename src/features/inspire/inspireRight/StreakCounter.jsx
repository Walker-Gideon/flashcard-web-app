import { LuFlame } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";

export default function StreakCounter({ streakDays }) {
  return (
    <CardOverview classname="text-center">
      <LuFlame className="mx-auto mb-3 h-12 w-12 text-slate-600 dark:text-slate-300" />
      <p className="text-4xl font-bold text-slate-900 dark:text-white">
        {streakDays}
      </p>
      <p className="mb-3 text-lg text-slate-600 dark:text-slate-300">
        Day Streak!
      </p>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Don’t break your streak!
      </p>
    </CardOverview>
  );
}
