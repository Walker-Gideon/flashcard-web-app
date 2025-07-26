import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";

export default function CreateNoteLayoout() {
  return (
    //  medium:overflow-hidden h-screen h-screen overflow-scroll overflow-y-scroll
    <div className="medium:mt-0 scroll-container medium:overflow-hidden mt-7 h-screen overflow-scroll bg-red-200">
      <CreateNoteHeader />

      <main className="h-screen">
        <CreateNoteSubHeader />
        <CreateNote />
      </main>
    </div>
  );
}
