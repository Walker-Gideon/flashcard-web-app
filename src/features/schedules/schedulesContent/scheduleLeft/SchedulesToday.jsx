import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import Button from "../../../../ui/Button";
import CardHeader from "../../../../ui/CardHeader";

export default function SchedulesToday({
  schedulesMockData,
  activeView,
  getSubjectColor,
  getStatusColor,
  getStatusIcon,
}) {
  return (
    <div>
      {activeView === "today" && (
        <CardOverview>
          <CardHeader title="Today's Sessions">
            <Button
              variant="outline"
              classname="button flex items-center border-0 space-x-2 px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
            >
              <LuPlus className="h-4 w-4" />
              <span>Add Session</span>
            </Button>
          </CardHeader>

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
                    <LuPlay className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardOverview>
      )}
    </div>
  );
}
