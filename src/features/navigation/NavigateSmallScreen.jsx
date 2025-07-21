import { useNav } from "../../context/NavigateContext";
import Button from "../../ui/Button";

export default function NavigateSmallScreen() {
  const { setNavShowOverLay, setShowSidebar } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  return (
    <header className="medium:hidden block border-b border-stone-300 px-4 py-5 shadow-sm">
      <Button
        variant="outline"
        className={`flex cursor-pointer flex-col gap-1.5 rounded text-2xl`}
        onClick={handleClick}
      >
        <div className={`h-[3px] w-6 rounded-lg bg-slate-950`}></div>
        <div className={`h-[2.5px] w-4 rounded-lg bg-slate-950`}></div>
      </Button>
    </header>
  );
}
