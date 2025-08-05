import { LuAward } from "react-icons/lu";

export default function Praise({ currentPraise }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center space-x-3">
        <LuAward className="h-6 w-6 text-blue-200" />
        <h3 className="text-xl font-semibold">Your Encouragement</h3>
      </div>
      <p className="mb-4 text-lg text-blue-50 italic">"{currentPraise}"</p>
      <p className="text-right text-sm text-blue-100">- FlashMaster AI</p>
    </div>
  );
}
