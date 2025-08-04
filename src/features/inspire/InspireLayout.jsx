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

          {/* Achievement Badges */}
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-800/70">
            <h3 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
              Your Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {inspireMockData.achievements.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center rounded-xl p-4 transition-all duration-200 ${
                    badge.unlocked
                      ? "bg-emerald-50 text-emerald-700 shadow-md hover:scale-105 dark:bg-emerald-900/20 dark:text-emerald-300"
                      : "bg-slate-50 text-slate-400 opacity-60 dark:bg-slate-700/50 dark:text-slate-600"
                  }`}
                >
                  <div
                    className={`mb-2 rounded-full p-3 ${
                      badge.unlocked
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-200 text-slate-500 dark:bg-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {getIconComponent(badge.icon)}
                  </div>
                  <p className="mb-1 text-center text-sm font-medium">
                    {badge.name}
                  </p>
                  <p className="text-center text-xs">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

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
                {inspireMockData.progress.weeklyStudyData.map((data, index) => (
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
                ))}
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
            <p className="text-right text-sm text-blue-100">- FlashMaster AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
