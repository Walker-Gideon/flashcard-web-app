import MiniCalendar from "./MiniCalendar";
import CardsView from "./CardsView";
import Motivation from "./Motivation";

export default function MainContent() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <CardsView />

        <div className="space-y-6">
          <MiniCalendar />
          <Motivation />
        </div>
      </div>
    </>
  );
}
