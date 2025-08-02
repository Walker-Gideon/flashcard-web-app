import { LuClock } from "react-icons/lu";

export default function SchedulesUpcomingReminder() {
  return (
    // lg:col-span-2
    <div className="medium:col-span-2 mb-18 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white lg:col-span-1">
      <div className="mb-3 flex items-center space-x-2">
        <LuClock className="h-5 w-5 text-emerald-200" />
        <h3 className="font-semibold">Next Session</h3>
      </div>
      <p className="mb-4 text-emerald-50">Biology review starts in 2 hours</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-100">12 cards • 25 min</p>
        </div>
        <button className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/30">
          Reschedule
        </button>
      </div>
    </div>
  );
}
