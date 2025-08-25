import { LuClock } from "react-icons/lu";
import { useGen } from "../../../context/GeneralContext";
import Input from "../../../ui/Input";

export default function SessionOptional() {
  const { formData, setFormData, isSubmitting } = useGen();

  return (
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
          classname={`w-full dark:text-white pl-10  disabled:cursor-not-allowed`}
          disabled={isSubmitting}
          value={formData.estimatedTime}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value) || value < 1 || value > 180) return;

            setFormData((prev) => ({
              ...prev,
              estimatedTime: value,
            }));
          }}
        />
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Leave empty for auto-calculation (~2 min per card)
      </p>
    </div>
  );
}
