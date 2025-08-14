import { useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useFlash } from "../../../context/FlashcardContext";
import UserDisplayFC from "./UserDisplayFC";
import DisplayTiming from "../../../ui/DisplayTiming";

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

  /*
  const flashcardData = {
        tags: tags.trim() === "" ? "Untitled Deck" : tags.trim(),
        pairs: filteredPairs,
        createdAt: serverTimestamp(),
      };
*/
  return (
    <div className="">
      <div className="scroll-container h-screen overflow-y-scroll">
        <div className="medium:mb-25 mb-38 px-8 lg:mx-auto lg:max-w-5xl">
          {displayCreatedFlashcard.map((flashcard) => (
            <div key={flashcard.id} className="">
              <UserDisplayFC
                title={flashcard.tags}
                totalCards={flashcard.pairs.length + 1}
                timing={<DisplayTiming createdAt={flashcard.createdAt} />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
