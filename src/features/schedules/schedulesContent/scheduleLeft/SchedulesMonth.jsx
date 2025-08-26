import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  isToday,
} from "date-fns";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import { useState } from "react";
import Button from "../../../../ui/Button";

export default function SchedulesMonth({ schedulesMockData, activeView }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
    console.log("Click previous");
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
    console.log("Click next");
  };

  // The Current month and year
  const monthLabel = format(currentMonth, "MMMM yyyy");

  const generateCalendarDays = () => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });

    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  console.log(calendarDays);

  return (
    <div className="mb-8">
      {activeView === "month" && (
        <CardOverview classname="lg:absolute w-full top-0">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {monthLabel}
            </h3>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={handlePrevMonth}
                classname="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LuChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </Button>
              <Button
                variant="outline"
                onClick={handleNextMonth}
                classname="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <LuChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </Button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="mb-4 grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
              const hasStudy =
                schedulesMockData.monthlyCalendar.studyDays.includes(day);
              const isIntense =
                schedulesMockData.monthlyCalendar.intenseDays.includes(day);
              const isCompleted =
                schedulesMockData.monthlyCalendar.completedDays.includes(day);
              const isToday = day === 17;

              return (
                <div
                  key={day}
                  className={`flex aspect-square cursor-pointer items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                    isToday
                      ? "bg-emerald-500 text-white shadow-md"
                      : isCompleted
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                        : isIntense
                          ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
                          : hasStudy
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:hover:bg-yellow-900/50"
                            : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {/* Calendar Legend */}
          <div className="flex items-center justify-end space-x-6 text-xs">
            <div className="space-y-2 space-x-6 md:flex md:items-center md:justify-center">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  Today
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-emerald-100 dark:bg-emerald-900/30"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  Completed
                </span>
              </div>
            </div>

            <div className="space-y-2 space-x-6 md:flex md:items-center md:justify-center">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-yellow-100 dark:bg-yellow-900/30"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  Scheduled
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-rose-100 dark:bg-rose-900/30"></div>
                <span className="text-slate-600 dark:text-slate-400">
                  Heavy load
                </span>
              </div>
            </div>
          </div>
        </CardOverview>
      )}
    </div>
  );
}
