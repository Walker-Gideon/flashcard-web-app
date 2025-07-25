import NoteLeftLayout from "./noteLeft/NoteLeftLayout";
import NoteRightLayout from "./noteRight/NoteRightLayout";

export default function NoteLayout() {
  return (
    <div className="min-h-screen">
      <NoteLeftLayout />
      <NoteRightLayout />
    </div>
  );
}
