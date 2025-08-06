import HeaderText from "../../ui/HeaderText";

export default function FlashcardHeader({ text, classname }) {
  return (
    <header className={`medium:py-3 px-4 py-5 ${classname}`}>
      <HeaderText classname={"mb-2 medium:block hidden"}>{text}</HeaderText>
    </header>
  );
}
