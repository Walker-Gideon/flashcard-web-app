export default function CardOverview({ children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/70">
      {children}
    </div>
  );
}
