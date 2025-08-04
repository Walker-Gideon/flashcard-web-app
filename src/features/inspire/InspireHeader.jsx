import UserWelcome from "../user/UserWelcome";

export default function InspireHeader() {
  return (
    <header className="medium:block sticky top-0 z-40 hidden border-b border-stone-300 bg-white/30 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      <div className="flex items-center px-6 py-4">
        <UserWelcome
          title="Inspire & Progress"
          subText="Stay motivated and track your achievements"
        />
      </div>
    </header>
  );
}
