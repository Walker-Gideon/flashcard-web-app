import CardOverview from "../../../ui/CardOverview";
import { LuPlus } from "react-icons/lu";
import { LuPlay } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import useLoaderAction from "../../../utils/LoaderAction";

const actionsData = [
  {
    icon: LuPlus,
    text: "New Card",
    to: "flashcards",
  },
  {
    icon: LuPlay,
    text: "Study Now",
    // will chnage this later in the course of time
    to: "notes",
  },
  {
    icon: LuZap,
    text: "AI Help",
    to: "",
  },
  {
    icon: LuCalendar,
    text: "Schedule",
    to: "schedules",
  },
];

export default function QuickAction() {
  const navigate = useLoaderAction(1000);

  return (
    <CardOverview>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actionsData.map((data, index) => (
          <button
            key={index}
            onClick={() => navigate(data.to)}
            className="group flex cursor-pointer flex-col items-center space-y-3 rounded-xl bg-slate-50 p-6 transition-all duration-300 hover:scale-105 hover:bg-slate-100 hover:shadow-md dark:bg-slate-700/50 dark:hover:bg-slate-700"
          >
            <div className="rounded-xl bg-slate-300 p-3 transition-colors group-hover:bg-slate-200 dark:bg-slate-500">
              <data.icon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <span className="medium:text-sm text-xs font-medium text-slate-700 dark:text-slate-300">
              {data.text}
            </span>
          </button>
        ))}
      </div>
    </CardOverview>
  );
}
