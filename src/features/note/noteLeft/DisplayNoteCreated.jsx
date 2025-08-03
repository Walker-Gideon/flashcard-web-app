export default function DisplayNoteCreated() {
  return (
    <div className="">
      <div
        role="button"
        className="my-1 flex w-full cursor-pointer items-center justify-between bg-amber-400 px-4 py-2"
      >
        <h1 className="medium:text-sm">Title</h1>

        <div className="medium:text-xs text-sm">
          <span>X</span> <span>days ago</span>
        </div>
      </div>
    </div>
  );
}
