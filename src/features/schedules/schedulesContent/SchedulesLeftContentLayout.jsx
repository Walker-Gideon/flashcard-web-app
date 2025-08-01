import { schedulesMockData } from "../../../data/schedulesMockData";
import SchedulesMonth from "./SchedulesMonth";
import SchedulesToday from "./SchedulesToday";
import ScheduleWeeks from "./ScheduleWeeks";

export default function SchedulesLeftContentLayout({
  activeView,
  getStatusColor,
  getStatusIcon,
  getSubjectColor,
}) {
  return (
    <div className="space-y-6 lg:col-span-2">
      <SchedulesToday
        schedulesMockData={schedulesMockData}
        activeView={activeView}
        getStatusColor={getStatusColor}
        getStatusIcon={getStatusIcon}
        getSubjectColor={getSubjectColor}
      />

      <ScheduleWeeks
        schedulesMockData={schedulesMockData}
        activeView={activeView}
        getStatusColor={getStatusColor}
        getSubjectColor={getSubjectColor}
      />

      <SchedulesMonth
        schedulesMockData={schedulesMockData}
        activeView={activeView}
      />
    </div>
  );
}
