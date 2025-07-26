import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";

export default function CreateNoteLayoout() {
  return (
    <div>
      <header>
        <CreateNoteHeader />
        <CreateNoteSubHeader />
      </header>

      <CreateNote />
    </div>
  );
}
