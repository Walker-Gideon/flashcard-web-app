import { LuEllipsisVertical } from "react-icons/lu";
import Button from "./Button";

export default function DisplayCreated({ title, timing }) {
  return (
    <div
      role="button"
      className="my-1 flex w-full cursor-pointer items-center justify-between border-b border-stone-300 px-4 py-2 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700"
    >
      <div className="">
        <h1 className="medium:text-sm mb-1 text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="medium:text-xs text-sm text-slate-500 dark:text-slate-400">
          <span>X</span> <span>days ago</span>
        </p>
      </div>

      <Button variant="outline" onClick={() => {}}>
        <LuEllipsisVertical />
      </Button>
    </div>
  );
}
