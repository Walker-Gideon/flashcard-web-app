import React from "react";

export default function ChatHeader() {
  return (
    <header className="mb-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
        AI Chat Assistant
      </h1>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Ask me anything about your studies!
      </p>
    </header>
  );
}
