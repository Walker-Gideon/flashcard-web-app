import SchedulesQuickActions from "./SchedulesQuickActions";
import SchedulesStudyInsights from "./SchedulesStudyInsights";
import SchedulesUpcomingReminder from "./SchedulesUpcomingReminder";

export default function SchedulesRightContentLayout() {
  return (
    <div>
      <SchedulesQuickActions />
      <SchedulesStudyInsights />
      <SchedulesUpcomingReminder />
    </div>
  );
}
