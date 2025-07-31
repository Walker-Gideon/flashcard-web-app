import { LuCheck } from "react-icons/lu";
import CardBadge from "../../../ui/CardBadge";

const info = [
  {
    header: "Built for Long-Term Memory",
    text: "Uses proven techniques like active recall and spaced repetition to make information stick.",
  },
  {
    header: "Supports Consistency, Not Pressure",
    text: "Encourages small daily habits that build strong study routines — no burnout.",
  },
  {
    header: "Personal Help, Always On",
    text: "From AI support to motivational content, you’re never studying alone.",
  },
];

export default function InfoContent() {
  return (
    <div className="text-left">
      {info.map((data, index) => (
        <div key={index} className="mb-2 flex gap-2">
          <ul className="flex gap-2 py-0.5 text-sm md:text-[0.9rem]">
            <li>
              <CardBadge classname="rounded-full p-1 bg-gradient-to-r from-slate-200 to-slate-300">
                <LuCheck className="h-3 w-3 text-slate-600" />
              </CardBadge>
            </li>
            <li>
              <div className="middle:text-[0.8rem] text-xs text-slate-800">
                <p className="middle:text-[0.9rem] text-sm font-medium text-slate-900">
                  {data.header}
                </p>
                <p className="text-slate-500">{data.text}</p>
              </div>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
