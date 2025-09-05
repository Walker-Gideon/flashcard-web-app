import { useNav } from "../../../context/NavigateContext";
import Button from "../../../ui/Button";
import Logo from "../../../ui/Logo";
import { LuX } from "react-icons/lu";

export default function LargeHeader() {
  const { setShowSidebar, setNavShowOverLay } = useNav();
  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <header
      className={`transitioningColors border-b border-stone-300 px-2 py-2 dark:border-slate-700`}
    >
      <div className="transitioningColors medium:mt-0 medium:h-auto mt-0.5 flex h-13 flex-col gap-4 rounded-sm bg-slate-50 p-2 dark:bg-slate-700">
        <div className={`flex items-center medium:justify-center justify-between`}>
          <Logo logo={true} classname="z-50" />

          <Button
            variant="outline"
            onClick={handleClick}
            classname="medium:hidden block cursor-pointer text-xl text-slate-900 dark:text-white"
          >
            <LuX />
          </Button>
        </div>
      </div>
    </header>
  );
}
