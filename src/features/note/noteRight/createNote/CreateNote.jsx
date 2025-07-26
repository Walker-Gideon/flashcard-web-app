import Input from "../../../../ui/Input";

export default function CreateNote({
  title,
  content,
  onTitleChange,
  onContentChange,
  disabled,
}) {
  return (
    <div className="medium:h-[78vh] medium:overflow-y-hidden scroll-container mx-4 my-2 h-full overflow-y-scroll bg-red-50 py-2">
      <Input
        type="text"
        id="note-title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
        classname="w-full border-b border-stone-300 dark:border-slate-700 bg-transparent pb-2 text-xl font-bold text-slate-900 placeholder:text-gray-400 focus:outline-none medium:text-2xl dark:text-white dark:placeholder:text-gray-500"
        disabled={disabled}
      />

      {/* <textarea
        id=""
        className="medium:text-sm h-[77vh] w-full resize-none text-xs placeholder:text-[1.2rem] placeholder:font-medium focus:outline-none"
      >
        Title
      </textarea> */}

      <div className="mt-4 flex-grow">
        {" "}
        <textarea
          id="note-content"
          name="content" // Important for form submission
          placeholder="Start writing your note here..."
          value={content}
          onChange={onContentChange}
          className="h-screen w-full resize-none bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none md:text-base dark:text-white dark:placeholder:text-gray-400"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
