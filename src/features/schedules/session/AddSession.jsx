import { useState } from "react";
import Overlay from "../../../ui/Overlay";
import SessionHeader from "./SessionHeader";

export default function AddSession() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Overlay model={true} type={"model"}>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <SessionHeader />

        <form onSubmit={() => {}} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Difficulty Level
            </label>
            <select
              value={}
              onChange={}
              className="w-full rounded-lg border border-slate-300 bg-white p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white"
              disabled={isSubmitting}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="mixed">Mixed</option>
            </select>
          </div>
        </form>
      </div>
    </Overlay>
  );
}
