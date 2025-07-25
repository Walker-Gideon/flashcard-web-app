import NoteLeftLayout from "./noteLeft/NoteLeftLayout";
import NoteRightLayout from "./noteRight/NoteRightLayout";

export default function NoteLayout() {
  return (
    <div className="medium:grid medium:grid-cols-[17.5rem_auto] min-h-screen w-full">
      <NoteLeftLayout />
      <NoteRightLayout />
    </div>
  );
}
