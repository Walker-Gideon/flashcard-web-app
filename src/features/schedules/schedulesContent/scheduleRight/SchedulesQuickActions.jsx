import { LuPlay } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuZap } from "react-icons/lu";
import CardOverview from "../../../../ui/CardOverview";
import CardHeader from "../../../../ui/CardHeader";
import Button from "../../../../ui/Button";
import useLoaderAction from "../../../../utils/LoaderAction";
import { useGen } from "../../../../context/GeneralContext";

export default function SchedulesQuickActions() {
  const { setSessionModel } = useGen();
  const navigate = useLoaderAction(1000);

  setTimeout(() => {
    // setSessionModel((show) => !show);
  }, 500);

  return (
    <CardOverview>
      <CardHeader title="Quick Actions"></CardHeader>
      <div className="space-y-3">
        {/* button one */}
        <Button
          onClick={() => {}}
          variant="outline"
          classname={
            "w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
          }
        >
          <LuPlay className="h-5 w-5" />
          <span>Start Next Session</span>
        </Button>

        {/* BUtton two */}
        <Button
          onClick={() => {}}
          variant="outline"
          classname={
            "w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
          }
        >
          <LuPlus className="h-5 w-5" />
          <span>Schedule Session</span>
        </Button>

        {/* BUtton three */}
        <Button
          onClick={() => {
            navigate("/dashboard/flashcards");
          }}
          variant="outline"
          classname={
            "w-full button flex items-center border-0 space-x-3 p-3 bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
          }
        >
          <LuZap className="h-5 w-5" />
          <span>Quick Review</span>
        </Button>
      </div>
    </CardOverview>
  );
}
