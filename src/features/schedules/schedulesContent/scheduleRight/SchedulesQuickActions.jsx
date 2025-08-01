import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuBrain } from "react-icons/lu";
import { LuZap } from "react-icons/lu";

export default function SchedulesQuickActions() {
  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <button className="flex w-full items-center space-x-3 rounded-xl bg-emerald-50 p-3 text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30">
            <LuPlay className="h-5 w-5" />
            <span>Start Next Session</span>
          </button>

          <button className="flex w-full items-center space-x-3 rounded-xl bg-blue-50 p-3 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
            <LuPlus className="h-5 w-5" />
            <span>Schedule Session</span>
          </button>

          <button className="flex w-full items-center space-x-3 rounded-xl bg-purple-50 p-3 text-purple-700 transition-colors hover:bg-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30">
            <LuBrain className="h-5 w-5" />
            <span>Smart Schedule</span>
          </button>

          <button className="flex w-full items-center space-x-3 rounded-xl bg-orange-50 p-3 text-orange-700 transition-colors hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-900/30">
            <LuZap className="h-5 w-5" />
            <span>Quick Review</span>
          </button>
        </div>
      </div>
    </div>
  );
}
