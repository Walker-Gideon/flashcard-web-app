import Achievement from "./Achievement";
import Motivation from "./Motivation";
import Progress from "./Progress";

export default function InspireLeftLayout() {
  return (
    <div className="medium:mb-19 mb-0 space-y-6 lg:col-span-2">
      <Motivation />
      <Achievement />
      <Progress />
    </div>
  );
}
