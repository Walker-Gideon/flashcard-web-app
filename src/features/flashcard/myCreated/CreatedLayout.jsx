import { useFlash } from "../../../context/FlashcardContext";
import ReviewSummary from "../ReviewSummary";
import CreatedContentFC from "./CreatedContentFC";
import CreatedHeader from "./CreatedHeader";

export default function CreatedLayout() {
  const { reviewComplete } = useFlash();

  return (
    <div className="medium:p-8 flex h-screen flex-col items-center px-5 lg:mx-auto lg:max-w-5xl">
      <CreatedHeader />

      <>{reviewComplete ? <ReviewSummary /> : <CreatedContentFC />}</>
    </div>
  );
}
