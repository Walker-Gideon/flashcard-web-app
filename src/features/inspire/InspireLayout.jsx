import { useEffect, useState } from "react";
import { inspireMockData } from "../../data/inspireMockData";
import { mockData } from "../../data/mockData";

import { LuFlame } from "react-icons/lu";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

export default function InspireLayout() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [currentPraiseIndex, setCurrentPraiseIndex] = useState(0);

  // Rotate quote every 10 seconds
  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuoteIndex(
        (prevIndex) => (prevIndex + 1) % inspireMockData.quotes.length,
      );
    }, 10000); // 10 seconds
    return () => clearInterval(quoteTimer);
  }, []);

  // Rotate praise every 15 seconds
  useEffect(() => {
    const praiseTimer = setInterval(() => {
      setCurrentPraiseIndex(
        (prevIndex) =>
          (prevIndex + 1) % inspireMockData.personalizedPraise.length,
      );
    }, 15000); // 15 seconds
    return () => clearInterval(praiseTimer);
  }, []);

  const currentQuote = inspireMockData.quotes[currentQuoteIndex];
  const currentPraise = inspireMockData.personalizedPraise[currentPraiseIndex];
  const streakDays = mockData.stats.streakDays; // Get streak from existing mockData

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Inspire & Progress
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Stay motivated and track your achievements
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Daily Motivational Quotes */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center space-x-3">
              {/* Lightbulb */}
              <LuMoon className="h-6 w-6 text-emerald-200" />
              <h3 className="text-xl font-semibold">Daily Inspiration</h3>
            </div>
            <blockquote className="mb-4 text-lg text-emerald-50 italic">
              "{currentQuote.text}"
            </blockquote>
            <p className="text-right text-sm text-emerald-100">
              - {currentQuote.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
