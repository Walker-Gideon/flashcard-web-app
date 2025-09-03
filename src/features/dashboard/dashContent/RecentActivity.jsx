import { useState, useEffect } from "react";
import CardOverview from "../../../ui/CardOverview";
import { LuAward, LuPlus, LuPenLine, LuBookOpen, LuCalendarPlus, LuBrain } from "react-icons/lu";
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
    action: "",
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
  const { updateSchedule, updateReview } = useGen()
  const { userData } = useAuth();
  const [recentActivity, setRecentActivity] = useState([]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (userData?.uid) {
      const saved = loadActivities(userData.uid);
      setRecentActivity(saved.length > 0 ? saved : initialActivity);
    }
  }, [userData?.uid]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000); // update every minute
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!userData?.uid) return;

    const update = recentActivity.map((data) => {
      if (data.type === "achievement") {
        const shouldShow = userData.streakCount >= 1;
        return {
          ...data,
          action: `Achieved ${userData.streakCount} day streak`,
          visible: shouldShow || data.visible,
          timestamp: shouldShow && !data.timestamp ? Date.now() : data.timestamp,
        };
      }

      if (data.type === "schedule") {
        return {
          ...data,
          visible: updateSchedule || data.visible,
          timestamp: updateSchedule && !data.timestamp ? Date.now() : data.timestamp,
        };
      }

      if (data.type === "review") {
        return {
          ...data,
          action: `Completed ${updateReview.cardTag} review session`,
          visible: updateReview.completed || data.visible,
          timestamp: updateReview.completed && !data.timestamp ? Date.now() : data.timestamp,
        };
      }

      return data;
    });

    // Only set state if changed
    const isDifferent = JSON.stringify(update) !== JSON.stringify(recentActivity);
    if (isDifferent) {
      setRecentActivity(update);
      saveActivities(userData.uid, update);
    }
  }, [userData.streakCount, updateSchedule, updateReview, recentActivity, userData?.uid]);

  // Save whenever recentActivity changes
  useEffect(() => {
    localStorage.setItem(
      `recentActivity_${userData.uid}`,
      JSON.stringify(recentActivity)
    );
  }, [recentActivity, userData.uid]);

  // storage helper
  function loadActivities(userId) {
    return JSON.parse(localStorage.getItem(`recentActivity_${userId}`)) || [];
  }

   // storage helper
  function saveActivities(userId, activities) {
    localStorage.setItem(
      `recentActivity_${userId}`,
      JSON.stringify(activities)
    );
  }

  function timeAgo(timestamp) {
    if (!timestamp) return "";
    const diff = Math.floor((Date.now() - timestamp) / 1000); // seconds

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return `${Math.floor(diff / 604800)}w ago`;
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
                  {timeAgo(activity.timestamp)}
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
