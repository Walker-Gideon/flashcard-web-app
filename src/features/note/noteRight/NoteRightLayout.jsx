import CreateNoteLayoout from "./createNote/CreateNoteLayoout";
import NoteMainPrompt from "./NoteMainPrompt";

export default function NoteRightLayout() {
  return (
    <div>
      <NoteMainPrompt />
      <CreateNoteLayoout />
    </div>
  );
}
