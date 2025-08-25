import { LuTarget } from "react-icons/lu";
import { useGen } from "../../../context/GeneralContext";
import Input from "../../../ui/Input";

export default function SessionCardCount() {
  const { formData } = useGen();

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
        Number of Cards
      </label>
      <div className="relative">
        <LuTarget className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="number"
          placeholder="Auto-filled after selecting tag"
          classname={`w-full dark:text-white pl-10  disabled:cursor-not-allowed`}
          disabled={true}
          value={formData.count}
        />
      </div>
    </div>
  );
}
