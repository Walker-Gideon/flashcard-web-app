import { LuCheck } from "react-icons/lu";

export default function MainContentText({
  index,
  icon,
  title,
  subtitle,
  points,
}) {
  return (
    <div
      className={`${index === 1 ? `md:order-2` : ``} ${index === 3 ? `md:order-2` : ``}`}
    >
      <div className="flex items-center space-x-4 text-sm font-semibold">
        <p
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 font-bold text-slate-200 md:h-10 md:w-10 ${index === 0 ? `p-2 text-2xl md:text-base` : `p-2.5 text-xl md:text-base`}`}
        >
          {icon}
        </p>
        <p>{title}</p>
      </div>

      <div className="px-2 py-3 text-xl font-bold md:text-2xl">
        <p>{subtitle}</p>
      </div>

      <div className="px-2">
        {points.map((data, index) => (
          <ul
            key={index}
            className="flex gap-2 py-0.5 text-sm md:text-[0.9rem]"
          >
            <li>
              <LuCheck className="mt-1 h-3 w-3 rounded-full bg-stone-300" />
            </li>
            <li>{data}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
