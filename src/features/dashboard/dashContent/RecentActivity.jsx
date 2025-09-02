import { useState, useEffect } from "react";
import CardOverview from "../../../ui/CardOverview";
import { LuBrain } from "react-icons/lu";
import { LuCalendarPlus } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuPenLine } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuAward } from "react-icons/lu";
import { useAuth } from "../../../context/AuthContext";

const initialActivity = [
  {
    id: 1,
    action: "Edited 'French Verbs' note",
    time: "",
    type: "edit",
    icon: LuPenLine,
    visible: false,
  },
  {
    id: 2,
    action: "Completed Biology review session",
    time: "",
    type: "review",
    icon: LuBrain,
    visible: false,
  },
  {
    id: 3,
    action: "Added 5 new flashcards to Math deck",
    time: "",
    type: "create",
    icon: LuPlus,
    visible: false,
  },
  {
    id: 4,
    action: "Achieved 7-day streak!",
    time: "",
    type: "achievement",
    icon: LuAward,
    visible: false,
  },
  {
    id: 5,
    action: "Updated study schedule",
    time: "",
    type: "schedule",
    icon: LuCalendarPlus,
    visible: false,
  },
];

export default function RecentActivity() {
  const { userData } = useAuth();
  const [recentActivity, setRecentActivity] = useState(initialActivity);

  useEffect(() => {
    const update = initialActivity.map((data) => {
      if (data.type === "achievement") {
        return {...data};
      }

      return data;
    });

    setRecentActivity(update);
  }, []);

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
                  {activity.time}
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
