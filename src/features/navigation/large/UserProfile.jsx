import { useAuth } from "../../../context/AuthContext";
import ThemeCom from "../../../ui/ThemeCom";
import User from "../../user/User";

export default function UserProfile() {
  const { userData } = useAuth();

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <div className="border-t border-stone-300 px-2 py-2 dark:border-slate-700">
      <div className="gap-1 flex medium:items-center flex-col">
        <ThemeCom />

        <div className="flex items-center gap-4 w-full p-2 rounded-sm bg-slate-50  dark:bg-slate-700 medium:justify-center">
          <User />

          <p
            className={`medium:hidden text-sm font-medium whitespace-nowrap text-slate-900 dark:text-white truncate w-30`}
          >
            {displayName ? displayName : "Username"}
          </p>
        </div>
      </div>
    </div>
  );
}
