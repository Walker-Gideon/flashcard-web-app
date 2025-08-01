import SchedulesHeader from "./SchedulesHeader";
import SchedulesOverview from "./SchedulesOverview";
import SchedulesMainContent from "./SchedulesMainContent";

export default function SchedulesLayout() {
  return (
    <div>
      <SchedulesHeader />
      <SchedulesOverview />
      <SchedulesMainContent />
    </div>
  );
}
