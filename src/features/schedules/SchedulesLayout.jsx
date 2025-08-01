import SchedulesHeader from "./SchedulesHeader";
import SchedulesOverview from "./SchedulesOverview";
import SchedulesMainContent from "./SchedulesMainContent";
import { useState } from "react";

export default function SchedulesLayout() {
  const [activeView, setActiveView] = useState("today"); // today, week, month
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <SchedulesHeader activeView={activeView} setActiveView={setActiveView} />
      <SchedulesOverview />
      <SchedulesMainContent />
    </div>
  );
}
