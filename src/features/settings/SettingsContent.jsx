import { useEffect, useRef, useState } from "react";

import Button from "../../ui/Button";
import CardOverview from "../../ui/CardOverview";
import Input from "../../ui/Input";
import User from "../user/User";
import SettlingsFormHeader from "./SettlingsFormHeader";
import { useLoader } from "../../context/LoaderContext";
import { useAuth } from "../../context/AuthContext";

export default function SettingsContent() {
  const { setImage } = useLoader();
  const { userData, updateUsername, updateProfileImage } = useAuth();
  const [placeholder, setPlaceholder] = useState("Enter username");
  const [message, setMessage] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef();

  useEffect(() => {
    // Set placeholder from userData
    if (userData.username) {
      setPlaceholder(userData.username);
    }
  }, [userData.username]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleUpdate = async () => {
    if (!userData.uid || newUsername.trim() === "") return;

    try {
      const success = await updateUsername(newUsername);
      if (success) {
        setMessage("Username updated successfully!");
        setPlaceholder(newUsername);
        setNewUsername("");
      } else {
        setMessage("Error updating username");
      }
    } catch (error) {
      console.error("Error updating username:", error);
      setMessage("Error updating username");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    // Here you would typically upload the image to storage and get the URL
    // For now, we'll use a placeholder URL
    // In a real implementation, you'd upload to Firebase Storage and get the download URL
    const imageUrl = URL.createObjectURL(file);

    try {
      await updateProfileImage(imageUrl);
      setMessage("Profile image updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      setMessage("Error updating profile image");
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

        {message && <p className="mb-2 text-green-600">{message}</p>}

        <div className="medium:my-10 my-8 flex w-full items-center justify-center">
          <label className="cursor-pointer">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className={`medium:w-30 medium:h-30 h-20 w-20 rounded-full object-cover`}
              />
            ) : userData.photoURL ? (
              <img
                src={userData.photoURL}
                alt="profile"
                className={`medium:w-30 medium:h-30 h-20 w-20 rounded-full object-cover`}
              />
            ) : (
              <User
                classname={"w-20 h-20 medium:w-30 medium:h-30"}
                icon={"w-10 h-10"}
              />
            )}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
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
              placeholder={userData.email || "user@gmail.com"}
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
