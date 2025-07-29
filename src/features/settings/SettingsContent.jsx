import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Button from "../../ui/Button";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import User from "../user/User";
import SettlingsFormHeader from "./SettlingsFormHeader";

export default function SettingsContent() {
  const [placeholder, setPlaceholder] = useState("Enter username");
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const db = getFirestore();
  const auth = getAuth();

  console.log(newUsername);

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.username) {
          setPlaceholder(data.username);
        }
      }
    };

    fetchUsername();
  }, [auth.currentUser, db]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user || newUsername.trim() === "") return;

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { username: newUsername });
      setMessage("Username updated successfully!");
      setPlaceholder(newUsername);
      setNewUsername("");
    } catch (error) {
      console.error("Error updating username:", error);
      setMessage("Error updating username");
    }
  };

  const styling = {
    label: `flex flex-col gap-1 text-xs font-medium text-slate-900 dark:text-white`,
    input: "w-full text-slate-900 dark:text-white",
  };

  return (
    <div className="medium:w-140 medium:mt-8 mt-0 w-auto lg:w-160">
      <CardOverview>
        <SettlingsFormHeader />

        <div className="medium:my-10 my-8 flex w-full items-center justify-center">
          <User
            classname={"w-20 h-20 medium:w-30 medium:h-30"}
            icon={"w-10 h-10"}
          />
        </div>

        <div className="">
          {message && <p className="mb-2 text-green-600">{message}</p>}

          <div className={`mb-4 ${styling.label}`}>
            <label htmlFor="name">Display Name</label>
            <Input
              type="text"
              name="username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder={placeholder}
              classname={styling.input}
            />
          </div>

          <div className={styling.label}>
            <label htmlFor="name">Email</label>
            <input
              className={`rounded-sm border border-stone-300 px-1.5 py-1.5 text-sm text-black transition-all duration-300 placeholder:text-xs focus:outline-hidden disabled:cursor-not-allowed disabled:bg-gray-200 dark:disabled:bg-gray-500 ${styling.input}`}
              disabled={true}
              placeholder={"user@gmail.com"}
            />
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Email cannot be changed. Contact support if needed.
          </p>
        </div>

        <div className="mt-4 flex items-end justify-end">
          <Button
            variant="primary"
            classname={"flex items-center gap-2 justify-center py-2 border-0"}
            color={
              "bg-slate-500 text-white hover:bg-slate-600 focus:ring-slate-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            }
            onClick={handleUpdate}
          >
            Save Changes
          </Button>
        </div>
      </CardOverview>
    </div>
  );
}
