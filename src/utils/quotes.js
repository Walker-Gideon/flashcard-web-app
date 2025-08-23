import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const personalizedPraise = [
  `You're on a {streakCount}-day streak! Your consistency is unmatched.`,
  `{streakCount} days of learning in a row — you're unstoppable.`,
  `That {streakCount}-day streak shows your true commitment.`,
  `One more day and you'll hit a new streak record! Stay focused.`,
  `Early bird alert! Studying before 8AM shows real dedication.`,
  `Burning the midnight oil? Night owls like you thrive in silence.`,
  `Studying late into the night — your effort won’t go unnoticed.`,
  `Morning sessions are tough, but you're making them look easy.`,
  `You've mastered {masteredFlashcards} flashcards — your memory is sharp.`,
  `{masteredFlashcards} cards down, so many concepts conquered.`,
  `Every flashcard you master brings you closer to your goal.`,
  `Flashcard mastery is your superpower — keep it up.`,
  `You've achieved 90% mastery in "{topSubject}" — excellent progress.`,
  `Your progress in "{topSubject}" is exceptional. Keep dominating.`,
  `"{topSubject}" is clearly your strongest subject — impressive work.`,
  `You're turning "{topSubject}" into your specialty.`,
  `You're {consistencyScore}% consistent this week — that's real discipline.`,
  `You've studied 5 out of 7 days — you're making it a true habit.`,
  `Your study rhythm is strong — this kind of consistency leads to success.`,
  `Weekly progress like this builds long-term achievement.`,
  `You studied {studyMinutesToday} minutes today — that's strong focus.`,
  `You've studied over an hour today — great concentration.`,
  `Every minute counts, and today’s session proved that.`,
  `Your study time today shows real dedication.`,
  `Your "{largestDeck}" deck has the most cards — impressive effort.`,
  `The "{largestDeck}" set is growing fast. Keep going.`,
  `Your biggest deck shows real dedication to that topic.`,
  `Every session makes you better — today was no exception.`,
  `Logging in and learning is how progress is made.`,
  `Your journey is inspiring. Small steps add up to big results.`,
  `You're building a powerful habit, and it shows in your progress.`,
  `Stay consistent. Your future self will thank you.`,
];

export const seedQuotes = async () => {
  for (const praise of personalizedPraise) {
    console.log("Seeding praise:", praise);
    await addDoc(collection(db, "praise"), {
      text: praise,
      createdAt: serverTimestamp(),
    });
  }
};
