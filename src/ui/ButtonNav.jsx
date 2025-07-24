import { useNav } from "../context/NavigateContext";

export default function ButtonNav({ children, text, navLarge }) {
  const { resize } = useNav();

  if (navLarge)
    return (
      <div className={`group relative inline-flex ${resize ? `` : ``}`}>
        {children}
        <div
          className={`pointer-events-none absolute top-1/2 left-8 z-10 ml-2 hidden -translate-y-1/2 transform rounded-full bg-slate-950 px-2 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-slate-700/50 ${resize ? `hidden` : `medium:block`}`}
        >
          {text}
        </div>
      </div>
    );

  return <div></div>;
}
