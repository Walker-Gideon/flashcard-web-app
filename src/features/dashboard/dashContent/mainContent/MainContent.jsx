import { mockData } from "../../../../data/mockData";
import MiniCalendar from "./MiniCalendar";
import CardsView from "./CardsView";
import CardOverview from "../../../../ui/CardOverview";
import WeakAreas from "./WeakAreas";
import Motivation from "./Motivation";

export default function MainContent({
  setShowReviewModal,
  setSelectedFlashcard,
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardsView
          mockData={mockData}
          setShowReviewModal={setShowReviewModal}
          setSelectedFlashcard={setSelectedFlashcard}
        />

        <div className="space-y-6">
          <MiniCalendar studyDates={mockData.studyDates} />
          <WeakAreas mockData={mockData} />
          <Motivation />
        </div>
      </div>
    </>
  );
}
