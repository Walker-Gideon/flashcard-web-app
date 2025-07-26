import { redirect } from "react-router-dom";

export async function noteAction({ request }) {
  const formData = await request.formData();
  const title = formData.get("title")?.trim();
  const content = formData.get("content")?.trim();

  // Basic validation
  if (!title || !content) {
    return { error: "Title and content cannot be empty." };
  }

  // Simulate API call to save the note
  console.log("Saving note:", { title, content });
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  // In a real app, you'd send this to your database
  // e.g., const response = await fetch('/api/notes', { method: 'POST', body: JSON.stringify({ title, content }) });
  // if (!response.ok) throw new Error('Failed to save note');

  console.log("Note saved successfully!");
  return redirect("/dashboard/notes"); // Redirect to notes list or dashboard
}
