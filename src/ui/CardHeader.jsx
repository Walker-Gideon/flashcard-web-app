export default function CardHeader({ type, title, children }) {
  const styling = {};

  return (
    <header
      className={`mb-4 flex items-center justify-between ${styling[type]}`}
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>

      <>{children}</>
    </header>
  );
}
