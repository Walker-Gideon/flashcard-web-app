import { LuBookOpen, LuChartColumnIncreasing } from "react-icons/lu";
import { useNav } from "../../../context/NavigateContext";
import CardOverview from "../../../ui/CardOverview";
import HeaderText from "../../../ui/HeaderText";
import Button from "../../../ui/Button";
import useLoaderAction from "../../../utils/LoaderAction";
import UserWelcome from "../../user/UserWelcome";

const actionsData = [
  {
    icon: LuBookOpen,
    text: "Review Cards",
    to: "/dashboard/flashcards",
    title: "My Flashcards",
  },
  {
    icon: LuChartColumnIncreasing,
    text: "View Detailed Analytics",
    to: "/dashboard",
    title: <UserWelcome userDisplay={true} trubWidth="w-20" />,
  },
];

export default function ActionsInspire() {
  const { setNavigateTitle, setNavShowOverLay, setShowSidebar } = useNav();
  const navigate = useLoaderAction(1000);

  const styling = {
    button: "primaryButton flex w-full medium:text-base items-center space-x-3",
    icon: "h-5 w-5",
  };

  return (
    <CardOverview classname="mb-19">
      <HeaderText classname="mb-4">Quick Actions</HeaderText>

      {actionsData.map((data, index) => (
        <div key={index} className={`space-y-3 ${index === 0 ? "mb-2" : ""}`}>
          <Button
            variant="outline"
            classname={styling.button}
            onClick={() => {
              navigate(data.to);

              setTimeout(() => {
                setNavShowOverLay(false);
                setShowSidebar(false);
                setNavigateTitle(data.title);
              }, 1000)
            }}
          >
            <data.icon className={styling.icon} />
            <span>{data.text}</span>
          </Button>
        </div>
      ))}
    </CardOverview>
  );
}
