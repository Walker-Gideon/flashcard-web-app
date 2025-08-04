import Achievement from "./Achievement";
import Motivation from "./Motivation";
import Progress from "./Progress";

export default function InspireLeftLayout({ currentQuote }) {
  return (
    <div className="space-y-6 lg:col-span-2">
      <Motivation currentQuote={currentQuote} />
      <Achievement />
      <Progress />
    </div>
  );
}
