import CardOverview from "../../../ui/CardOverview";
import { mockData } from "../../../data/mockData";
import { LuBrain } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuAward } from "react-icons/lu";

export default function RecentActivity() {
  const styling = "h-4 w-4 text-slate-600 dark:text-slate-300";

  const getActivityIcon = (type) => {
    switch (type) {
      case "edit":
        return <LuPenLine className={styling} />;
      case "review":
        return <LuBrain className={styling} />;
      case "create":
        return <LuPlus className={styling} />;
      case "achievement":
        return <LuAward className={styling} />;
      case "schedule":
        return <LuCalendarPlus className={styling} />;
      default:
        return <LuBookOpen className={styling} />;
    }
  };

  return (
    <CardOverview classname={"mb-18"}>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Recent Activity
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockData.recentActivity.slice(0, 6).map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50"
          >
            <div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-slate-200 to-slate-300 p-2 dark:from-slate-600 dark:to-slate-700">
              {getActivityIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                {activity.action}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardOverview>
  );
}
