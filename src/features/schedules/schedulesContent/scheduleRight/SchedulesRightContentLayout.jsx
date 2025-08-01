import SchedulesQuickActions from "./SchedulesQuickActions";
import SchedulesStudyInsights from "./SchedulesStudyInsights";
import SchedulesUpcomingReminder from "./SchedulesUpcomingReminder";

export default function SchedulesRightContentLayout() {
  return (
    <div className="space-y-6">
      <SchedulesQuickActions />
      <SchedulesStudyInsights />
      <SchedulesUpcomingReminder />
    </div>
  );
}
