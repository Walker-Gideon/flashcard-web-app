export default function CreateBtn() {
  return (
    <>
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
    </>
  );
}
