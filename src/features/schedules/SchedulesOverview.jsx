import { useEffect, useState } from "react";
import { useGen } from "../../context/GeneralContext.jsx";
import { LuTarget } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import { LuTrendingUp } from "react-icons/lu";
import TargetCardStatus from "../dashboard/dashContent/TargetCardStatus.jsx";
import CardOverview from "../../ui/CardOverview.jsx";
import CardContent from "../../ui/CardContent.jsx";
import CardBadge from "../../ui/CardBadge.jsx";
import CardDiscription from "../../ui/CardDiscription.jsx";

const initialCardData = [
  {
    icon: LuTarget,
    data: 0,
    text: "Cards Today",
    other: <TargetCardStatus />,
  },
  {
    icon: LuClock,
    data: 0 + "m",
    text: "Study Time",
    styling: "mb-6",
  },
  {
    icon: LuFlame,
    data: 0,
    text: "Day Streak",
    styling: "mb-6",
  },
  {
    icon: LuTrendingUp,
    data: 0 + "%",
    text: "Success Rate",
    styling: "mb-6",
  },
];

export default function SchedulesOverview() {
  const { progress, loadingProgress, consistencyScore, todayFlashcards } =
    useGen();
  const [cardData, setCardData] = useState(initialCardData);

  useEffect(() => {
    if (!loadingProgress && progress) {
      const today = new Date().toISOString().split("T")[0];
      const todayCards = progress.studyLogs?.[today] || 0;

      const updated = initialCardData.map((card) => {
        if (card.text === "Cards Today") {
          return { ...card, data: todayFlashcards?.length };
        }

        if (card.text === "Day Streak") {
          return { ...card, data: progress?.streakCount };
        }

        if (card.text === "Study Time") {
          return { ...card, data: todayCards + "m" };
        }

        if (card.text === "Success Rate") {
          return { ...card, data: consistencyScore + "%" };
        }

        return card;
      });

      setCardData(updated);
    }
  }, [loadingProgress, progress, consistencyScore, todayFlashcards?.length]);

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
