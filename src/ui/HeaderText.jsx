export default function HeaderText({ classname, children }) {
  return (
    <div
      className={`text-xl font-bold text-slate-900 dark:text-white ${classname}`}
    >
      {children}
    </div>
  );
}
