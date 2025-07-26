export default function PromptDisplay({ children, hight, textPrim }) {
  return (
    <div className={`flex flex-col items-center justify-center ${hight}`}>
      <div className="rounded-full bg-stone-300 p-3 dark:bg-slate-700">
        {children}
      </div>

      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {textPrim}
      </p>

      <p className="medium:text-sm text-xs text-stone-500"></p>
    </div>
  );
}
