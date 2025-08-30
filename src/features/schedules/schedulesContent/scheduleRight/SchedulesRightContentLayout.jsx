import { useGen } from "../../../../context/GeneralContext";
import SchedulesQuickActions from "./SchedulesQuickActions";
import SchedulesStudyInsights from "./SchedulesStudyInsights";
import SchedulesUpcomingReminder from "./SchedulesUpcomingReminder";

export default function SchedulesRightContentLayout() {
  const { todaySessions } = useGen();

  return (
    <div
      className={`medium:grid-cols-2 grid grid-cols-1 space-y-6 gap-x-6 gap-y-2 lg:grid-cols-1 ${todaySessions.length === 0 ? `mb-10 lg:mb-0` : `mb-0`}`}
    >
      <SchedulesQuickActions />
      {/* <SchedulesStudyInsights /> */}
      <SchedulesUpcomingReminder />
    </div>
  );
}
