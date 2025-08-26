import { useGen } from "../../../../context/GeneralContext";
import {
  format,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  addDays,
} from "date-fns";
import { LuChevronRight } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";
import CardHeader from "../../../../ui/CardHeader";
import Button from "../../../../ui/Button";
import CardContent from "../../../../ui/CardContent";
import CardDiscription from "../../../../ui/CardDiscription";
import CardOverview from "../../../../ui/CardOverview";

export default function ScheduleWeeks({ schedulesMockData, activeView }) {
  const { sessions } = useGen();

  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const end = endOfWeek(now, { weekStartsOn: 1 }); // Sunday

  // Step 1: Get sessions within the current week
  const weekSessions = sessions.filter((session) => {
    const scheduledDate = session.scheduledAt?.toDate?.();
    return scheduledDate && isWithinInterval(scheduledDate, { start, end });
  });

  // Step 2: Static days to display (guaranteed order)
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(start, index);
    const isoDate = format(date, "yyyy-MM-dd");
    return {
      label: format(date, "EEE"),
      date: isoDate,
      dayNumber: date.getDate(),
      isToday: isoDate === format(new Date(), "yyyy-MM-dd"),
    };
  });

  // Step 3: Group sessions by day
  const sessionsByDay = {};
  weekSessions.forEach((session) => {
    const date = session.scheduledAt?.toDate();
    const key = format(date, "yyyy-MM-dd"); // use date string as key
    if (!sessionsByDay[key]) sessionsByDay[key] = [];
    sessionsByDay[key].push(session);
  });

  console.log("Session for the same week are ", sessionsByDay);

  const styling = {
    btnStling: "rounded-sm p-2 hover:bg-slate-100 dark:hover:bg-slate-600",
    icon: "h-4 w-4 text-slate-600 dark:text-slate-400",
  };
  return (
    <div className={`${activeView === "week" ? `` : `hidden`}`}>
      {activeView === "week" && (
        <CardOverview classname="lg:absolute w-full top-0">
          <CardHeader title="This Week">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                classname={styling.btnStling}
                onClick={() => {}}
              >
                <LuChevronLeft className={styling.icon} />
              </Button>

              <Button
                variant="outline"
                classname={styling.btnStling}
                onClick={() => {}}
              >
                <LuChevronRight className={styling.icon} />
              </Button>
            </div>
          </CardHeader>

          <div className="scroll-container h-170 space-y-4 overflow-y-scroll">
            {weekDays.map((day) => (
              /*{schedulesMockData.weeklySchedule.map((day, index) => (*/
              <CardContent
                key={day.date}
                classname={`rounded-xl border p-4 transition-all duration-200 ${
                  day.isToday
                    ? "border-slate-300 bg-slate-200 dark:border-slate-800 dark:bg-slate-900"
                    : "border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700/50"
                }`}
              >
                <CardContent classname="mb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CardDiscription
                      classOverall="text-center"
                      classnameFirst="text-xs tracking-wide text-slate-500 uppercase dark:text-slate-400"
                      classnameSecond="text-lg font-bold text-slate-900 dark:text-white"
                      textOne={day.label}
                      textTwo={day.dayNumber}
                    />
                    {(() => {
                      const sessionsForDay = sessionsByDay[day.date] || [];

                      const totalSessions = sessionsForDay.length;
                      const totalCards = sessionsForDay.reduce(
                        (sum, session) => sum + Number(session.count || 0),
                        0,
                      );

                      return (
                        <CardDiscription
                          classnameFirst="font-medium text-slate-900 dark:text-white"
                          classnameSecond="text-sm text-slate-500 dark:text-slate-400"
                          textOne={`${totalCards} cards scheduled`}
                          textTwo={`${totalSessions} session${totalSessions > 1 ? "s" : ""}`}
                        />
                      );
                    })()}
                  </div>

                  {/* <div className="text-right">
                    <div className="mb-1 h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full bg-slate-500 transition-all duration-300"
                        style={{ width: `${day.completionRate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {day.completionRate}% done
                    </p>
                  </div> */}
                </CardContent>

                <div className="flex flex-wrap gap-2">
                  {sessionsByDay[day.date]?.map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center space-x-2 rounded-lg bg-slate-200 px-3 py-1 text-xs text-slate-700 dark:bg-slate-900/30 dark:text-slate-300"
                    >
                      <div className="h-2 w-2 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700"></div>
                      <span>{session.tag}</span>
                      <span>•</span>
                      <span>
                        {session.scheduledAt?.toDate
                          ? format(session.scheduledAt.toDate(), "HH:mm")
                          : "Invalid Time"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            ))}
          </div>
        </CardOverview>
      )}
    </div>
  );
}
