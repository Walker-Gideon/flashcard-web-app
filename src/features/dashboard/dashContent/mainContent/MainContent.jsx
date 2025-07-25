import { mockData } from "../../../../data/mockData";
import { LuStar } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import MiniCalendar from "./MiniCalendar";
import CardsView from "./CardsView";
import CardOverview from "../../../../ui/CardOverview";

export default function MainContent() {
  return (
    <CardOverview>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardsView mockData={mockData} />

        <div className="space-y-6">
          <MiniCalendar studyDates={mockData.studyDates} />

          {/* Weak Areas */}
          <CardOverview>
            <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
              Focus Areas
            </h3>
            <div className="space-y-3">
              {mockData.weakAreas.map((area, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {area.topic}
                  </span>
                  <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
                    {area.count}
                  </span>
                </div>
              ))}
            </div>
          </CardOverview>

          {/* Motivation */}
          <CardOverview>
            <div className="mb-3 flex items-center space-x-2">
              <LuStar className="h-5 w-5 text-emerald-200" />
              <h3 className="font-semibold">Daily Inspiration</h3>
            </div>
            <blockquote className="mb-4 text-sm text-emerald-50 italic">
              "{mockData.quote}"
            </blockquote>
            <div className="flex items-center space-x-2">
              <LuFlame className="h-4 w-4 text-orange-300" />
              <span className="text-sm font-medium">
                Keep your {mockData.stats.streakDays}-day streak alive!
              </span>
            </div>
          </CardOverview>
        </div>
      </div>
    </CardOverview>
  );
}
