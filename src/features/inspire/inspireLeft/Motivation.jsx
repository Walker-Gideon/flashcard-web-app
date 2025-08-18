import CardOverview from "../../../ui/CardOverview";
import { LuLightbulb } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import { useGen } from "../../../context/GeneralContext";
import { useEffect, useState } from "react";

export default function Motivation() {
  const { quotes } = useGen();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    if (quotes.length === 0) return; // wait until quotes are loaded

    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 10000); // every 10 seconds

    return () => clearInterval(quoteTimer);
  }, [quotes]);

  const currentQuote = quotes[currentQuoteIndex];

  return (
    <CardOverview classname={"text-slate-900 dark:text-white"}>
      <div className="mb-4 flex items-center space-x-3">
        <LuLightbulb className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Daily Inspiration</HeaderText>
      </div>

      {currentQuote ? (
        <>
          <blockquote className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
            "{currentQuote.text}"
          </blockquote>
          <p className="text-right text-sm">— {currentQuote.author}</p>
        </>
      ) : (
        <>
          <div className="italic dark:text-slate-400">Loading quote...</div>
        </>
      )}
    </CardOverview>
  );
}
