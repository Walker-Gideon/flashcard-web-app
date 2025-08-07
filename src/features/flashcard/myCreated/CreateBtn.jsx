import Button from "../../../ui/Button";

export default function CreateBtn({ handleBackToEdit, classname }) {
  const styling = {
    smalleOverView:
      "absolute top-12 right-0 flex w-50 flex-col items-start gap-2 rounded-2xl border border-stone-300 bg-white/70 p-2 text-[0.8rem] text-slate-900 backdrop-blur-xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-800/70 dark:text-white",
    buttonSmall:
      "w-full text-start px-4 hover:bg-slate-600 transition-colors duration-300 py-2 transition-colors duration-500 hover:rounded-sm",
    buttonMedium: "medium:bg-slate-500 medium:rounded-sm",
  };

  return (
    <div className={`${classname}`}>
      <Button
        variant="outline"
        //   onClick={handleBackToEdit}
        classname={`${styling.buttonSmall} ${styling.buttonMedium}`}
      >
        Back to Flashcard
      </Button>

      <hr className="medium:hidden w-full border border-stone-300 dark:border-slate-700" />

      <Button
        variant="outline"
        onClick={handleBackToEdit}
        classname={`${styling.buttonSmall} ${styling.buttonMedium}`}
      >
        Back to Edit
      </Button>
    </div>
  );
}
