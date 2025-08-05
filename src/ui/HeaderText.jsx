export default function HeaderText({ classname, children }) {
  return (
    <h1
      className={`text-xl font-bold text-slate-900 dark:text-white ${classname}`}
    >
      {children}
    </h1>
  );
}
