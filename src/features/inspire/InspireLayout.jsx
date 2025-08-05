import { useEffect, useState } from "react";
import { inspireMockData } from "../../data/inspireMockData";
import { mockData } from "../../data/mockData";

import { LuBookOpen } from "react-icons/lu";
import { LuChartColumnIncreasing } from "react-icons/lu";
import InspireHeader from "./InspireHeader";
import InspireLeftLayout from "./inspireLeft/InspireLeftLayout";
import InspireRightLAyout from "./inspireRight/InspireRightLAyout";

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

  return (
    <div className="defaultColor h-screen overflow-hidden">
      <InspireHeader />

      <div className="medium:mt-0 mt-7 grid h-screen grid-cols-1 gap-8 space-y-6 overflow-scroll p-6 lg:grid-cols-3">
        <InspireLeftLayout currentQuote={currentQuote} />

        {/* Right Column */}

        <div>
          <InspireRightLAyout
            streakDays={streakDays}
            currentPraise={currentPraise}
          />
          {/* Streak Counter */}

          {/* Personalized Praise */}

          {/* Quick Actions (Optional, can be removed if not needed) */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="flex w-full items-center space-x-3 rounded-xl bg-emerald-50 p-3 text-emerald-700 transition-colors hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30">
                <LuBookOpen className="h-5 w-5" />
                <span>Review Cards</span>
              </button>
              <button className="flex w-full items-center space-x-3 rounded-xl bg-blue-50 p-3 text-blue-700 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30">
                <LuChartColumnIncreasing className="h-5 w-5" />
                <span>View Detailed Analytics</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
