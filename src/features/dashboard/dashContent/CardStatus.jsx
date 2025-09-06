import { useEffect, useState } from "react";
import { useGen } from "../../../context/GeneralContext";
import { LuTarget } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuFlame } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";
import CardContent from "../../../ui/CardContent";
import CardBadge from "../../../ui/CardBadge";
import CardDiscription from "../../../ui/CardDiscription";

const initialCardData = [
  {
    icon: LuTarget,
    data: 0,
    text: "Mastery Cards",
  },
  {
    icon: LuBookOpen,
    data: 0,
    text: "Cards Today",
  },
  {
    icon: LuClock,
    data: 0 + "m",
    text: "Study Time",
  },
  {
    icon: LuFlame,
    data: 0,
    text: "Day Streak",
  },
];

export default function CardStatus() {
  const { progress, loadingProgress, todayFlashcards } = useGen();
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

        if (card.text === "Mastery Cards") {
          return { ...card, data: progress?.masteredFlashcards };
        }

        return card;
      });

      setCardData(updated);
    }
  }, [loadingProgress, progress, todayFlashcards?.length]);

  return (
    <div className="medium:grid-cols-2 grid grid-cols-1 gap-6 lg:grid-cols-4">
      {cardData.map((data, index) => (
        <div key={index}>
          <CardOverview showShadow={true}>
            <CardContent classname={`flex items-center justify-between mb-4 `}>
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
          </CardOverview>
        </div>
      ))}
    </div>
  );
}
