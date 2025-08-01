export default function SchedulesStudyInsights() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Study Insights
      </h3>
      <div className="space-y-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Peak Performance
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              2:00 PM - 4:00 PM
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
            <div
              className="h-2 rounded-full bg-emerald-500"
              style={{ width: "85%" }}
            ></div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Weekly Goal
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              180/200 cards
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
            <div
              className="h-2 rounded-full bg-blue-500"
              style={{ width: "90%" }}
            ></div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Retention Rate
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              92%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
            <div
              className="h-2 rounded-full bg-purple-500"
              style={{ width: "92%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
