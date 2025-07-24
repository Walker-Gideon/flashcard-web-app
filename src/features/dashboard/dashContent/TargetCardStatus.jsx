import { mockData } from "../../../data/mockData";

export default function TargetCardStatus() {
  return (
    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
        style={{ width: `${mockData.stats.todaysMastery}%` }}
      ></div>
    </div>
  );
}
