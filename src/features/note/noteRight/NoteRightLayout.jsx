import { useNote } from "../../../context/NoteContext";
import CreateNoteLayoout from "./createNote/CreateNoteLayoout";
import NoteMainPrompt from "./NoteMainPrompt";

export default function NoteRightLayout() {
  const { createNote } = useNote();

  return (
    <div>
      {!createNote ? (
        <div className="medium:block hidden">
          <NoteMainPrompt />
        </div>
      ) : (
        <CreateNoteLayoout />
      )}
    </div>
  );
}
