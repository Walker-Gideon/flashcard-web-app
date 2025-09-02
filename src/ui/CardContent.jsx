export default function CardContent({
  children,
  classname,
  type,
  role,
  onClick,
}) {
  const styling = {
    default: `${classname ? `${classname}` : `flex items-center justify-between`}`,
    innerCard:
      "group flex items-center justify-between rounded-xl bg-slate-50 p-4 transition-all duration-200 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700",
  };
  return (
    <div
      role={role}
      className={`${classname ? `${styling.default}` : `${styling[type]}`}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
