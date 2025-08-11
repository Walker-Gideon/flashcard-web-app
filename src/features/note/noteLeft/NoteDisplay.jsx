import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { LuNotebookText } from "react-icons/lu";
import PromptDisplay from "../../../ui/PromptDisplay";
import DisplayNoteCreated from "./DisplayNoteCreated";

export default function NoteDisplay() {
  const { user } = useAuth();
  const [hasNotes, setHasNotes] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const notesRef = collection(db, "users", user.uid, "notes");

    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      setHasNotes(snapshot.size > 0);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <main className="h-full">
      {hasNotes ? (
        <DisplayNoteCreated />
      ) : (
        <PromptDisplay
          hight={"h-[70vh]"}
          textPrim="No notes found"
          icon={
            <LuNotebookText className="h-5 w-5 text-slate-600 dark:text-slate-300" />
          }
        ></PromptDisplay>
      )}
    </main>
  );
}
