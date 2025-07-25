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
    data: mockData.stats.todaysMastery + "%",
    text: "Mastery",
    other: <TargetCardStatus />,
  },
  {
    icon: LuBookOpen,
    data: mockData.stats.flashcardsReviewed,
    text: "Cards Today",
    styling: "mb-6",
  },
  {
    icon: LuClock,
    data: mockData.stats.timeSpent + "m",
    text: "Study Time",
    styling: "mb-6",
  },
  {
    icon: LuFlame,
    data: mockData.stats.streakDays,
    text: "Day Streak",
    styling: "mb-6",
  },
];

export default function CardStatus() {
  return (
    <div className="medium:h-auto medium:overflow-hidden medium:grid-cols-2 grid h-[100%] grid-cols-1 gap-6 overflow-y-scroll bg-red-500 lg:grid-cols-4">
      {cardData.map((data, index) => (
        <div key={index}>
          <CardOverview showShadow={true}>
            <CardContent
              classname={`flex items-center justify-between mb-4 ${data.styling}`}
            >
              <CardBadge
                classname={`rounded-xl p-3 bg-slate-100 dark:bg-slate-700`}
              >
                <data.icon
                  className={`h-5 w-5 text-slate-600 dark:text-slate-400`}
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
