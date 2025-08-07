export default function CreatedHeader({ handleBackToEdit }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
        Your Flashcard Preview
      </h2>
      <button
        onClick={handleBackToEdit}
        className="rounded-lg bg-slate-200 px-4 py-2 text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
      >
        Back to Edit
      </button>
    </header>
  );
}
