import Button from "../../../ui/Button";

export default function CreateBtn({ handleBackToEdit }) {
  const styling =
    "w-full text-start px-4 hover:bg-slate-600 transition-colors duration-300 py-2 transition-colors duration-500 hover:rounded-sm";

  return (
    <>
      <Button variant="outline" onClick={() => {}} classname={styling}>
        Save Flashcards
      </Button>

      <hr className="w-full border border-stone-300 dark:border-slate-700" />

      <Button variant="outline" onClick={handleBackToEdit} classname={styling}>
        Back to Edit
      </Button>

      <hr className="w-full border border-stone-300 dark:border-slate-700" />

      <Button
        variant="outline"
        //   onClick={handleBackToEdit}
        classname={styling}
      >
        Back to Flashcard
      </Button>
    </>
  );
}
