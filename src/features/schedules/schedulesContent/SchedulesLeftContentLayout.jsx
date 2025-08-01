import { schedulesMockData } from "../../../data/schedulesMockData";
import SchedulesToday from "./SchedulesToday";

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
    </div>
  );
}
