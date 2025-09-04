
import { useNav } from "../../../context/NavigateContext";
import { useAuth } from "../../../context/AuthContext";
import ThemeCom from "../../../ui/ThemeCom";
import User from "../../user/User";

export default function UserProfile() {
  const { resize } = useNav();
  const { userData } = useAuth();

  const displayName =
    userData.username &&
    userData.username.charAt(0).toUpperCase() + userData.username.slice(1);

  return (
    <div className="transitioningColors border-t border-stone-300 px-2 py-2 dark:border-slate-700">
      <div className="transitioningColors flex w-full items-center justify-between rounded-sm bg-slate-50 px-2 py-3 dark:bg-slate-700">
        <div className="flex items-center gap-2">
          <User />

          <p
            className={`medium:hidden text-sm font-medium whitespace-nowrap text-slate-900 dark:text-white truncate w-30`}
          >
            {displayName ? displayName : "Username"}
          </p>
        </div>

        <ThemeCom />
      </div>
    </div>
  );
}
