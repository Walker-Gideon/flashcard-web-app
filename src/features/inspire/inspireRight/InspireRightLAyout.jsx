import StreakCounter from "./StreakCounter";
import Praise from "./Praise";
import ActionsInspire from "./ActionsInspire";

export default function InspireRightLAyout({ streakDays, currentPraise }) {
  return (
    <div className="space-y-6">
      <StreakCounter streakDays={streakDays} />
      <Praise currentPraise={currentPraise} />

      {/* This is optional */}
      <ActionsInspire />
    </div>
  );
}
