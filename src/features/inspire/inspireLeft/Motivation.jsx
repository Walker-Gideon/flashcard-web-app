import { LuMoon } from "react-icons/lu";

export default function Motivation({ currentQuote }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-lg">
      <div className="mb-4 flex items-center space-x-3">
        {/* Lightbulb */}
        <LuMoon className="h-6 w-6 text-emerald-200" />
        <h3 className="text-xl font-semibold">Daily Inspiration</h3>
      </div>
      <blockquote className="mb-4 text-lg text-emerald-50 italic">
        "{currentQuote.text}"
      </blockquote>
      <p className="text-right text-sm text-emerald-100">
        - {currentQuote.author}
      </p>
    </div>
  );
}
