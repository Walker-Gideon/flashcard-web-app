import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { useGen } from "../../../context/GeneralContext";
import { LuPlus } from "react-icons/lu";
import Button from "../../../ui/Button";
import SessionSelectTag from "./SessionSelectTag";
import SessionOptional from "./SessionOptional";
import SessionDate from "./SessionDate";
import SessionCardCount from "./SessionCardCount";

export default function SessionForm({ error, setError }) {
  const {
    setSessionModel,
    isSubmitting,
    formData,
    setFormData,
    setIsSubmitting,
  } = useGen();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const { tag, tagId, count, date, time, estimatedTime } = formData;

    // 1. Validation
    if (!tag || !tagId || !count || !date || !time) {
      setError("Please fill all required fields.");
      return;
    }

    // 2. Auto-calculate estimated time (if empty)
    const autoEstimatedTime = Math.ceil(Number(count) * 2);
    const finalTime = estimatedTime ? Number(estimatedTime) : autoEstimatedTime;

    // 3. Merge date and time into a JS Date
    const fullDateTime = new Date(`${date}T${time}`);
    const scheduleTimestamp = Timestamp.fromDate(fullDateTime);

    // 4. Prepare session data
    const sessionData = {
      tag: tag.trim(),
      tagId: tagId,
      count: Number(count),
      scheduledAt: scheduleTimestamp,
      estimatedTime: finalTime,
      createdAt: Timestamp.now(),
    };

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "users", user.uid, "schedules"), sessionData);

      // 5. Reset form and close modal
      setFormData({
        tag: "",
        tagId: "",
        count: "",
        date: "",
        time: "",
        estimatedTime: "",
      });
      setError("");

      setSessionModel(false);
    } catch (err) {
      console.error("Failed to add session:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {error && <p className="my-1 text-xs text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} method="POST" className="space-y-4">
        <SessionSelectTag />
        <SessionCardCount />
        <SessionDate />
        <SessionOptional />

        <div className="flex w-full justify-between space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setTimeout(() => {
                setSessionModel((show) => !show);
                setFormData({
                  tag: "",
                  tagId: "",
                  count: "",
                  date: "",
                  time: "",
                  estimatedTime: "",
                });
                setError("");
              }, 500)
            }
            classname="button dark:border-stone-300 border-slate-500 w-full dark:text-white disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            classname="primaryButton w-full flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Adding...
              </>
            ) : (
              <>
                <LuPlus className="mr-2 h-4 w-4" />
                Add Session
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
