export default function ButtonNav({ children, text, navLarge }) {
  if (navLarge)
    return (
      <div className="group medium:items-center medium:justify-center relative inline-flex">
        {children}
        <div
          // ${mode ? `bg-slate-900 text-slate-200` : `bg-slate-200 text-black`}
          className={`medium:block pointer-events-none absolute top-1/2 left-8 z-10 ml-2 hidden -translate-y-1/2 transform rounded-full bg-slate-950 px-2 py-1 text-xs font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100`}
        >
          {text}
        </div>
      </div>
    );

  return <div></div>;
}
