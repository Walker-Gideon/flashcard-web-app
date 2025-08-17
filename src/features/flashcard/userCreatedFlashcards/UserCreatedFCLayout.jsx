import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useAuth } from "../../../context/AuthContext";
import { useFlash } from "../../../context/FlashcardContext";
import UserDisplayFC from "./UserDisplayFC";
import DisplayTiming from "../../../ui/DisplayTiming";
import Loader from "../../../ui/Loader";

export default function UserCreatedFCLayout() {
  const { user } = useAuth();
  const {
    displayCreatedFlashcard,
    filteredFlashcard,
    setDisplayCreatedFlashcard,
    setQueryFlashcard,
    setFilteredFlashcard,
    setCurrentFlashcard,
    setShowCreateFlashcard,
    setShowPreview,
    setReadAlredyFlashcard,
    SetEditFlashcardData,
  } = useFlash();
  const [loadingFC, setLoadingFC] = useState(false);

  // Display flashcard on mount
  useEffect(() => {
    if (!user?.uid) return;

    const flashcardRef = collection(db, "users", user.uid, "flashcards");

    const unsubscribe = onSnapshot(flashcardRef, (snapshot) => {
      const fetchedFlashcard = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDisplayCreatedFlashcard(fetchedFlashcard);
      setFilteredFlashcard(fetchedFlashcard);
    });

    return () => unsubscribe();
  }, [user, setDisplayCreatedFlashcard, setFilteredFlashcard]);

  // Function to fetch the flashcards
  async function handleFlashcardsClick(flashcardId) {
    setLoadingFC(true);

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

        // Display the flashcard on click
        setShowPreview(true);
        setShowCreateFlashcard(true);
        setReadAlredyFlashcard(true);

        // Set the id for the case a user want to edit
        SetEditFlashcardData({ id: flashcardId, ...flashcardData });
      }

      setQueryFlashcard("");
      setFilteredFlashcard(displayCreatedFlashcard);
    } catch (error) {
      return error;
    } finally {
      setLoadingFC(false);
    }
  }

  return (
    <>
      <div className="scroll-container h-screen overflow-y-scroll">
        <div className="medium:mb-44 mb-54 px-8 lg:mx-auto lg:max-w-5xl">
          {filteredFlashcard.map((flashcard) => (
            <div key={flashcard.id} className="">
              <UserDisplayFC
                id={flashcard.id}
                title={flashcard.tags}
                totalCards={flashcard.pairs.length}
                onClick={() => handleFlashcardsClick(flashcard.id)}
                timing={<DisplayTiming createdAt={flashcard.createdAt} />}
              />
            </div>
          ))}
        </div>
      </div>

      {loadingFC && <Loader loadingSpin={true} />}
    </>
  );
}
