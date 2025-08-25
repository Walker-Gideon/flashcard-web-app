import { LuCalendar } from "react-icons/lu";
import { LuClock } from "react-icons/lu";
import { useGen } from "../../../context/GeneralContext";
import Input from "../../../ui/Input";

export default function SessionDate() {
  const { formData, setFormData, isSubmitting } = useGen();

  const inputStyling = `w-full dark:text-white pl-10  disabled:cursor-not-allowed`;

  return (
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
            classname={inputStyling}
            disabled={isSubmitting}
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
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
            classname={inputStyling}
            disabled={isSubmitting}
            value={formData.time}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, time: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
}
