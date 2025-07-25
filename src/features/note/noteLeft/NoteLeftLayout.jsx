import NoteLeftHeader from "./NoteLeftHeader";

export default function NoteLeftLayout() {
  return (
    <div className="medium:block medium:w-70 medium:border-r hidden border-r-0 border-stone-300 dark:border-slate-700">
      <NoteLeftHeader />
    </div>
  );
}
