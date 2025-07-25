import { Calendar } from "lucide-react";
import CardOverview from "../../../ui/CardOverview";

export default function MiniCalendar({ studyDates }) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [];

  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today;
    const hasStudySession = studyDates.includes(day);

    days.push(
      <div
        key={day}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm transition-all duration-200 ${
          isToday
            ? "bg-emerald-500 text-white shadow-md"
            : hasStudySession
              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
        }`}
      >
        {day}
      </div>,
    );
  }

  return (
    <CardOverview>
      <h3 className="mb-4 flex items-center space-x-2 font-semibold text-slate-900 dark:text-white">
        <Calendar className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <span>
          {monthNames[currentMonth]} {currentYear}
        </span>
      </h3>

      <div className="mb-3 grid grid-cols-7 gap-1 text-xs text-slate-500 dark:text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1 text-center font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
      <div className="mt-4 flex items-center space-x-4 text-xs">
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
          <span className="text-slate-600 dark:text-slate-400">Today</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30"></div>
          <span className="text-slate-600 dark:text-slate-400">Study day</span>
        </div>
      </div>
    </CardOverview>
  );
}
