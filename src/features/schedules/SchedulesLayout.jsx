import SchedulesHeader from "./SchedulesHeader";
import SchedulesOverview from "./SchedulesOverview";
import SchedulesMainContent from "./SchedulesMainContent";
import { useState } from "react";

export default function SchedulesLayout() {
  const [activeView, setActiveView] = useState("today"); // today, week, month
  // const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="defaultColor h-screen overflow-hidden">
      <SchedulesHeader activeView={activeView} setActiveView={setActiveView} />

      <main className="medium:mt-0 mt-7 h-screen space-y-6 overflow-scroll p-6">
        <SchedulesOverview />
        <SchedulesMainContent activeView={activeView} />
      </main>
    </div>
  );
}
