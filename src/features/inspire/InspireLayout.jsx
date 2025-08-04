import { useEffect, useState } from "react";
import { inspireMockData } from "../../data/inspireMockData";
import { mockData } from "../../data/mockData";

import { LuFlame } from "react-icons/lu";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";
import InspireHeader from "./InspireHeader";
import InspireLeftLayout from "./inspireLeft/InspireLeftLayout";

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

      <main className="medium:mt-0 mt-7 h-screen space-y-6 overflow-scroll p-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <InspireLeftLayout currentQuote={currentQuote} />
          <div>
            {/* Achievement Badges */}

            {/* Progress Visualizations */}
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
              <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
                Study Progress
              </h3>

              {/* Weekly Study Heatmap */}
              <div className="mb-8">
                <h4 className="mb-3 text-lg font-medium text-slate-800 dark:text-white">
                  Weekly Study Heatmap
                </h4>
                <div className="grid grid-cols-7 gap-1">
                  {inspireMockData.progress.weeklyStudyData.map(
                    (data, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <span className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                          {data.day}
                        </span>
                        <div
                          className={`h-12 w-full rounded-md transition-colors duration-200 ${
                            data.minutes > 60
                              ? "bg-emerald-600"
                              : data.minutes > 30
                                ? "bg-emerald-500"
                                : data.minutes > 0
                                  ? "bg-emerald-300"
                                  : "bg-slate-200 dark:bg-slate-700"
                          }`}
                          title={`${data.minutes} minutes`}
                        ></div>
                      </div>
                    ),
                  )}
                </div>
                <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                  Darker shades mean more study time.
                </p>
              </div>

              {/* Consistency Bar Chart */}
              <div>
                <h4 className="mb-3 text-lg font-medium text-slate-800 dark:text-white">
                  Consistency Score
                </h4>
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                      style={{
                        width: `${inspireMockData.progress.consistencyScore}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                    {inspireMockData.progress.consistencyScore}%
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Your overall study consistency.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Streak Counter */}
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 text-center backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
              <LuFlame className="mx-auto mb-3 h-12 w-12 text-orange-500" />
              <p className="text-4xl font-bold text-slate-900 dark:text-white">
                {streakDays}
              </p>
              <p className="mb-3 text-lg text-slate-600 dark:text-slate-300">
                Day Streak!
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don’t break your streak!
              </p>
            </div>

            {/* Personalized Praise */}
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
              <div className="mb-4 flex items-center space-x-3">
                {/* Award */}
                <LuTarget className="h-6 w-6 text-blue-200" />
                <h3 className="text-xl font-semibold">Your Encouragement</h3>
              </div>
              <p className="mb-4 text-lg text-blue-50 italic">
                "{currentPraise}"
              </p>
              <p className="text-right text-sm text-blue-100">
                - FlashMaster AI
              </p>
            </div>

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
                  {/* BarChart3 */}
                  <LuFlame className="h-5 w-5" />
                  <span>View Detailed Analytics</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
