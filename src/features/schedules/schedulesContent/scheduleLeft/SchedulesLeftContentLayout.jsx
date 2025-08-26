import SchedulesMonth from "./SchedulesMonth";
import SchedulesToday from "./SchedulesToday";
import ScheduleWeeks from "./ScheduleWeeks";

export default function SchedulesLeftContentLayout({ activeView }) {
  return (
    <div className="relative space-y-6 lg:col-span-2">
      <SchedulesToday activeView={activeView} />
      <ScheduleWeeks activeView={activeView} />
      <SchedulesMonth activeView={activeView} />
    </div>
  );
}
