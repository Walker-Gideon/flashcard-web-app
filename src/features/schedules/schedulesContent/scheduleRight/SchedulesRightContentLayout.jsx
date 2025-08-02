import SchedulesQuickActions from "./SchedulesQuickActions";
import SchedulesStudyInsights from "./SchedulesStudyInsights";
import SchedulesUpcomingReminder from "./SchedulesUpcomingReminder";

export default function SchedulesRightContentLayout() {
  return (
    <div className="medium:grid-cols-2 grid grid-cols-1 space-y-6 gap-x-6 gap-y-2 lg:grid-cols-1">
      <SchedulesQuickActions />
      <SchedulesStudyInsights />
      <SchedulesUpcomingReminder />
    </div>
  );
}
