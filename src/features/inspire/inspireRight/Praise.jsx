import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { LuAward } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";

export default function Praise() {
  const [praises, setPraises] = useState([]);
  const [currentPraiseIndex, setCurrentPraiseIndex] = useState(0);

  useEffect(() => {
    const praiseRef = collection(db, "praise");

    const unsubscribe = onSnapshot(praiseRef, (snapshot) => {
      const fetchedPraise = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPraises(fetchedPraise);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (praises.length === 0) return;

    const quoteTimer = setInterval(() => {
      setCurrentPraiseIndex((prevIndex) => (prevIndex + 1) % praises.length);
    }, 10000);

    return () => clearInterval(quoteTimer);
  }, [praises]);

  const currentPraise = praises[currentPraiseIndex];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 p-6 shadow-lg dark:from-slate-600 dark:to-slate-700">
      <div className="mb-4 flex items-center space-x-3">
        <LuAward className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Your Encouragement</HeaderText>
      </div>
      {currentPraise ? (
        <p className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
          "{currentPraise.text}"
        </p>
      ) : (
        <div className="italic dark:text-slate-400">Loading praise...</div>
      )}
      <p className="text-right text-sm text-slate-900 dark:text-white">
        - WalkWise AI
      </p>
    </div>
  );
}
