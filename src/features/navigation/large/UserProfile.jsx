import { useNav } from "../../../context/NavigateContext";
import Button from "../../../ui/Button";
import { LuUser } from "react-icons/lu";
import { LuMoon } from "react-icons/lu";
import { LuSun } from "react-icons/lu";

export default function UserProfile() {
  const { resize } = useNav();

  return (
    <div className="border-t border-stone-300 px-1 py-2 dark:border-slate-700">
      <div className="flex w-full items-center justify-between rounded-sm bg-slate-50 px-2 py-3 dark:bg-slate-700/50">
        <div className="flex items-center gap-2">
          <div
            className={`z-50 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950`}
          >
            <LuUser className="text-white" />
          </div>

          <p
            className={`transitioning z-30 text-sm font-bold whitespace-nowrap text-slate-900 dark:text-white ${resize ? `translate-x-0 delay-75` : `-translate-x-[150px]`} inline-block`}
          >
            User Name
          </p>
        </div>

        <div
          className={`transitioning z-30 ${resize ? `translate-x-0 delay-150` : `-translate-x-[170px]`} inline-block`}
        >
          <Button
            variant="outline"
            classname="p-2 rounded-sm bg-slate-950 dark:bg-slate-600 text-sm text-white hover:bg-slate-900 dark:hover:bg-slate-500 transition-colors"
          >
            <LuSun />
          </Button>
        </div>
      </div>
    </div>
  );
}
