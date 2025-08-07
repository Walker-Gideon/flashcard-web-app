import Button from "../../../ui/Button";
import HeaderText from "../../../ui/HeaderText";

export default function CreatedHeader({ handleBackToEdit, tags }) {
  return (
    <header className="mb-6 flex items-center justify-between">
      <HeaderText>{tags ? tags : "Untitled Flashcard"}</HeaderText>

      <div className="space-x-2">
        <Button
          variant="outline"
          //   onClick={handleBackToEdit}
          classname="primaryButton"
        >
          Back to Flashcard
        </Button>

        <Button
          variant="outline"
          onClick={handleBackToEdit}
          classname="primaryButton"
        >
          Back to Edit
        </Button>
      </div>
    </header>
  );
}
