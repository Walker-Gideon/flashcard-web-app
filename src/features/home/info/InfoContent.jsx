import { BsCheck } from "react-icons/bs";

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
          <div className="mt-1 flex h-3 w-3 items-center justify-center rounded-full bg-stone-400">
            <BsCheck />
          </div>

          <div className="middle:text-[0.8rem] text-xs text-slate-800">
            <p className="middle:text-[0.9rem] text-sm text-slate-950">
              {data.header}
            </p>
            <p>{data.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
