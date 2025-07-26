import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";

export default function CreateNoteLayoout() {
  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <header className="sticky top-0 z-40">
        <CreateNoteHeader />
        <CreateNoteSubHeader />
      </header>

      <CreateNote />
    </div>
  );
}
