import { LuCheck } from "react-icons/lu";
import CardBadge from "../../../ui/CardBadge";
import CardDiscription from "../../../ui/CardDiscription";

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
        <CardBadge classname="rounded-full p-3 bg-gradient-to-r from-slate-200 to-slate-300">
          {icon}
        </CardBadge>
        <p>{title}</p>
      </div>

      <CardDiscription
        classOverall="px-2 py-3"
        classnameFirst="text-xl font-bold md:text-2xl"
        textOne={subtitle}
      />

      <div className="px-2">
        {points.map((data, index) => (
          <ul
            key={index}
            className="flex gap-2 py-0.5 text-sm md:text-[0.9rem]"
          >
            <li>
              <CardBadge classname="rounded-full p-1 bg-gradient-to-r from-slate-200 to-slate-300">
                <LuCheck className="h-3 w-3 text-slate-600" />
              </CardBadge>
            </li>
            <li className="font-medium text-slate-500">{data}</li>
          </ul>
        ))}
      </div>
    </div>
  );
}
