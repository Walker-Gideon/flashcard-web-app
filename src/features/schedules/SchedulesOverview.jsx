import { schedulesMockData } from "../../data/schedulesMockData.js";
import { LuTarget } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import { LuTrendingUp } from "react-icons/lu";
import TargetCardStatus from "../dashboard/dashContent/TargetCardStatus.jsx";
import CardOverview from "../../ui/CardOverview.jsx";
import CardContent from "../../ui/CardContent.jsx";
import CardBadge from "../../ui/CardBadge.jsx";
import CardDiscription from "../../ui/CardDiscription.jsx";

const cardData = [
  {
    icon: LuTarget,
    data:
      schedulesMockData.todayStats.completedCards /
      schedulesMockData.todayStats.dueCards,
    text: "Cards Today",
    other: <TargetCardStatus />,
  },
  {
    icon: LuClock,
    data: schedulesMockData.todayStats.studyTime + "m",
    text: "Study Time",
    styling: "mb-6",
  },
  {
    icon: LuFlame,
    data: schedulesMockData.todayStats.streak,
    text: "Day Streak",
    styling: "mb-6",
  },
  {
    icon: LuTrendingUp,
    data: schedulesMockData.todayStats.completionRate + "%",
    text: "Success Rate",
    styling: "mb-6",
  },
];

export default function SchedulesOverview() {
  return (
    <div className="medium:grid-cols-2 grid grid-cols-1 gap-6 lg:grid-cols-4">
      {cardData.map((data, index) => (
        <div key={index}>
          <CardOverview showShadow={true}>
            <CardContent
              classname={`flex items-center justify-between mb-4 ${data.styling}`}
            >
              <CardBadge
                classname={`rounded-xl p-3 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700`}
              >
                <data.icon
                  className={`h-5 w-5 text-slate-600 dark:text-slate-300`}
                />
              </CardBadge>

              <CardDiscription
                classOverall={"text-right"}
                textOne={data.data}
                textTwo={data.text}
              />
            </CardContent>
            {data.other}
          </CardOverview>
        </div>
      ))}
    </div>
  );
}
