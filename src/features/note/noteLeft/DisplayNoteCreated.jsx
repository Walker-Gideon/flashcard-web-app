import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import DisplayCreated from "../../../ui/DisplayCreated";
import { useAuth } from "../../../context/AuthContext";
import { useNote } from "../../../context/NoteContext";
import DisplayTiming from "../../../ui/DisplayTiming";

export default function DisplayNoteCreated() {
  const { user } = useAuth();
  const {
    notes,
    setNotes,
    setCurrentNote,
    setReadAlredyNote,
    setCreateNote,
    filteredNotes,
    setFilteredNotes,
    setQuery,
  } = useNote();
  const [selectedNoteId, setSelectedNoteId] = useState(null);

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
      setFilteredNotes(fetchedNotes);
    });

    return () => unsubscribe(); // cleanup
  }, [user, setNotes, setFilteredNotes]);

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
          noteName: noteData.noteName,
        });
        setReadAlredyNote(true);
        setCreateNote(true);
        setSelectedNoteId(noteId);
      }

      // Handle note click → clear search and show all notes again
      setQuery(""); // Clear input
      setFilteredNotes(notes); // Reset to full list
    } catch (error) {
      return error;
    }
  }

  return (
    <div className="scroll-container mb-4 h-screen overflow-y-scroll">
      {filteredNotes.map((note) => (
        <div key={note.id}>
          <DisplayCreated
            id={note.id}
            title={note.noteName}
            selectedNoteId={selectedNoteId}
            onClick={() => handleNoteClick(note.id)}
            timing={<DisplayTiming createdAt={note.createdAt} />}
          />
        </div>
      ))}
    </div>
  );
}
