import { useGen } from "../../../context/GeneralContext";

export default function TargetCardStatus({ dashboard }) {
  const { consistencyScore } = useGen();

  return (
    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-2 rounded-full bg-emerald-600 transition-all duration-500"
        style={{ width: `${dashboard ? 0 : `${consistencyScore}%`}` }}
      ></div>
    </div>
  );
}
