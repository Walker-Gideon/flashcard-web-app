import CardOverview from "../../../ui/CardOverview";
import { LuLightbulb } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import { useGen } from "../../../context/GeneralContext";
import { useEffect, useState } from "react";

export default function Motivation() {
  const { quote } = useGen();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  console.log(Object.keys(quote).length);
  // Rotate quote every 10 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % Object.keys(quote).length,
      );
    }, 10000);
    return () => clearInterval(quoteTimer);
  }, [quote]);

  const currentQuote = quote[currentQuoteIndex];

  console.log(currentQuote);

  return (
    <CardOverview classname={"text-slate-900 dark:text-white"}>
      <div className="mb-4 flex items-center space-x-3">
        <LuLightbulb className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Daily Inspiration</HeaderText>
      </div>
      <blockquote className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
        "{quote.text}"
      </blockquote>
      <p className="text-right text-sm">- {quote.author}</p>
    </CardOverview>
  );
}
