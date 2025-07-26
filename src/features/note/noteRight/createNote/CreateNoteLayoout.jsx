import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import CreateNote from "./CreateNote";
import CreateNoteHeader from "./CreateNoteHeader";
import CreateNoteSubHeader from "./CreateNoteSubHeader";
import { LuX } from "react-icons/lu";
import { LuLoader } from "react-icons/lu";

export default function CreateNoteLayoout() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const actionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (actionData && !actionData.error && !isSubmitting) {
      setTitle("");
      setContent("");
    }
  }, [actionData, isSubmitting]);

  return (
    <div className="medium:mt-0 medium:overflow-hidden mt-7 h-screen">
      <Form method="post" className="flex flex-grow flex-col">
        <CreateNoteHeader
          isSubmitting={isSubmitting}
          title={title}
          content={content}
        />

        <main className="medium:h-[90vh] scroll-container h-[74vh] overflow-y-scroll">
          <CreateNoteSubHeader />

          {actionData?.error && (
            <div className="flex items-center text-sm text-red-600 dark:text-red-400">
              <LuX className="mr-1 h-4 w-4" />
              <span>{actionData.error}</span>
            </div>
          )}
          {isSubmitting && (
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400">
              <LuLoader className="mr-1 h-4 w-4 animate-spin" />
              <span>Saving note...</span>
            </div>
          )}

          <CreateNote
            title={title}
            content={content}
            onTitleChange={(e) => setTitle(e.target.value)}
            onContentChange={(e) => setContent(e.target.value)}
            disabled={isSubmitting}
          />
        </main>
      </Form>
    </div>
  );
}
