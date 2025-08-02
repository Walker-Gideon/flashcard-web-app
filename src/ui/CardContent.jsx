export default function CardContent({ children, classname, type }) {
  const styling = {
    default: `${classname ? `${classname}` : `flex items-center justify-between`}`,
    innerCard:
      "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700",
  };
  return (
    <div className={`${classname ? `${styling.default}` : `${styling[type]}`}`}>
      {children}
    </div>
  );
}
