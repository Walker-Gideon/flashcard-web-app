import { useEffect, useState } from "react";
import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import Button from "../../../../ui/Button";
import useLoaderAction from "../../../../utils/LoaderAction";
import { useGen } from "../../../../context/GeneralContext";

const actionsData = [
  {
    icon: LuPlay,
    text: "Start Next Session",
    to: "",
  },
  {
    icon: LuPlus,
    text: "Schedule Session",
    popAction: false,
  },
  {
    icon: LuZap,
    text: "Quick Review",
    to: "/dashboard/flashcards",
  },
];

export default function SchedulesQuickActions() {
  const { setSessionModel } = useGen();
  const [actions, setActions] = useState(actionsData);
  const navigate = useLoaderAction(1000);

  useEffect(() => {
    const updateActions = actionsData.map((data) => {
      console.log(data);

      if (data.text === "Schedule Session") {
        console.log("After clicking ", data);
        setTimeout(() => {
          setSessionModel((show) => !show);
        }, 500);
        return { ...data, popAction: true };
      }

      return data;
    });

    setActions(updateActions);
  }, [setSessionModel]);

  return (
    <CardOverview>
      <CardHeader title="Quick Actions"></CardHeader>
      <div className="space-y-3">
        {actions.map((data, index) => (
          <Button
            key={index}
            onClick={() => {
              navigate(data.to);
            }}
            variant="outline"
            classname={
              "w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
            }
          >
            <data.icon className="h-5 w-5" />
            <span>{data.text}</span>
          </Button>
        ))}
      </div>
    </CardOverview>
  );
}
