import { useNav } from "../../context/NavigateContext";
import Button from "../../ui/Button";

export default function NavigateSmallScreen() {
  const { setNavShowOverLay, setShowSidebar } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <header className="medium:hidden sticky top-0 z-40 block border-b border-stone-300 bg-white/30 px-4 py-5 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80">
      <Button
        variant="outline"
        classname={`flex cursor-pointer flex-col gap-1.5 rounded text-2xl`}
        onClick={handleClick}
      >
        <div className={`h-[3px] w-6 rounded-lg bg-slate-950`}></div>
        <div className={`h-[2.5px] w-4 rounded-lg bg-slate-950`}></div>
      </Button>
    </header>
  );
}
