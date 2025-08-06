import HeaderText from "../../ui/HeaderText";

export default function FlashcardHeader({ text }) {
  return (
    <header className="medium:py-3 px-4 py-5">
      <HeaderText classname={"mb-2 medium:block hidden"}>{text}</HeaderText>
    </header>
  );
}
