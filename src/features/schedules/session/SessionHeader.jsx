import { LuX } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import Button from "../../../ui/Button";
import { useGen } from "../../../context/GeneralContext";

export default function SessionHeader({ setError }) {
  const { setSessionModel, isSubmitting, setFormData } = useGen();

  return (
    <header className="mb-6 flex items-center justify-between">
      <HeaderText className="text-xl font-semibold text-slate-900 dark:text-white">
        Add Study Session
      </HeaderText>
      <Button
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
            setError("");
          }, 500)
        }
        disabled={isSubmitting}
        classname="rounded-lg p-1 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200 disabled:cursor-not-allowed"
      >
        <LuX className="h-5 w-5" />
      </Button>
    </header>
  );
}
