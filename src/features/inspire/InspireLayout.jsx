import { useEffect, useState } from "react";
import { inspireMockData } from "../../data/inspireMockData";
import InspireHeader from "./InspireHeader";
import InspireLeftLayout from "./inspireLeft/InspireLeftLayout";
import InspireRightLAyout from "./inspireRight/InspireRightLAyout";

export default function InspireLayout() {
  const [currentPraiseIndex, setCurrentPraiseIndex] = useState(0);

  // Rotate praise every 15 seconds
  useEffect(() => {
    const praiseTimer = setInterval(() => {
      setCurrentPraiseIndex(
        (prevIndex) =>
          (prevIndex + 1) % inspireMockData.personalizedPraise.length,
      );
    }, 15000);
    return () => clearInterval(praiseTimer);
  }, []);

  const currentPraise = inspireMockData.personalizedPraise[currentPraiseIndex];

  return (
    <div className="defaultColor h-screen overflow-hidden">
      <InspireHeader />

      <div className="medium:mt-0 mt-7 grid h-screen grid-cols-1 gap-8 space-y-6 overflow-scroll p-6 lg:grid-cols-3">
        <InspireLeftLayout />
        <InspireRightLAyout currentPraise={currentPraise} />
      </div>
    </div>
  );
}
