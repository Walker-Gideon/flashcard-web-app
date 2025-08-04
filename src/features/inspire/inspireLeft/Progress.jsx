import { inspireMockData } from "../../../data/inspireMockData";

export default function Progress() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
      <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Study Progress
      </h3>

      {/* Weekly Study Heatmap */}
      <div className="mb-8">
        <h4 className="mb-3 text-lg font-medium text-slate-800 dark:text-white">
          Weekly Study Heatmap
        </h4>
        <div className="grid grid-cols-7 gap-1">
          {inspireMockData.progress.weeklyStudyData.map((data, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                {data.day}
              </span>
              <div
                className={`h-12 w-full rounded-md transition-colors duration-200 ${
                  data.minutes > 60
                    ? "bg-emerald-600"
                    : data.minutes > 30
                      ? "bg-emerald-500"
                      : data.minutes > 0
                        ? "bg-emerald-300"
                        : "bg-slate-200 dark:bg-slate-700"
                }`}
                title={`${data.minutes} minutes`}
              ></div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
          Darker shades mean more study time.
        </p>
      </div>

      {/* Consistency Bar Chart */}
      <div>
        <h4 className="mb-3 text-lg font-medium text-slate-800 dark:text-white">
          Consistency Score
        </h4>
        <div className="flex items-center space-x-4">
          <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
              style={{
                width: `${inspireMockData.progress.consistencyScore}%`,
              }}
            ></div>
          </div>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {inspireMockData.progress.consistencyScore}%
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Your overall study consistency.
        </p>
      </div>
    </div>
  );
}
