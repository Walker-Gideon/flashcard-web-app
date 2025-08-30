import { useGen } from "../../../../context/GeneralContext";
import SchedulesQuickActions from "./SchedulesQuickActions";
import SchedulesStudyInsights from "./SchedulesStudyInsights";
import SchedulesUpcomingReminder from "./SchedulesUpcomingReminder";

export default function SchedulesRightContentLayout() {
  const { todaySessions } = useGen();

  return (
    <div
      className={`medium:grid-cols-2 mb-18 grid grid-cols-1 space-y-6 gap-x-6 gap-y-2 lg:grid-cols-1 ${todaySessions.length === 0 ? `lg:h-50` : `lg:h-100`}`}
    >
      <SchedulesQuickActions />
      <SchedulesUpcomingReminder />
      {/* <SchedulesStudyInsights /> */}
    </div>
  );
}
