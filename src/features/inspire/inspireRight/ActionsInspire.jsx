import { LuBookOpen } from "react-icons/lu";
import { LuChartColumnIncreasing } from "react-icons/lu";
import CardOverview from "../../../ui/CardOverview";
import HeaderText from "../../../ui/HeaderText";
import Button from "../../../ui/Button";

export default function ActionsInspire() {
  const styling = {
    button: "primaryButton flex w-full medium:text-base items-center space-x-3",
    icon: "h-5 w-5",
  };

  return (
    <CardOverview classname="mb-19">
      <HeaderText classname="mb-4">Quick Actions</HeaderText>
      <div className="space-y-3">
        <Button variant="outline" classname={styling.button}>
          <LuBookOpen className={styling.icon} />
          <span>Review Cards</span>
        </Button>
        <Button variant="outline" classname={styling.button}>
          <LuChartColumnIncreasing className={styling.icon} />
          <span>View Detailed Analytics</span>
        </Button>
      </div>
    </CardOverview>
  );
}
