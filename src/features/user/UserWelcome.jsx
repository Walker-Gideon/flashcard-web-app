import HeaderText from "../../ui/HeaderText";

export default function UserWelcome() {
  return (
    <div>
      <HeaderText>Welcome back, X!</HeaderText>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        {/* If the user first sign up we say : */}
        Ready to continue your learning journey?
      </p>
    </div>
  );
}
