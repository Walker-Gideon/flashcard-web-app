import { LuCopyright } from "react-icons/lu";

export default function FooterRight() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="medium:w-full w-full border-t border-stone-300">
      <p className="medium:text-sm medium:justify-end mt-2 flex items-center justify-center gap-1 text-xs font-medium">
        <span>
          <LuCopyright />
        </span>{" "}
        {year} <span className="font-bold">WalkWise</span>. All rights reserved.
      </p>
    </div>
  );
}
