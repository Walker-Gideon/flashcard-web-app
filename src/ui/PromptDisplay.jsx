export default function PromptDisplay({ children, hight, textPrim, textSec }) {
  const styling = "text-sm font-medium text-slate-500 dark:text-slate-400";

  return (
    <div className={`flex flex-col items-center justify-center ${hight}`}>
      <div className="mb-1 rounded-full bg-stone-300 p-3 dark:bg-slate-700">
        {children}
      </div>

      <p
        className={`${textSec ? `text-lg font-semibold dark:text-slate-50` : `${styling}`}`}
      >
        {textPrim}
      </p>

      <p className={styling}>{textSec}</p>
    </div>
  );
}
