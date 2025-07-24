import { mockData } from "../../../data/mockData";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";

export default function CardStatus() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* card 1 */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
            <LuTarget className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockData.stats.todaysMastery}%
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Mastery
            </p>
          </div>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all duration-500"
            style={{ width: `${mockData.stats.todaysMastery}%` }}
          ></div>
        </div>
      </div>

      {/* card 2 */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
            <LuBookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockData.stats.flashcardsReviewed}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Cards Today
            </p>
          </div>
        </div>
      </div>

      {/* card 3 */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-purple-100 p-3 dark:bg-purple-900/30">
            <LuClock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockData.stats.timeSpent}m
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Study Time
            </p>
          </div>
        </div>
      </div>

      {/* card 4 */}
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
        <div className="flex items-center justify-between">
          <div className="rounded-xl bg-orange-100 p-3 dark:bg-orange-900/30">
            <LuFlame className="h-6 w-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {mockData.stats.streakDays}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Day Streak
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
