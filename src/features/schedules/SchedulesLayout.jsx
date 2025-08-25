import SchedulesHeader from "./SchedulesHeader";
import SchedulesOverview from "./SchedulesOverview";
import SchedulesMainContent from "./SchedulesMainContent";
import { useState } from "react";
import ScheduleHeaderButtons from "./ScheduleHeaderButtons";
import AddSession from "./session/AddSession";

export default function SchedulesLayout() {
  const [activeView, setActiveView] = useState("today"); // today, week, month
  // const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="defaultColor h-screen overflow-hidden">
      <SchedulesHeader activeView={activeView} setActiveView={setActiveView} />

      <main className="medium:mt-0 mt-7 h-screen space-y-6 overflow-scroll p-6">
        <SchedulesOverview />

        <div className="flex items-center justify-end md:hidden">
          <ScheduleHeaderButtons
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>

        <SchedulesMainContent activeView={activeView} />
      </main>

      <AddSession />
    </div>
  );
}
