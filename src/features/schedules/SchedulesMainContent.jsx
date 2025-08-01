import SchedulesLeftContentLayout from "./schedulesContent/SchedulesLeftContentLayout";
import SchedulesRightContentLayout from "./schedulesContent/SchedulesRightContentLayout";

export default function SchedulesMainContent() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <SchedulesLeftContentLayout />
      <SchedulesRightContentLayout />
    </div>
  );
}
