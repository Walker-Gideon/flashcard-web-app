import { LuCalendar } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";

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

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today;
    const hasStudySession = studyDates.includes(day);

    days.push(
      <div
        key={day}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm transition-all duration-200 ${
          isToday
            ? "bg-slate-500 text-white shadow-md"
            : hasStudySession
              ? "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-900/30 dark:text-slate-100 dark:hover:bg-slate-900/50"
              : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
        }`}
      >
        {day}
      </div>,
    );
  }

  const styling = {
    daysOverview: "flex items-center space-x-2",
    cycle: "h-3 w-3 rounded-full",
    text: "text-slate-600 dark:text-slate-400",
  };

  return (
    <CardOverview>
      <h3 className="mb-4 flex items-center space-x-2 font-semibold text-slate-900 dark:text-white">
        <LuCalendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
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
        <div className={styling.daysOverview}>
          <div className={`bg-slate-500 ${styling.cycle}`}></div>
          <span className={styling.text}>Today</span>
        </div>
        <div className={styling.daysOverview}>
          <div
            className={`bg-slate-200 dark:bg-slate-900/30 ${styling.cycle}`}
          ></div>
          <span className={styling.text}>Study day</span>
        </div>
      </div>
    </CardOverview>
  );
}
