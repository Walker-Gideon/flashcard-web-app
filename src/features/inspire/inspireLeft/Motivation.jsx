import CardOverview from "../../../ui/CardOverview";
import { LuMoon } from "react-icons/lu";

export default function Motivation({ currentQuote }) {
  return (
    <CardOverview classname={"text-slate-900 dark:text-white"}>
      <div className="mb-4 flex items-center space-x-3">
        {/* Lightbulb */}
        <LuMoon className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <h3 className="text-xl font-semibold">Daily Inspiration</h3>
      </div>
      <blockquote className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-right text-sm">- {currentQuote.author}</p>
    </CardOverview>
  );
}
