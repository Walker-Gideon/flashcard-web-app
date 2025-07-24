export default function UserWelcome() {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Welcome back, X!
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {/* If the user first sign up we say : */}
        Ready to continue your learning journey?
      </p>
    </div>
  );
}
