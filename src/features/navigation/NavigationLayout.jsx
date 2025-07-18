import Button from "../../ui/Button";

export default function NavigationLayout() {
  return (
    <div>
      <div className="">
        <Button
          variant="outline"
          className={`flex cursor-pointer flex-col gap-1.5 rounded text-2xl`}
        >
          <div className={`h-[3px] w-7 rounded-lg bg-stone-300`}></div>
          <div className={`h-[2.5px] w-5 rounded-lg bg-stone-300`}></div>
        </Button>
      </div>
    </div>
  );
}
