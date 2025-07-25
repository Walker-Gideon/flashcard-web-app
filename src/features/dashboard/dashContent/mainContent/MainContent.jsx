import { mockData } from "../../../../data/mockData";
import { LuStar } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import MiniCalendar from "./MiniCalendar";
import CardsView from "./CardsView";
import CardOverview from "../../../../ui/CardOverview";
import WeakAreas from "./WeakAreas";

export default function MainContent() {
  return (
    <CardOverview>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardsView mockData={mockData} />

        <div className="space-y-6">
          <MiniCalendar studyDates={mockData.studyDates} />

          {/* Weak Areas */}
          <WeakAreas mockData={mockData} />

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
