import Overlay from "./Overlay";
import { LuX } from "react-icons/lu";

export default function ModelCard({ setShowReviewModal, selectedFlashcard }) {
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

        <div className="py-8 text-center">
          <h4 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
            {selectedFlashcard.term}
          </h4>
          <p className="mb-6 text-slate-600 dark:text-slate-300">
            Subject: {selectedFlashcard.subject}
          </p>
          <div className="space-y-3">
            <button className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-medium text-white transition-colors hover:bg-emerald-600">
              Easy
            </button>
            <button className="w-full rounded-xl bg-amber-500 px-4 py-3 font-medium text-white transition-colors hover:bg-amber-600">
              Medium
            </button>
            <button className="w-full rounded-xl bg-rose-500 px-4 py-3 font-medium text-white transition-colors hover:bg-rose-600">
              Hard
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
}
