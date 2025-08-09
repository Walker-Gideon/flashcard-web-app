import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import DisplayCreated from "../../../ui/DisplayCreated";
import { useAuth } from "../../../context/AuthContext";

export default function DisplayNoteCreated() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);

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
  }, [user]);

  console.log(notes);

  return (
    <div className="scroll-container mb-4 h-screen overflow-y-scroll">
      <DisplayCreated />
    </div>
  );
}
