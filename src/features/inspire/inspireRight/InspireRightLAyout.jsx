import React from "react";
import StreakCounter from "./StreakCounter";
import Praise from "./Praise";
import ActionsInspire from "./ActionsInspire";

export default function InspireRightLAyout() {
  return (
    <div className="space-y-6">
      <StreakCounter />
      <Praise />

      {/* This is optional */}
      <ActionsInspire />
    </div>
  );
}
