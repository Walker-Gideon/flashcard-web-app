import { mockData } from "../../../data/mockData";
import { schedulesMockData } from "../../../data/schedulesMockData";

export default function TargetCardStatus({ dashboard }) {
  dashboard
    ? `${mockData.stats.todaysMastery}%`
    : `${schedulesMockData.todayStats.completionRate}%`;

  return (
    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-2 rounded-full bg-slate-500 transition-all duration-500"
        style={{ width: `${dashboard}` }}
      ></div>
    </div>
  );
}
