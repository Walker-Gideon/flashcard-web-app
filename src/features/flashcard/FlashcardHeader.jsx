import HeaderText from "../../ui/HeaderText";

export default function FlashcardHeader() {
  return (
    <div className="medium:py-3 px-4 py-5">
      <HeaderText classname={"mb-2 medium:block hidden"}>
        My Flashcards
      </HeaderText>
    </div>
  );
}
