import Overlay from "./Overlay";
import { LuX } from "react-icons/lu";

export default function ModelCard({ setShowReviewModal }) {
  return (
    <Overlay model={true}>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Review Flashcard
          </h3>
          <button
            onClick={() => setShowReviewModal(false)}
            className="cursor-pointer rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
          >
            <LuX className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Overlay>
  );
}
