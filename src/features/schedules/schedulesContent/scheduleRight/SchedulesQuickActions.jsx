import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import useLoaderAction from "../../../../utils/LoaderAction";
import { useGen } from "../../../../context/GeneralContext";
import QuickActionButton from "../../../../ui/QuickActionButton";

export default function SchedulesQuickActions() {
  const { setSessionModel } = useGen();
  const navigate = useLoaderAction(1000);

  return (
    <CardOverview>
      <CardHeader title="Quick Actions"></CardHeader>
      <div className="space-y-3">
        <QuickActionButton
          text="Start Next Session"
          icon={<LuPlay className="h-5 w-5" />}
          onClick={() => {}}
        />

        <QuickActionButton
          text="Add Session"
          icon={<LuPlus className="h-5 w-5" />}
          onClick={() => {
            setTimeout(() => {
              setSessionModel((show) => !show);
            }, 500);
          }}
        />

        <QuickActionButton
          text="Quick Review"
          icon={<LuZap className="h-5 w-5" />}
          onClick={() => {
            navigate("/dashboard/flashcards");
          }}
        />
      </div>
    </CardOverview>
  );
}
