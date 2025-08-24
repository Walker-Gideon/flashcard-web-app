import UserWelcome from "../user/UserWelcome";
import ScheduleHeaderButtons from "./ScheduleHeaderButtons";

export default function SchedulesHeader({ activeView, setActiveView }) {
  return (
    <header className="medium:block sticky top-0 z-40 hidden border-b border-stone-300 bg-white/30 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      {/* mb-8  */}
      <div className="flex items-center justify-between px-6 py-4">
        <UserWelcome
          title="Study Schedule"
          subText="Plan and track your learning sessions"
        />

        <div className="hidden md:flex">
          <ScheduleHeaderButtons
            activeView={activeView}
            setActiveView={setActiveView}
          />
        </div>
      </div>
    </header>
  );
}
