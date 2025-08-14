import { useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useFlash } from "../../../context/FlashcardContext";

export default function UserCreatedFCLayout() {
  const { user } = useAuth();
  const { displayCreatedFlashcard, setDisplayCreatedFlashcard } = useFlash();

  // Display flashcard on mount
  useEffect(() => {
    if (!user?.uid) return; // wait for login

    const flashcardRef = collection(db, "users", user.uid, "flashcards");

    // Real-time listener
    const unsubscribe = onSnapshot(flashcardRef, (snapshot) => {
      const fetchedFlashcard = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDisplayCreatedFlashcard(fetchedFlashcard);
    });

    return () => unsubscribe(); // cleanup
  }, [user, setDisplayCreatedFlashcard]);

  console.log(displayCreatedFlashcard);

  return (
    <div>
      {displayCreatedFlashcard.map((flashcard) => (
        <div key={flashcard.id} className="">
          {/* {flashcard} */}
        </div>
      ))}
    </div>
  );
}
