import { mockData } from "../../../data/mockData";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";
import CardContent from "../../../ui/CardContent";
import CardBadge from "../../../ui/CardBadge";
import CardDiscription from "../../../ui/CardDiscription";
import TargetCardStatus from "./TargetCardStatus";

const cardData = [
  {
    icon: LuTarget,
    iconColors: "text-emerald-600 dark:text-emerald-400",
    badgeColor: "bg-emerald-100 p-3 dark:bg-emerald-900/30",
    data: mockData.stats.todaysMastery + "%",
    text: "Mastery",
    other: <TargetCardStatus />,
  },
  {
    icon: LuBookOpen,
    iconColors: "text-blue-600 dark:text-blue-400",
    badgeColor: "bg-blue-100 p-3 dark:bg-blue-900/30",
    data: mockData.stats.flashcardsReviewed,
    text: "Cards Today",
    styling: "mb-6",
  },
  {
    icon: LuClock,
    iconColors: "text-purple-600 dark:text-purple-400",
    badgeColor: "bg-purple-100 p-3 dark:bg-purple-900/30",
    data: mockData.stats.timeSpent + "m",
    text: "Study Time",
    styling: "mb-6",
  },
  {
    icon: LuFlame,
    iconColors: "text-orange-600 dark:text-orange-400",
    badgeColor: "bg-orange-100 p-3 dark:bg-orange-900/30",
    data: mockData.stats.streakDays,
    text: "Day Streak",
    styling: "mb-6",
  },
];

export default function CardStatus() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {cardData.map((data, index) => (
        <div key={index}>
          <CardOverview showShadow={true}>
            <CardContent
              classname={`flex items-center justify-between mb-4 ${data.styling}`}
            >
              <CardBadge classname={`rounded-xl p-3 ${data.badgeColor}`}>
                <data.icon className={`h-6 w-6 ${data.iconColors}`} />
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
