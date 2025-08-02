import { schedulesMockData } from "../../../../data/schedulesMockData";
import { LuClock } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuCircleCheck } from "react-icons/lu";
import { LuCircleX } from "react-icons/lu";
import { LuCircleAlert } from "react-icons/lu";
import SchedulesMonth from "./SchedulesMonth";
import SchedulesToday from "./SchedulesToday";
import ScheduleWeeks from "./ScheduleWeeks";
import CardOverview from "../../../../ui/CardOverview";

export default function SchedulesLeftContentLayout({ activeView }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";
      case "scheduled":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300";
      case "skipped":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300";
      default:
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <LuCircleCheck className="h-4 w-4" />;
      case "pending":
        return <LuClock className="h-4 w-4" />;
      case "scheduled":
        return <LuCalendar className="h-4 w-4" />;
      case "skipped":
        return <LuCircleX className="h-4 w-4" />;
      default:
        return <LuCircleAlert className="h-4 w-4" />;
    }
  };

  return (
    <CardOverview classname="space-y-6 lg:col-span-2">
      <SchedulesToday
        schedulesMockData={schedulesMockData}
        activeView={activeView}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
      />

      <ScheduleWeeks
        schedulesMockData={schedulesMockData}
        activeView={activeView}
      />

      <SchedulesMonth
        schedulesMockData={schedulesMockData}
        activeView={activeView}
      />
    </CardOverview>
  );
}
