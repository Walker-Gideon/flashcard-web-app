import NoteLeftLayout from "./noteLeft/NoteLeftLayout";
import NoteRightLayout from "./noteRight/NoteRightLayout";
import Notify from "../../ui/Notify";
import { useNote } from "../../context/NoteContext";

export default function NoteLayout() {
  const { noteNotify, setNoteNotify } = useNote();

  return (
    <div className="medium:grid medium:grid-cols-[17.5rem_auto] h-screen w-full overflow-hidden">
      <NoteLeftLayout />
      <NoteRightLayout />

      {/* Notification for delete */}
      <Notify
        classname={`max-w-2xs medium:max-w-xs px-4 py-3 flex`}
        btnClass={`dark:text-slate-900 dark:border-stone-500 border-slate-500`}
        animation={noteNotify}
        message="Are you sure you want to delete this note? This action cannot be undone."
        btnFirstText="Cancel"
        onClickFirst={() => setNoteNotify((show) => !show)}
        btnSecondText="Delete"
      />
    </div>
  );
}
