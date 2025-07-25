import CardOverview from "../../../../ui/CardOverview";

export default function WeakAreas({ mockData }) {
  return (
    <CardOverview>
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">
        Focus Areas
      </h3>
      <div className="space-y-3">
        {mockData.weakAreas.map((area, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-700/50"
          >
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {area.topic}
            </span>
            <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-medium text-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
              {area.count}
            </span>
          </div>
        ))}
      </div>
    </CardOverview>
  );
}
