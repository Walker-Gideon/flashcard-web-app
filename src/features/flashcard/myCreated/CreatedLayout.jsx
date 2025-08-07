import CreatedHeader from "./CreatedHeader";

export default function CreatedLayout({ handleBackToEdit, tags, pairs }) {
  return (
    <div className="medium:p-8 mx-auto flex h-screen max-w-5xl flex-col items-center px-5">
      {/* Preview Header */}
      <CreatedHeader handleBackToEdit={handleBackToEdit} tags={tags} />

      <div className="mx-auto mt-10 max-w-xl overflow-y-scroll rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6 shadow-2xl dark:from-slate-800 dark:via-slate-900 dark:to-slate-800">
        {/* Fun styling area - you can add color pickers, stickers, etc. here in the future */}
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Example: Tag display */}
          {tags && (
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              {tags}
            </span>
          )}
          {/* Placeholder for future fun stuff */}
          {/* <button className="rounded bg-yellow-200 px-2 py-1 text-xs">🎨 Color</button> */}
        </div>

        {/* Flashcard Display Section */}
        <div className="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg dark:border-blue-900 dark:bg-slate-800">
          <div className="mb-4 text-center text-lg font-semibold text-blue-600 dark:text-blue-300">
            Flashcard Terms & Definitions
          </div>
          <div className="space-y-6">
            {pairs.map((pair, idx) => (
              <div
                key={idx}
                className="group flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm transition hover:scale-[1.02] hover:border-blue-300 dark:border-blue-900 dark:bg-slate-700/60"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-200 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                    Term{" "}
                    {pairs.length > 2
                      ? `#${idx + 1}`
                      : idx === 0
                        ? "One"
                        : "Two"}
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
        </div>
        {/* You can add more fun controls below, e.g. color pickers, stickers, etc. */}
      </div>
    </div>
  );
}
