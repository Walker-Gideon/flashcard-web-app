import { LuSendHorizontal } from "react-icons/lu";

export default function MessageInput({
  handleSubmit,
  inputMessage,
  setInputMessage,
  isTyping,
}) {
  return (
    <div className="absolute w-full bottom-0 left-0 bg-yellow-500">
    <form onSubmit={handleSubmit} className="mt-6 flex items-center space-x-2">
      <textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type your question here..."
        className="h-12 flex-1 resize-none overflow-hidden rounded-sm border border-stone-300 bg-slate-50 p-3 text-sm text-slate-900 focus:ring-2 focus:ring-slate-400 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:ring-slate-500"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        disabled={isTyping}
      />
      <button
        type="submit"
        className="rounded-sm bg-slate-500 p-3 text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-80"
        disabled={inputMessage.trim() === "" || isTyping}
      >
        <LuSendHorizontal className="h-6 w-6" />
      </button>
    </form>
    </div>
  );
}
