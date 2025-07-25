import { useNav } from "../context/NavigateContext";

export default function Overlay({ index, btn, model, children }) {
  const { setNavShowOverLay, setShowSidebar } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  if (btn)
    return (
      <div
        role="button"
        onClick={handleClick}
        className={`fixed inset-0 cursor-pointer bg-gray-500/20 backdrop-blur-sm ${index}`}
      />
    );

  if (model)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        {children}
      </div>
    );

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm ${index}`}
    >
      {children}
    </div>
  );
}
