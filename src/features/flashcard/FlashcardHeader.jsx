import Button from "../../ui/Button";
import HeaderText from "../../ui/HeaderText";

export default function FlashcardHeader({
  text,
  classname,
  hasFlashcard,
  handleCreateFlashcard,
}) {
  return (
    <header
      className={`medium:py-3 px-4 py-5 ${classname} ${hasFlashcard ? `flex w-full items-center justify-between` : ``}`}
    >
      <HeaderText classname={"mb-2 medium:block hidden"}>{text}</HeaderText>

      <div className="">
        {hasFlashcard && (
          <Button
            variant="primary"
            classname={"py-2 border-0"}
            color={
              "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300"
            }
            onClick={handleCreateFlashcard}
          >
            Create Flashcard
          </Button>
        )}
      </div>
    </header>
  );
}
