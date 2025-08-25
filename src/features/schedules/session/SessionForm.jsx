import { LuTarget } from "react-icons/lu";
import { LuCalendar } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import { useGen } from "../../../context/GeneralContext";

export default function SessionForm({ isSubmitting }) {
  const { setSessionModel } = useGen();

  return (
    <form onSubmit={() => {}} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Select Tag *
        </label>
        <select
          className="input w-full dark:bg-slate-700 dark:text-white"
          disabled={isSubmitting}
        >
          <option value="" disabled selected hidden>
            e.g., Biology, French Verbs
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>

      {/* Card Count */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Number of Cards
        </label>
        <div className="relative">
          <LuTarget className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="number"
            placeholder="e.g., 15"
            classname={`w-full dark:text-white pl-10`}
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Date and Time Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Date */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date *
          </label>
          <div className="relative">
            <LuCalendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="date"
              classname={`w-full pl-10 dark:text-white`}
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Time *
          </label>
          <div className="relative">
            <LuClock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="time"
              classname={`w-full pl-10 dark:text-white`}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Estimated Time (Optional) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Estimated Time (minutes)
        </label>
        <div className="relative">
          <LuClock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            type="number"
            min="1"
            max="180"
            placeholder="Auto-calculated if empty"
            classname="pl-10 w-full dark:text-white"
            disabled={isSubmitting}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Leave empty for auto-calculation (~2 min per card)
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setTimeout(() => {
              setSessionModel((show) => !show);
            }, 500)
          }
          classname="flex-1 button"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline"
          classname="primaryButton flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Adding...
            </>
          ) : (
            <>
              <LuPlus className="mr-2 h-4 w-4" />
              Add Session
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
