import { useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DisplayCreated from "../../../ui/DisplayCreated";
import { useAuth } from "../../../context/AuthContext";
import { useNote } from "../../../context/NoteContext";
import DisplayTiming from "../../../ui/DisplayTiming";

export default function DisplayNoteCreated() {
  const { user } = useAuth();
  const { notes, setNotes, setCurrentNote, setReadAlredyNote, setCreateNote } =
    useNote();

  // Display note on mount
  useEffect(() => {
    if (!user?.uid) return; // wait for login

    const notesRef = collection(db, "users", user.uid, "notes");

    // Real-time listener
    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(fetchedNotes);
    });

    return () => unsubscribe(); // cleanup
  }, [user, setNotes]);

  // Function to fetch the note
  async function handleNoteClick(noteId) {
    try {
      const noteRef = doc(db, "users", user.uid, "notes", noteId);
      const noteSnap = await getDoc(noteRef);

      if (noteSnap.exists()) {
        const noteData = noteSnap.data();
        setCurrentNote({
          id: noteId,
          title: noteData.title,
          content: noteData.content,
        });
        setReadAlredyNote(true);
        setCreateNote(true);
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="scroll-container mb-4 h-screen overflow-y-scroll">
      {notes.map((note) => (
        <div key={note.id}>
          <DisplayCreated
            id={note.id}
            title={note.noteName}
            onClick={() => handleNoteClick(note.id)}
            timing={<DisplayTiming createdAt={note.createdAt} />}
          />
        </div>
      ))}
    </div>
  );
}
