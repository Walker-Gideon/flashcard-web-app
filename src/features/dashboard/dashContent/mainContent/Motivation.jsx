import { LuLightbulb, LuFlame } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import { useGen } from "../../../../context/GeneralContext";
import { useAuth } from "../../../../context/AuthContext";

export default function Motivation() {
  const { userData } = useAuth();
  const { quotes, currentQuoteIndex } = useGen();
  const currentQuote = quotes[currentQuoteIndex];

  const styling = "text-slate-900 dark:text-white";

  return (
    <CardOverview>
      <div className="mb-3 flex items-center space-x-2">
        <LuLightbulb className="h-5 w-5 text-slate-600 dark:text-slate-300" />
        <h3 className={`font-semibold ${styling}`}>Daily Inspiration</h3>
      </div>
      <blockquote className="mb-4 text-sm text-slate-500 italic dark:text-slate-400">
        "{currentQuote ? currentQuote.text : "Loading quote..."}"
      </blockquote>
      {userData?.streakCount !== 0 && (
        <div className="flex items-center space-x-2">
          <LuFlame className="h-4 w-4 text-slate-600 dark:text-slate-300" />
          <span className={`text-sm font-medium ${styling}`}>
            Keep your {userData.streakCount} day streak alive!
          </span>
        </div>
      )}
    </CardOverview>
  );
}
