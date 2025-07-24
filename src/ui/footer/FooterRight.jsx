import { LuCopyright } from "react-icons/lu";

export default function FooterRight() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full">
      <p className="medium:justify-end mt-2 flex gap-1 text-xs font-medium text-stone-500">
        <span>
          <LuCopyright />
        </span>
        {year} <span className="font-bold">WalkWise</span>. All rights reserved.
      </p>
    </div>
  );
}
