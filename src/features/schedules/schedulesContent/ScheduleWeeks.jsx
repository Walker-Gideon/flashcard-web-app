import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";

export default function ScheduleWeeks({
  schedulesMockData,
  activeView,
  getStatusColor,
  getSubjectColor,
}) {
  return (
    <div>
      {activeView === "week" && (
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              This Week
            </h3>
            <div className="flex items-center space-x-2">
              <button className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                <LuChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
              <button className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                <LuChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {schedulesMockData.weeklySchedule.map((day, index) => (
              <div
                key={day.date}
                className={`rounded-xl border p-4 transition-all duration-200 ${
                  index === 2 // Today (Wednesday)
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-900/20"
                    : "border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-center">
                      <p className="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400">
                        {day.dayName}
                      </p>
                      <p className="text-lg font-bold text-slate-900 dark:text-white">
                        {new Date(day.date).getDate()}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {day.totalCards} cards scheduled
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {day.sessions.length} sessions
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="mb-1 h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${day.completionRate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {day.completionRate}% done
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {day.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className={`flex items-center space-x-2 rounded-lg px-3 py-1 text-xs ${getStatusColor(session.status)}`}
                    >
                      <div
                        className={`h-2 w-2 ${getSubjectColor(session.subject)} rounded-full`}
                      ></div>
                      <span>{session.subject}</span>
                      <span>•</span>
                      <span>{session.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
