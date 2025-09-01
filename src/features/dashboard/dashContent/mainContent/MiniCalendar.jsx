import {
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import { LuCalendar } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import { useGen } from "../../../../context/GeneralContext";

export default function MiniCalendar() {
  const { currentMonth, monthLabel, calendarDays } = useGen();

  const styling = {
    daysOverview: "flex items-center space-x-2",
    cycle: "h-3 w-3 rounded-full",
    text: "text-slate-600 dark:text-slate-400",
  };

  return (
    <CardOverview>
      <h3 className="mb-4 flex items-center space-x-2 font-semibold text-slate-900 dark:text-white">
        <LuCalendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        <span>{monthLabel}</span>
      </h3>

      <div className="mb-3 grid grid-cols-7 gap-1 text-xs text-slate-500 dark:text-slate-400">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-1 text-center font-medium">
            {day}
          </div>
        ))}

        {calendarDays.map((day) => {
          const dayNum = day.getDate();
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isTodayDate = isToday(day);

          const bgColor = isTodayDate
            ? "bg-emerald-500 text-white"
            : isCurrentMonth
              ? "text-slate-600 dark:text-slate-400"
              : "text-slate-400 dark:text-slate-600";

          return (
            <div
              key={day.toISOString()}
              className={`flex aspect-square items-center justify-center rounded-lg text-sm ${bgColor}`}
            >
              {dayNum}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center space-x-4 text-xs">
        <div className={styling.daysOverview}>
          <div className={`bg-emerald-500 ${styling.cycle}`}></div>
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
