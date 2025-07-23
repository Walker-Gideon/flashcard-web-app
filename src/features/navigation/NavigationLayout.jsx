import NavigateLScreen from "./NavigateLScreen";
import NavigateSmallScreen from "./NavigateSmallScreen";

export default function NavigationLayout() {
  return (
    <div className="bg-red-400">
      <NavigateSmallScreen />
      <NavigateLScreen />
    </div>
  );
}
