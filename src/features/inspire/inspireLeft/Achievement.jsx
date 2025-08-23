import { LuFlame, LuBookOpen, LuSun, LuMoon, LuTarget } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";
import HeaderText from "../../../ui/HeaderText";
import { useEffect, useState } from "react";
import { useGen } from "../../../context/GeneralContext";

const initialAchievements = [
  {
    id: 1,
    name: "7-Day Streak",
    description: "Maintained a study streak for 7 consecutive days.",
    unlocked: false,
    icon: LuFlame,
  },
  {
    id: 2,
    name: "100 Cards Studied",
    description: "Studied 100 flashcards across any sessions.",
    unlocked: false,
    icon: LuBookOpen,
  },
  {
    id: 3,
    name: "Early Bird",
    description: "Completed a study session before 8 AM.",
    unlocked: false,
    icon: LuSun,
  },
  {
    id: 4,
    name: "Night Owl",
    description: "Completed a study session after 10 PM.",
    unlocked: false,
    icon: LuMoon,
  },
  {
    id: 5,
    name: "Subject Master",
    description: "Achieved 90% mastery in a subject.",
    unlocked: false,
    icon: LuTarget,
  },
];

export default function Achievement() {
  const { progress, loadingProgress } = useGen();
  const [achievements, setAchievements] = useState(initialAchievements);

  useEffect(() => {
    if (!loadingProgress && progress) {
      const updated = initialAchievements.map((badge) => {
        if (badge.name === "7-Day Streak") {
          return { ...badge, unlocked: progress?.streakCount >= 7 };
        }

        if (badge.name === "100 Cards Studied") {
          return {
            ...badge,
            unlocked: progress?.masteredFlashcards >= 100,
          };
        }
        return badge;
      });

      setAchievements(updated);
    }
  }, [progress, loadingProgress]);

  return (
    <CardOverview>
      <HeaderText classname="mb-6">Your Achievements</HeaderText>

      <div className="medium:grid-cols-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        {achievements.map((badge) => (
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
              <badge.icon className="h-5 w-5" />
            </div>
            <p className="mb-1 text-center text-sm font-medium">{badge.name}</p>
            <p className="text-center text-xs">{badge.description}</p>
          </div>
        ))}
      </div>
    </CardOverview>
  );
}

/*  
      <div className="medium:grid-cols-3 grid grid-cols-2 gap-4 md:grid-cols-4">
        {achievements.map((badge) => (
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
              <badge.icon className="h-5 w-5" />
            </div>
            <p className="mb-1 text-center text-sm font-medium">{badge.name}</p>
            <p className="text-center text-xs">{badge.description}</p>
          </div>
        ))}
      </div>
       */
