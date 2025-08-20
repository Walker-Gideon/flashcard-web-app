import { LuFlame } from "react-icons/lu";
import UserWelcome from "../user/UserWelcome";
import { mockData } from "../../data/mockData";
import { useAuth } from "../../context/AuthContext";
import DailyStreak from "../../ui/DailyStreak";

export default function DashHeader() {
  const { userData } = useAuth();
  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <header className="medium:block sticky top-0 z-40 hidden border-b border-stone-300 bg-white/30 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      <div className="flex items-center justify-between px-6 py-4">
        <UserWelcome
          show={true}
          title={`Welcome, ${displayName ? displayName : "Username"}!`}
          subText={"Glad to have you on board."}
        />

        <div className="flex items-center space-x-3">
          <div className="medium:flex hidden items-center space-x-2 rounded-full bg-slate-50 px-3 py-2 whitespace-nowrap dark:bg-slate-700">
            <LuFlame className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              {" "}
              <DailyStreak /> day streak
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
