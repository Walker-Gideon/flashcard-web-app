import { inspireMockData } from "../../../data/inspireMockData";
import { LuFlame } from "react-icons/lu";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

export default function Achievement() {
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "FlameIcon":
        return <LuFlame className="h-5 w-5" />;
      case "BookOpen":
        return <LuBookOpen className="h-5 w-5" />;
      case "Sun":
        return <LuSun className="h-5 w-5" />;
      case "Moon":
        return <LuMoon className="h-5 w-5" />;
      case "Target":
        return <LuTarget className="h-5 w-5" />;
      default:
        // Award
        return <LuTarget className="h-5 w-5" />; // Default icon
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
      <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        Your Achievements
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {inspireMockData.achievements.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center rounded-xl p-4 transition-all duration-200 ${
              badge.unlocked
                ? "bg-emerald-50 text-emerald-700 shadow-md hover:scale-105 dark:bg-emerald-900/20 dark:text-emerald-300"
                : "bg-slate-50 text-slate-400 opacity-60 dark:bg-slate-700/50 dark:text-slate-600"
            }`}
          >
            <div
              className={`mb-2 rounded-full p-3 ${
                badge.unlocked
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-400"
              }`}
            >
              {getIconComponent(badge.icon)}
            </div>
            <p className="mb-1 text-center text-sm font-medium">{badge.name}</p>
            <p className="text-center text-xs">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
