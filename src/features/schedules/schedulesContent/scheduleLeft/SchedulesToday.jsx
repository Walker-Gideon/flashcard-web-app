import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuCircleCheck } from "react-icons/lu";
import { LuCircleX } from "react-icons/lu";
import { LuCircleAlert } from "react-icons/lu";
import Button from "../../../../ui/Button";
import CardHeader from "../../../../ui/CardHeader";
import CardContent from "../../../../ui/CardContent";
import CardDiscription from "../../../../ui/CardDiscription";
import CardOverview from "../../../../ui/CardOverview";
import { useGen } from "../../../../context/GeneralContext";

export default function SchedulesToday({ schedulesMockData, activeView }) {
  const { setSessionModel } = useGen();

  const sizing = "h-4 w-4";
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <LuCircleCheck className={sizing} />;
      case "pending":
        return <LuClock className={sizing} />;
      case "scheduled":
        return <LuCalendar className={sizing} />;
      case "skipped":
        return <LuCircleX className={sizing} />;
      default:
        return <LuCircleAlert className={sizing} />;
    }
  };

  return (
    <div className={`${activeView === "today" ? `` : `hidden`}`}>
      {activeView === "today" && (
        <CardOverview classname={`h-full w-full lg:col-span-2`}>
          <CardHeader title="Today's Sessions">
            <Button
              variant="outline"
              onClick={() =>
                setTimeout(() => {
                  setSessionModel((show) => !show);
                }, 500)
              }
              classname="button flex items-center border-0 space-x-2 px-4 py-2 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
            >
              <LuPlus className="h-4 w-4" />
              <span>Add Session</span>
            </Button>
          </CardHeader>

          <div className="space-y-4">
            {schedulesMockData.upcomingSchedules.map((schedule) => (
              <CardContent
                key={schedule.id}
                role="button"
                type="innerCard"
                onClick={() => {}}
              >
                <CardContent classname="flex items-center space-x-4">
                  <div
                    className={`h-4 w-4 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700`}
                  ></div>
                  <CardDiscription
                    classnameFirst="font-medium text-slate-900 dark:text-white"
                    classnameSecond="text-sm text-slate-500 dark:text-slate-400"
                    textOne={schedule.subject}
                    textTwo={`${schedule.cardCount} cards • ${schedule.estimatedTime} min`}
                  />
                </CardContent>

                <CardContent classname="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {schedule.scheduledTime}
                    </p>
                    <span className="inline-flex items-center space-x-1 rounded-full bg-slate-200 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-900/30 dark:text-slate-300">
                      {getStatusIcon(schedule.status)}
                      <span>{schedule.status}</span>
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    classname="rounded-sm bg-slate-500 p-2 text-white opacity-0 transition-colors group-hover:opacity-100 hover:bg-slate-600"
                  >
                    <LuPlay className="h-4 w-4" />
                  </Button>
                </CardContent>
              </CardContent>
            ))}
          </div>
        </CardOverview>
      )}
    </div>
  );
}
