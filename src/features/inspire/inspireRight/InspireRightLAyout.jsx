import StreakCounter from "./StreakCounter";
import Praise from "./Praise";
import ActionsInspire from "./ActionsInspire";

export default function InspireRightLAyout({ streakDays }) {
  return (
    <div className="space-y-6">
      <StreakCounter streakDays={streakDays} />
      <Praise />

      {/* This is optional */}
      <ActionsInspire />
    </div>
  );
}
