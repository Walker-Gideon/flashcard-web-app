import { useNote } from "../../../context/NoteContext";
import NoteDisplay from "./NoteDisplay";
import NoteLeftHeader from "./NoteLeftHeader";

export default function NoteLeftLayout() {
  const { createNote } = useNote();

  return (
    // medium:block hidden
    <div
      className={`medium:w-70 medium:mt-0 medium:border-r mt-5 transform border-r-0 border-stone-300 transition-transform duration-500 ease-in-out dark:border-slate-700 ${createNote ? `medium:block hidden` : ``}`}
    >
      <NoteLeftHeader />
      <NoteDisplay />
    </div>
  );
}
