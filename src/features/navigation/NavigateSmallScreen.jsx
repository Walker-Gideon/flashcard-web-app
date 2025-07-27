import { useNav } from "../../context/NavigateContext";
import Button from "../../ui/Button";
import User from "../user/User";
import UserWelcome from "../user/UserWelcome";
import { LuMenu } from "react-icons/lu";

export default function NavigateSmallScreen() {
  const { setNavShowOverLay, setShowSidebar, navigateTitle } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <div className="medium:hidden sticky top-0 z-40 block h-15">
      <header className="border-b border-stone-300 bg-white/30 p-4 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
        <div className="flex items-center gap-6">
          <Button
            variant="outline"
            classname={`cursor-pointer rounded-sm transition-colors text-2xl p-1 hover:bg-slate-200 dark:hover:bg-slate-700`}
            onClick={handleClick}
          >
            <LuMenu className="text-slate-900 dark:text-slate-300" />
          </Button>

          <div className="flex w-full items-center justify-between pr-4">
            {navigateTitle === "Dashboard" ? (
              <UserWelcome />
            ) : (
              <p>{navigateTitle}</p>
            )}
            <User classname={"w-10 h-10"} />
          </div>
        </div>
      </header>
    </div>
  );
}
