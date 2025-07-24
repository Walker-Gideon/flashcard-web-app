import { LuFlame } from "react-icons/lu";

export default function DashHeader() {
  return (
    <header className="medium:block sticky top-0 z-40 hidden border-b border-stone-300 bg-white/30 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Welcome back, X!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {/* If the user first sign up we say : */}
            Ready to continue your learning journey?
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="medium:flex hidden items-center space-x-2 rounded-full bg-slate-50 px-3 py-2 whitespace-nowrap dark:bg-slate-900/20">
            <LuFlame className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {/* {mockData.stats.streakDays} number of streak*/} X day streak
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

/*  <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-lg p-2 transition-colors hover:bg-slate-100 lg:hidden dark:hover:bg-slate-700"
          >
            <Menu className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          </button> */
