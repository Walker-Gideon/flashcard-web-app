import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";

export default function CreateNoteLayoout() {
  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <CreateNoteHeader />

      <main className="medium:h-[90vh] scroll-container h-[74vh] overflow-y-scroll">
        <CreateNoteSubHeader />
        <CreateNote />
      </main>
    </div>
  );
}
