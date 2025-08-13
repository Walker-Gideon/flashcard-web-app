export default function CardOverview({ children, showShadow, classname }) {
  return (
    <div
      className={`rounded-2xl border border-stone-300 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 ${showShadow ? `hover:shadow-lg` : ``} ${classname}`}
    >
      {children}
    </div>
  );
}
