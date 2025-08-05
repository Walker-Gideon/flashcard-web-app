import { LuBookOpen } from "react-icons/lu";
import { LuChartColumnIncreasing } from "react-icons/lu";

export default function ActionsInspire() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h3>
      <div className="space-y-3">
        <button className="flex w-full items-center space-x-3 rounded-xl bg-emerald-50 p-3 text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30">
          <LuBookOpen className="h-5 w-5" />
          <span>Review Cards</span>
        </button>
        <button className="flex w-full items-center space-x-3 rounded-xl bg-blue-50 p-3 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
          <LuChartColumnIncreasing className="h-5 w-5" />
          <span>View Detailed Analytics</span>
        </button>
      </div>
    </div>
  );
}
