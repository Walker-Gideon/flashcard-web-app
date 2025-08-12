import Button from "../../../ui/Button";
import CardOverview from "../../../ui/CardOverview";
import CreatedHeader from "./CreatedHeader";
import { LuChevronLeft } from "react-icons/lu";
import { LuChevronRight } from "react-icons/lu";

export default function CreatedLayout({ handleBackToEdit, tags, pairs }) {
  const styling = {
    buttons: `button bg-slate-500 border-0 text-white hover:bg-slate-600 focus:ring-slate-300 p-2 rounded-full`,
    icons: "h-6 w-6",
  };
  return (
    <div className="medium:p-8 medium:max-w-xl mx-auto flex h-screen flex-col items-center px-5 lg:max-w-5xl">
      <CreatedHeader handleBackToEdit={handleBackToEdit} tags={tags} />

      <CardOverview classname="mx-auto max-w-3xl mt-20">
        <div className="space-y-6">
          {pairs.map((pair, index) => (
            <div
              key={index}
              // group flex flex-col gap-2 rounded-xl border border-blue-100 bg-blue-50 p-4 shadow-sm transition hover:scale-[1.02] hover:border-blue-300 dark:border-blue-900 dark:bg-slate-700/60
              className="w-90 hover:scale-[1.02] lg:w-130"
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-medium text-slate-800 dark:text-slate-100">
                  {pair.term || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base text-slate-700 dark:text-slate-200">
                  {pair.definition || (
                    <span className="text-slate-400 italic">(empty)</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardOverview>

      <div className="mt-8 space-x-4">
        <Button
          variant="outline"
          classname={styling.buttons}
          onClick={() => {}}
        >
          <LuChevronLeft className={styling.icons} />
        </Button>
        <Button
          variant="outline"
          classname={styling.buttons}
          onClick={() => {}}
        >
          <LuChevronRight className={styling.icons} />
        </Button>
      </div>
    </div>
  );
}
