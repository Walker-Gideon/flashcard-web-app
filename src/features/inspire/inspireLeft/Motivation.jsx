import CardOverview from "../../../ui/CardOverview";
import { LuLightbulb } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import quotes from "../../../utils/quotes";

export default function Motivation({ currentQuote }) {
  console.log(quotes);
  return (
    <CardOverview classname={"text-slate-900 dark:text-white"}>
      <div className="mb-4 flex items-center space-x-3">
        <LuLightbulb className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Daily Inspiration</HeaderText>
      </div>
      <blockquote className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-right text-sm">- {currentQuote.author}</p>
    </CardOverview>
  );
}
