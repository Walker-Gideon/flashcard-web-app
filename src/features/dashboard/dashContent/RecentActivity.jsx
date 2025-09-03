import { useState, useEffect } from "react";
import CardOverview from "../../../ui/CardOverview";
import { LuBrain } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuAward } from "react-icons/lu";
import { useAuth } from "../../../context/AuthContext";
import { useGen } from "../../../context/GeneralContext";

const initialActivity = [
  {
    id: 1,
    action: "Edited 'French Verbs' note",
    timestamp: null,
    type: "edit",
    icon: LuPenLine,
    visible: false,
  },
  {
    id: 2,
    action: "Completed Biology review session",
    timestamp: null,
    type: "review",
    icon: LuBrain,
    visible: false,
  },
  {
    id: 3,
    action: "Added 5 new flashcards to Math deck",
    timestamp: null,
    type: "create",
    icon: LuPlus,
    visible: false,
  },
  {
    id: 4,
    action: "",
    timestamp: null,
    type: "achievement",
    icon: LuAward,
    visible: false,
  },
  {
    id: 5,
    action: "Updated study schedule",
    timestamp: null,
    type: "schedule",
    icon: LuCalendarPlus,
    visible: false,
  },
];

export default function RecentActivity() {
  const { updateSchedule } = useGen()
  const { userData } = useAuth();
  const [recentActivity, setRecentActivity] = useState(initialActivity);
  const [now, setNow] = useState(Date.now());
  // updateReview, setUpdateReview

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000); // update every minute
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const update = initialActivity.map((data) => {
      if (data.type === "achievement") {
        const shouldShow = userData.streakCount >= 1;
        return {
          ...data, action: `Achieved ${userData.streakCount} day streak`, 
          visible: shouldShow || data.visible, 
          timestamp: shouldShow && !data.timestamp ? Date.now() : data.timestamp,
        };
      }

      if(data.type === "schedule") {
        return {
          ...data, 
          visible: updateSchedule || data.visible, 
          timestamp: updateSchedule && !data.timestamp ? Date.now() : data.timestamp,
        }
      }

      return data;
    });

    setRecentActivity(update);
  }, [userData.streakCount, updateSchedule]);

  function timeAgo(ts, now = Date.now()) {
    const s = Math.floor((now - ts) / 1000);
    if (s < 5) return "just now";
    if (s < 60) return `${s} second${s === 1 ? "" : "s"} ago`;

    const m = Math.floor(s / 60);
    if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;

    const h = Math.floor(m / 60);
    if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;

    const d = Math.floor(h / 24);
    if (d < 7) return `${d} day${d === 1 ? "" : "s"} ago`;
     
    const w = Math.floor(d / 7);
    if (w < 5) return `${w} week${w === 1 ? "" : "s"} ago`;

    const mo = Math.floor(d / 30);
    if (mo < 12) return `${mo} month${mo === 1 ? "" : "s"} ago`;

    const y = Math.floor(d / 365);
    return `${y} year${y === 1 ? "" : "s"} ago`;
  }


  return (
    <CardOverview classname={"mb-18"}>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Recent Activity
      </h3>

      {recentActivity.filter(a => a.visible).length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentActivity.filter((activity) => activity.visible).map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 rounded-xl bg-slate-50 p-4 dark:bg-slate-700/50">
              <div className="flex-shrink-0 rounded-lg bg-gradient-to-r from-slate-200 to-slate-300 p-2 dark:from-slate-600 dark:to-slate-700">
                <activity.icon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  {activity.action}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.timestamp ? timeAgo(activity.timestamp, now) : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      ): (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-slate-500 dark:text-slate-50">No recent activity yet.</p>
        </div>
      )}
    </CardOverview>
  );
}
