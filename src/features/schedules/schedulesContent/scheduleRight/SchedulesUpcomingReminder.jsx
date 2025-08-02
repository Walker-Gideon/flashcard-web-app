import { LuClock } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import Button from "../../../../ui/Button";

export default function SchedulesUpcomingReminder() {
  return (
    <CardOverview classname="medium:col-span-2 mb-18 rounded-2xl dark:text-white lg:col-span-1 bg-slate-500">
      <div className="mb-3 flex items-center space-x-2">
        <LuClock className="h-5 w-5" />
        <h3 className="font-semibold">Next Session</h3>
      </div>

      {/* This data will come for the user */}
      <p className="mb-4 font-medium">Biology review starts in 2 hours</p>

      <div className="flex items-center justify-between">
        <div>
          {/* This data will come for the user */}
          <p className="text-sm">12 cards • 25 min</p>
        </div>

        <Button variant="outline" classname="primaryButton">
          Reschedule
        </Button>
      </div>
    </CardOverview>
  );
}
