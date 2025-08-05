import { inspireMockData } from "../../../data/inspireMockData";
import { LuFlame } from "react-icons/lu";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import { LuAward } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";
import HeaderText from "../../../ui/HeaderText";

export default function Achievement() {
  const iconStyling = "h-5 w-5";
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "FlameIcon":
        return <LuFlame className={iconStyling} />;
      case "BookOpen":
        return <LuBookOpen className={iconStyling} />;
      case "Sun":
        return <LuSun className={iconStyling} />;
      case "Moon":
        return <LuMoon className={iconStyling} />;
      case "Target":
        return <LuTarget className={iconStyling} />;
      default:
        return <LuAward className={iconStyling} />;
    }
  };

  return (
    <CardOverview>
      <HeaderText classname="mb-6">Your Achievements</HeaderText>

      <div className="medium:grid-cols-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        {inspireMockData.achievements.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center rounded-xl p-4 transition-all duration-200 ${
              badge.unlocked
                ? "bg-slate-200 text-slate-700 shadow-md hover:scale-105 dark:bg-slate-900 dark:text-slate-300"
                : "bg-slate-50 text-slate-400 opacity-60 dark:bg-slate-700/50 dark:text-slate-600"
            }`}
          >
            <div
              className={`mb-2 rounded-full p-3 ${
                badge.unlocked
                  ? "bg-slate-500 text-white"
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
    </CardOverview>
  );
}
