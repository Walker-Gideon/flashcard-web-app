import NavigateLScreen from "./large/NavigateLScreen";
import NavigateSmallScreen from "./NavigateSmallScreen";

export default function NavigationLayout() {
  return (
    <div className="h-13">
      <NavigateSmallScreen />
      <NavigateLScreen />
    </div>
  );
}
