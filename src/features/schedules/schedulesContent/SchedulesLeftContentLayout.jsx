import { schedulesMockData } from "../../../data/schedulesMockData";

export default function SchedulesLeftContentLayout() {
  return (
    <div className="space-y-6 lg:col-span-2">
      {activeView === "today" && (
        <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Today's Sessions
            </h3>
            <button className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-4 py-2 text-white transition-colors hover:bg-emerald-600">
              <Plus className="h-4 w-4" />
              <span>Add Session</span>
            </button>
          </div>

          <div className="space-y-4">
            {schedulesMockData.upcomingSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="group flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-4 w-4 ${getSubjectColor(schedule.subject)} rounded-full`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">
                      {schedule.subject}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {schedule.cardCount} cards • {schedule.estimatedTime} min
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {schedule.scheduledTime}
                    </p>
                    <span
                      className={`inline-flex items-center space-x-1 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(schedule.status)}`}
                    >
                      {getStatusIcon(schedule.status)}
                      <span>{schedule.status}</span>
                    </span>
                  </div>

                  <button className="rounded-lg bg-emerald-500 p-2 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-emerald-600">
                    <Play className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
