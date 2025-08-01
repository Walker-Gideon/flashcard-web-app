import { LuSettings } from "react-icons/lu";
import { LuSettings2 } from "react-icons/lu";

export default function SchedulesHeader({ activeView, setActiveView }) {
  return (
    <header>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Study Schedule
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Plan and track your learning sessions
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            {["today", "week", "month"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeView === view
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>

          <button className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
            <LuSettings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
