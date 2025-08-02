import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuBrain } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import Button from "../../../../ui/Button";

export default function SchedulesQuickActions() {
  const styling =
    "w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300";

  return (
    <CardOverview>
      <CardHeader title="Quick Actions"></CardHeader>
      <div className="space-y-3">
        <Button variant="outline" classname={styling}>
          <LuPlay className="h-5 w-5" />
          <span>Start Next Session</span>
        </Button>

        <Button variant="outline" classname={styling}>
          <LuPlus className="h-5 w-5" />
          <span>Schedule Session</span>
        </Button>

        <Button variant="outline" classname={styling}>
          <LuBrain className="h-5 w-5" />
          <span>Smart Schedule</span>
        </Button>

        <Button variant="outline" classname={styling}>
          <LuZap className="h-5 w-5" />
          <span>Quick Review</span>
        </Button>
      </div>
    </CardOverview>
  );
}
