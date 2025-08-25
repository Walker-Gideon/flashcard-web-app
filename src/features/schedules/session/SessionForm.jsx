export default function SessionForm({ isSubmitting }) {
  return (
    <form onSubmit={() => {}} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Select Tag
        </label>
        <select
          // w-full rounded-lg border border-stone-300 bg-white p-2 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-white
          className="input w-full dark:bg-slate-700 dark:text-white"
          disabled={isSubmitting}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="mixed">Mixed</option>
        </select>
      </div>
    </form>
  );
}
