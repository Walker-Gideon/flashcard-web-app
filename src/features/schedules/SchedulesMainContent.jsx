import SchedulesLeftContentLayout from "./schedulesContent/scheduleLeft/SchedulesLeftContentLayout";
import SchedulesRightContentLayout from "./schedulesContent/scheduleRight/SchedulesRightContentLayout";

export default function SchedulesMainContent({ activeView }) {
  return (
    <main className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <SchedulesLeftContentLayout activeView={activeView} />
      <SchedulesRightContentLayout />
    </main>
  );
}
