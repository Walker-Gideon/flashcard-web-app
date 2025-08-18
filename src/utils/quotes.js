import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const localQuotes = [
  {
    text: "Learning is a treasure that follows its owner everywhere.",
    author: "Chinese Proverb",
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: "Mahatma Gandhi",
  },
  {
    text: "The mind is not a vessel to be filled, but a fire to be kindled.",
    author: "Plutarch",
  },
];

const seedQuotes = async () => {
  for (const quote of localQuotes) {
    await addDoc(collection(db, "quotes"), {
      ...quote,
      createdAt: serverTimestamp(),
    });
  }
};

seedQuotes();
