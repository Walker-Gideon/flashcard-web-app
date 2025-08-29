import { useGen } from "../../../../context/GeneralContext";
import SchedulesMonth from "./SchedulesMonth";
import SchedulesToday from "./SchedulesToday";
import ScheduleWeeks from "./ScheduleWeeks";

export default function SchedulesLeftContentLayout({ activeView }) {
  const { todaySessions } = useGen();

  return (
    <div
      className={`relative space-y-6 lg:col-span-2 ${todaySessions.length === 0 ? `lg:mb-10` : ``}`}
    >
      <SchedulesToday activeView={activeView} />
      <ScheduleWeeks activeView={activeView} />
      <SchedulesMonth activeView={activeView} />
    </div>
  );
}
