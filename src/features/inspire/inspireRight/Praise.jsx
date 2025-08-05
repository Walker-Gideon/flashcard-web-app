import { LuAward } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";

export default function Praise({ currentPraise }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 p-6 shadow-lg dark:from-slate-600 dark:to-slate-700">
      <div className="mb-4 flex items-center space-x-3">
        <LuAward className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Your Encouragement</HeaderText>
      </div>
      <p className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
        "{currentPraise}"
      </p>
      <p className="text-right text-sm text-slate-900 dark:text-white">
        - FlashMaster AI
      </p>
    </div>
  );
}
