import CardOverview from "../../../ui/CardOverview";
import CreatedHeader from "./CreatedHeader";

export default function CreatedLayout({ handleBackToEdit, tags, pairs }) {
  return (
    <div className="medium:p-8 medium:max-w-xl mx-auto flex h-screen flex-col items-center px-5 lg:max-w-5xl">
      {/* Preview Header */}
      <CreatedHeader handleBackToEdit={handleBackToEdit} tags={tags} />

      {/* mx-auto mt-10 max-w-xl overflow-y-scroll rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 shadow-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 */}
      {/* Flashcard Display Section */}

      {/* rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg dark:border-blue-900 dark:bg-slate-800 */}
      <CardOverview classname="mx-auto max-w-3xl medium:mt-2 mt-4">
        <div className="space-y-6">
          {pairs.map((pair, idx) => (
            <div
              key={idx}
              // group flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm transition hover:scale-[1.02] hover:border-blue-300 dark:border-blue-900 dark:bg-slate-700/60
              className=""
            >
              <div className="flex items-center gap-2">
                <span className="rounded bg-blue-200 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  Term{" "}
                  {pairs.length > 2 ? `#${idx + 1}` : idx === 0 ? "One" : "Two"}
                </span>
                <span className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {pair.term || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-green-200 px-2 py-0.5 text-xs font-bold text-green-800 dark:bg-green-800 dark:text-green-100">
                  Definition
                </span>
                <span className="text-base text-slate-700 dark:text-slate-200">
                  {pair.definition || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </span>
              </div>
              {/* Placeholder for future fun stuff, e.g. emoji, stickers, etc. */}
            </div>
          ))}
        </div>
      </CardOverview>
      {/* You can add more fun controls below, e.g. color pickers, stickers, etc. */}
    </div>
  );
}
