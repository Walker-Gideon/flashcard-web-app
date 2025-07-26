import Input from "../../../../ui/Input";

export default function CreateNote({
  title,
  content,
  onTitleChange,
  onContentChange,
  disabled,
}) {
  return (
    // medium:h-[78vh] medium:overflow-y-hidden scroll-container   overflow-y-scroll bg-red-50
    <div className="smallest:bg-pink-400 mx-4 my-2 h-full py-2 sm:bg-yellow-200">
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

      {/* medium:h-98 h-80 */}
      <div className="mt-4 h-full flex-grow">
        <textarea
          id="note-content"
          name="content"
          placeholder="Start writing your note here..."
          value={content}
          onChange={onContentChange}
          //   scroll-container medium:h-100 bg-transparent
          className="scroll-container h-full w-full resize-none bg-green-200 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none md:text-base dark:text-white dark:placeholder:text-gray-400"
          disabled={disabled}
        />
      </div>
    </div>
  );
}
