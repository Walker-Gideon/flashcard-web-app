import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { LuAward } from "react-icons/lu";
import HeaderText from "../../../ui/HeaderText";
import { useGen } from "../../../context/GeneralContext";

export default function Praise() {
  const { progress } = useGen();
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

  const fillTemplate = (template, data) => {
    let isValid = true;

    const filled = template.replace(/{(\w+)}/g, (_, key) => {
      if (data[key] === undefined || data[key] === null) {
        isValid = false;
        return ""; // Or leave as-is to debug
      }
      return data[key];
    });

    return isValid ? filled : null;
  };

  const getTopSubject = () => {
    const entries = Object.entries(progress?.subjectMastery || {});
    if (entries.length === 0) return null;
    return entries.sort((a, b) => b[1] - a[1])[0][0];
  };

  const getStudyMinutesToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return progress?.studyLogs?.[today] || null;
  };

  const placeholderData = {
    ...progress,
    topSubject: getTopSubject(),
    studyMinutesToday: getStudyMinutesToday(),
  };

  let displayedPraise = null;
  let attempts = 0;

  while (!displayedPraise && attempts < praises.length) {
    const rawPraise = praises[(currentPraiseIndex + attempts) % praises.length];
    const filled = fillTemplate(rawPraise.text, placeholderData);
    if (filled) displayedPraise = filled;
    else attempts++;
  }

  const currentPraise = praises[currentPraiseIndex];

  return (
    <div className="rounded-2xl bg-gradient-to-r from-slate-200 to-slate-300 p-6 shadow-lg dark:from-slate-600 dark:to-slate-700">
      <div className="mb-4 flex items-center space-x-3">
        <LuAward className="h-6 w-6 text-slate-600 dark:text-slate-300" />
        <HeaderText>Your Encouragement</HeaderText>
      </div>
      {currentPraise ? (
        <p className="mb-4 text-lg text-slate-500 italic dark:text-slate-400">
          {displayedPraise ? `"${displayedPraise}"` : "Loading praise..."}
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
