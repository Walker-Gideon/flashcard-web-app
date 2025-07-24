import { LuRepeat } from "react-icons/lu";
import { LuChartLine } from "react-icons/lu";
import { LuMessageSquare } from "react-icons/lu";
import { LuMessageSquareText } from "react-icons/lu";
import MainContent from "./MainContent";

const overViewData = [
  {
    icon: <LuRepeat />,
    title: "Review with Spaced-Repetition Flashcards",
    subtitle: "Strengthen memory through proven recall techniques.",
    points: [
      "Practice smarter, not harder — revisit only what needs reinforcement.",
      "Boost long-term memory retention with spaced intervals.",
      "Save time with focused, personalized card reviews.",
    ],
    image: "",
  },
  {
    icon: <LuChartLine />,
    title: " Track Your Consistency & Daily Progress",
    subtitle: "Stay motivated and organized with visual progress insights.",
    points: [
      "Visual dashboards show your learning streak and improvement.",
      "Daily reminders help maintain a study routine.",
      "Progress tracking builds a sense of achievement and momentum.",
    ],
    image: "",
  },
  {
    icon: <LuMessageSquare />,
    title: "Get Motivation, Tips, and Reminders",
    subtitle: "Keep going with study hacks, encouragement, and nudges.",
    points: [
      "Receive bite-sized motivational quotes during your study breaks.",
      "Smart tips are tailored to your learning behavior.",
      "Gentle reminders keep you on track without pressure.",
    ],
    image: "",
  },
  {
    icon: <LuMessageSquareText />,
    title: " AI Support When You’re Stuck",
    subtitle:
      "Get help instantly with answers and explanations tailored to you.",
    points: [
      "Ask questions and get simplified, context-aware responses.",
      "Clarify complex topics on demand.",
      "Get study suggestions based on your weak spots.",
    ],
    image: "",
  },
];

export default function MainOverview() {
  return (
    <div id="features" className="mx-3 md:mx-6 lg:mx-20">
      {overViewData.map((data, index) => (
        <div
          key={index}
          className={`mb-20 ${index === 0 ? `w-full rounded-4xl bg-stone-200/30` : ``} ${index === 2 ? `w-full rounded-4xl bg-stone-200/30` : ``}`}
        >
          <MainContent
            index={index}
            icon={data.icon}
            title={data.title}
            subtitle={data.subtitle}
            points={data.points}
            image={data.image}
          />
        </div>
      ))}
    </div>
  );
}
