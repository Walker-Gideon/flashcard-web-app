import { LuSettings2 } from "react-icons/lu";
import Button from "../../ui/Button";

const schedules = ["today", "week", "month"];

export default function ScheduleHeaderButtons({ activeView, setActiveView }) {
  return (
    <div className="flex items-center space-x-4">
      {/* View Toggle */}
      <div className="rounded-sm border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        {schedules.map((view) => (
          <Button
            key={view}
            onClick={() => setActiveView(view)}
            variant="outline"
            classname={`rounded-sm px-4 py-2 text-[0.8rem] font-medium transition-all duration-200 ${activeView === view ? `bg-slate-500 text-white shadow-sm` : `text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white`}`}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </Button>
        ))}
      </div>

      <Button variant="outline" classname="primaryButton p-2">
        <LuSettings2 className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
