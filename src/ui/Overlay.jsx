import { useNav } from "../context/NavigateContext";

export default function Overlay({
  index,
  btn,
  model,
  children,
  onClick,
  notify,
  type,
  classname,
}) {
  const { setNavShowOverLay, setShowSidebar } = useNav();

  function handleClick() {
    setNavShowOverLay((show) => !show);
    setShowSidebar((show) => !show);
  }

  const base = "fixed inset-0 backdrop-blur-sm bg-gray-500/20";
  const styling = {
    btn: base + " cursor-pointer",
    model: base + " z-50 flex items-center justify-center p-4",
    notify: base + " z-50 ",
  };

  // this not need to be use
  if (btn)
    return (
      <div
        role="button"
        onClick={handleClick}
        className={`${styling.btn} ${index}`}
      />
    );

  if (notify)
    return (
      <div
        role="button"
        onClick={onClick}
        className={`${styling[type]} ${classname}`}
      >
        {children}
      </div>
    );

  if (model) return <div className={styling[type]}>{children}</div>;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm ${index}`}
    >
      {children}
    </div>
  );
}
