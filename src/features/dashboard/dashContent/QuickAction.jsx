import CardOverview from "../../../ui/CardOverview";
import { LuPlus } from "react-icons/lu";
import { LuPlay } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";

export default function QuickAction() {
  return (
    <CardOverview>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {/* button 1 */}
        <button className="group flex flex-col items-center space-y-3 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-emerald-900/20 dark:to-teal-900/20">
          <div className="rounded-xl bg-emerald-500 p-3 transition-colors group-hover:bg-emerald-600">
            <LuPlus className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            New Card
          </span>
        </button>

        {/* button 2 */}
        <button className="group flex flex-col items-center space-y-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="rounded-xl bg-blue-500 p-3 transition-colors group-hover:bg-blue-600">
            <LuPlay className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Study Now
          </span>
        </button>

        {/* button 3 */}
        <button className="group flex flex-col items-center space-y-3 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-purple-900/20 dark:to-pink-900/20">
          <div className="rounded-xl bg-purple-500 p-3 transition-colors group-hover:bg-purple-600">
            <LuZap className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            AI Help
          </span>
        </button>

        {/* button 4 */}
        <button className="group flex flex-col items-center space-y-3 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-md dark:from-orange-900/20 dark:to-red-900/20">
          <div className="rounded-xl bg-orange-500 p-3 transition-colors group-hover:bg-orange-600">
            <LuCalendar className="h-6 w-6 text-white" />
          </div>
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Schedule
          </span>
        </button>
      </div>
    </CardOverview>
  );
}
