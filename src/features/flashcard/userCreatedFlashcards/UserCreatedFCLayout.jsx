import { useEffect } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useFlash } from "../../../context/FlashcardContext";
import UserDisplayFC from "./UserDisplayFC";
import DisplayTiming from "../../../ui/DisplayTiming";

export default function UserCreatedFCLayout() {
  const { user } = useAuth();
  const {
    displayCreatedFlashcard,
    setDisplayCreatedFlashcard,
    filteredFlashcard,
    setQueryFlashcard,
    setFilteredFlashcard,
    setCurrentFlashcard,
    currentFlashcard,
    setShowCreateFlashcard,
    setShowPreview,
  } = useFlash();

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
      setFilteredFlashcard(fetchedFlashcard);
    });

    return () => unsubscribe(); // cleanup
  }, [user, setDisplayCreatedFlashcard, setFilteredFlashcard]);

  // Function to fetch the flashcards
  async function handleFlashcardsClick(flashcardId) {
    try {
      const flashcardsRef = doc(
        db,
        "users",
        user.uid,
        "flashcards",
        flashcardId,
      );
      const flashcardSnap = await getDoc(flashcardsRef);

      if (flashcardSnap.exists()) {
        const flashcardData = flashcardSnap.data();
        setCurrentFlashcard({ id: flashcardId, ...flashcardData });

        setShowCreateFlashcard(null);
        setShowPreview(true);
        // setSelectedNoteId(flashcardId);
      }

      // Handle note click → clear search and show all notes again
      setQueryFlashcard(""); // Clear input
      setFilteredFlashcard(displayCreatedFlashcard); // Reset to full list
    } catch (error) {
      return error;
    }
  }

  /*
  const flashcardData = {
        tags: tags.trim() === "" ? "Untitled Deck" : tags.trim(),
        pairs: filteredPairs,
        createdAt: serverTimestamp(),
      };
*/
  console.log("Here is the flashcard click data ", currentFlashcard);

  return (
    <div className="scroll-container h-screen overflow-y-scroll">
      <div className="medium:mb-44 mb-54 px-8 lg:mx-auto lg:max-w-5xl">
        {filteredFlashcard.map((flashcard) => (
          <div key={flashcard.id} className="">
            <UserDisplayFC
              title={flashcard.tags}
              totalCards={flashcard.pairs.length + 1}
              onClick={() => handleFlashcardsClick(flashcard.id)}
              timing={<DisplayTiming createdAt={flashcard.createdAt} />}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
