import SchedulesLeftContentLayout from "./schedulesContent/scheduleLeft/SchedulesLeftContentLayout";
import SchedulesRightContentLayout from "./schedulesContent/scheduleRight/SchedulesRightContentLayout";

export default function SchedulesMainContent({ activeView }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-3">
      <SchedulesLeftContentLayout activeView={activeView} />
      <SchedulesRightContentLayout />
    </div>
  );
}
