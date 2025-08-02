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
    // Will adjust this later
    <div className="relative space-y-6 lg:col-span-2">
      <SchedulesToday
        schedulesMockData={schedulesMockData}
        activeView={activeView}
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
    </div>
  );
}
