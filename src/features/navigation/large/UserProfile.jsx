import { useEffect, useState } from "react";
import { useNav } from "../../../context/NavigateContext";
import Button from "../../../ui/Button";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import User from "../../user/User";
import { useAuth } from "../../../context/AuthContext";

export default function UserProfile() {
  const { resize } = useNav();
  const { userData } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("darkMode");
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

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

        
          <Button
            onClick={toggleDarkMode}
            variant="outline"
            classname="p-2 rounded-sm bg-slate-500 text-sm text-white hover:bg-slate-600 transition-colors"
          >
            {isDarkMode ? <LuSun /> : <LuMoon />}
          </Button>
      </div>
    </div>
  );
}
