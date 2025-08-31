import { LuClock } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import { useGen } from "../../../../context/GeneralContext";

export default function SchedulesUpcomingReminder() {
  const { todaySessions, nearestSessions } = useGen();

  function getTimeRemaining(scheduledAt) {
    const now = new Date();
    const targetTime = scheduledAt.toDate();
    const diffMs = targetTime - now;

    if (diffMs <= 0) return "Starting now";

    const diffMinutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;

    return `${hours > 0 ? hours + "h " : ""}${minutes + 1}m remaining`;
  }

  return (
    <>
      {todaySessions.length !== 0 && nearestSessions.length !== 0 && (
        // medium:col-span-2 mb-18 lg:col-span-1
        <CardOverview
          classname={`rounded-2xl dark:text-white  bg-slate-500 medium:mb-25`}
        >
          <div className="mb-3 flex items-center space-x-2">
            <LuClock className="h-5 w-5" />
            <h3 className="font-semibold">Next Session</h3>
          </div>

          <p className="mb-4 font-medium">
            {nearestSessions?.at(0)?.tag} starts in{" "}
            {getTimeRemaining(nearestSessions?.at(0)?.scheduledAt)}
          </p>

          <p className="text-sm">
            {nearestSessions?.at(0)?.count}{" "}
            {nearestSessions?.at(0)?.count === 1 ? "card" : "cards"} •{" "}
            {nearestSessions?.at(0)?.estimatedTime} min
          </p>
        </CardOverview>
      )}
    </>
  );
}
