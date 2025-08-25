import { LuPlus } from "react-icons/lu";
import Button from "../../../ui/Button";
import { useGen } from "../../../context/GeneralContext";
import SessionSelectTag from "./SessionSelectTag";
import SessionOptional from "./SessionOptional";
import SessionDate from "./SessionDate";
import SessionCardCount from "./SessionCardCount";

export default function SessionForm() {
  const { setSessionModel, isSubmitting, setFormData } = useGen();

  return (
    <form onSubmit={() => {}} className="space-y-4">
      <SessionSelectTag />
      <SessionCardCount />
      <SessionDate />
      <SessionOptional />

      <div className="flex w-full justify-between space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setTimeout(() => {
              setSessionModel((show) => !show);
              setFormData({
                tag: "",
                count: "",
                date: "",
                time: "",
                estimatedTime: "",
              });
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
