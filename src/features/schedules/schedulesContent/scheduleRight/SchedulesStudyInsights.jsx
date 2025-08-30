import CardContent from "../../../../ui/CardContent";
import CardHeader from "../../../../ui/CardHeader";
import CardOverview from "../../../../ui/CardOverview";

const insights = [
  {
    title: "Peak Performance",
    // Will get this from the database
    subData: "2:00 PM - 4:00 PM",
    range: "85%",
  },
  {
    title: "Weekly Goal",
    // Will get this from the database
    subData: "180/200 cards",
    range: "90%",
  },
  {
    title: "Retention Rate",
    // Will get this from the database
    subData: "92%",
    range: "92%",
  },
];

export default function SchedulesStudyInsights() {
  return (
    <CardOverview>
      <CardHeader title="Study Insights"></CardHeader>
      <div className="space-y-4">
        {insights.map((data, index) => (
          <CardContent
            key={index}
            classname="rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {data.title}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {data.subData}
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
              <div
                className="h-2 rounded-full bg-emerald-600"
                style={{ width: `${data.range}` }}
              ></div>
            </div>
          </CardContent>
        ))}
      </div>
    </CardOverview>
  );
}
