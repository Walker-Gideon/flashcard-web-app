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
  {
    text: "An investment in knowledge pays the best interest.",
    author: "Benjamin Franklin",
  },
  {
    text: "The roots of education are bitter, but the fruit is sweet.",
    author: "Aristotle",
  },
  {
    text: "The more that you read, the more things you will know. The more that you learn, the more places you’ll go.",
    author: "Dr. Seuss",
  },
  {
    text: "Education is not preparation for life; education is life itself.",
    author: "John Dewey",
  },
  {
    text: "It is not that I'm so smart. But I stay with the questions much longer.",
    author: "Albert Einstein",
  },
  {
    text: "The only person who is educated is the one who has learned how to learn and change.",
    author: "Carl Rogers",
  },
  {
    text: "Develop a passion for learning. If you do, you will never cease to grow.",
    author: "Anthony J. D'Angelo",
  },
  {
    text: "Education opens the door to freedom and opportunity.",
    author: "Oprah Winfrey",
  },
  {
    text: "Change is the end result of all true learning.",
    author: "Leo Buscaglia",
  },
  {
    text: "Education’s purpose is to replace an empty mind with an open one.",
    author: "Malcolm Forbes",
  },
];

export const seedQuotes = async () => {
  for (const quote of localQuotes) {
    console.log("Seeding quote:", quote.text);
    await addDoc(collection(db, "quotes"), {
      ...quote,
      createdAt: serverTimestamp(),
    });
  }
};

// seedQuotes();
