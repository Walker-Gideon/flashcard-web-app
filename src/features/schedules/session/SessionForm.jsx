import { LuTarget } from "react-icons/lu";

import { LuPlus } from "react-icons/lu";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import { useGen } from "../../../context/GeneralContext";
import SessionSelectTag from "./SessionSelectTag";
import SessionOptional from "./SessionOptional";
import SessionDate from "./SessionDate";

export default function SessionForm() {
  const { setSessionModel, formData, isSubmitting } = useGen();

  const inputStyling = `w-full dark:text-white pl-10  disabled:cursor-not-allowed`;

  return (
    <form onSubmit={() => {}} className="space-y-4">
      {/* Select Tag */}
      <SessionSelectTag />

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
            classname={inputStyling}
            disabled={true}
            value={formData.count}
          />
        </div>
      </div>

      {/* Date and Time Row */}
      <SessionDate />

      {/* Estimated Time (Optional) */}
      <SessionOptional />

      {/* Action Buttons */}
      <div className="flex w-full justify-between space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setTimeout(() => {
              setSessionModel((show) => !show);
            }, 500)
          }
          classname="button dark:border-stone-300 border-slate-500 w-full dark:text-white disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline"
          classname="primaryButton w-full flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
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
