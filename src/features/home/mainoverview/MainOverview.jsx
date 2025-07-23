import { BsArrowRepeat } from "react-icons/bs";
import { BsGraphUpArrow } from "react-icons/bs";
import { BsChatLeft } from "react-icons/bs";
import { BsChatRightText } from "react-icons/bs";

const overViewData = [
  {
    icon: <BsArrowRepeat />,
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
    icon: <BsGraphUpArrow />,
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
    icon: <BsChatLeft />,
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
    icon: <BsChatRightText />,
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
  return <div>MainOverview</div>;
}
