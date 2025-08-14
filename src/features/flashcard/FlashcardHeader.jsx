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
      className={`medium:pt-3 w-full ${classname} ${hasFlashcard ? `medium:flex medium:items-center medium:justify-between` : ``}`}
    >
      <HeaderText classname={"medium:mb-2 medium:block hidden"}>
        {text}
      </HeaderText>

      <div className="">
        {hasFlashcard && (
          <Button
            variant="primary"
            classname={"py-2 border-0 w-full"}
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
