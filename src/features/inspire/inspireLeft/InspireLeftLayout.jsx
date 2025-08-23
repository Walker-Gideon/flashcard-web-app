import Achievement from "./Achievement";
import Motivation from "./Motivation";
import Progress from "./Progress";

export default function InspireLeftLayout() {
  return (
    <div className="mb-0 space-y-6 lg:col-span-2 lg:mb-19">
      <Motivation />
      <Achievement />
      <Progress />
    </div>
  );
}
