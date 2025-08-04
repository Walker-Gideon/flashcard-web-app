import { Save, XCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNote } from "../../context/NoteContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CreateNote from "./noteRight/createNote/CreateNote";

export default function NoteEditorPage() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user
  const {
    title,
    setTitle,
    content,
    setContent,
    isSubmittingNote,
    setIsSubmittingNote,
  } = useNote();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Manual form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    if (!user) {
      setError("You must be logged in to save notes.");
      return;
    }

    setIsSubmittingNote(true);

    try {
      // Use the saveNoteToFirebase function
      const savedNote = await saveNoteToFirebase({
        title: title.trim(),
        content: content.trim(),
        userId: user.uid,
      });

      console.log("Note saved successfully:", savedNote);
      setSuccess("Note saved successfully!");

      // Clear form after successful save
      setTimeout(() => {
        setTitle("");
        setContent("");
        setSuccess("");
        navigate("/dashboard/notes"); // Redirect to notes list
      }, 2000);
    } catch (err) {
      console.error("Error saving note:", err);
      setError(err.message || "Failed to save note. Please try again.");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  return (
    <div className="flex h-full flex-col p-4">
      <form onSubmit={handleSubmit} className="flex flex-grow flex-col">
        {/* Render the CreateNote component, passing props */}
        <CreateNote
          onTitleChange={(e) => setTitle(e.target.value)}
          onContentChange={(e) => setContent(e.target.value)}
          disabled={isSubmittingNote}
        />

        {/* Action Buttons and Feedback */}
        <div className="mt-4 flex items-center justify-between rounded-lg border-t border-gray-200 bg-white p-4 pt-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
          {/* Error Message */}
          {error && (
            <div className="flex items-center text-sm text-red-600 dark:text-red-400">
              <XCircle className="mr-1 h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <Save className="mr-1 h-4 w-4" />
              <span>{success}</span>
            </div>
          )}

          {/* Loading Message */}
          {isSubmittingNote && (
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
              <span>Saving note...</span>
            </div>
          )}

          {/* Spacer if no messages */}
          {!error && !success && !isSubmittingNote && <div></div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="ml-auto flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-800"
            disabled={isSubmittingNote || !title.trim() || !content.trim()}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmittingNote ? "Saving..." : "Save Note"}
          </button>
        </div>
      </form>
    </div>
  );
}
