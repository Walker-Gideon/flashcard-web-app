import Button from "./Button";
import Toast from "./Toast";

export default function Notify({
  classname,
  btnClass,
  btnFirstText,
  onClickFirst,
  btnSecondText,
  onClickSecond,
}) {
  return (
    <Toast notify={true} classname={classname}>
      <div className="mt-4 flex items-center justify-end gap-3">
        <Button
          variant="outline"
          classname={`button px-5 medium:px-7 text-[0.8rem] py-[7px] dark:text-white dark:border-stone-100 border-slate-400 ${btnClass}`}
          onClick={onClickFirst}
        >
          {btnFirstText}
        </Button>
        <Button
          variant="outline"
          classname={
            "primaryButton px-6 medium:px-8 disabled:bg-gray-400 disabled:cursor-not-allowed"
          }
          onClick={onClickSecond}
        >
          {btnSecondText}
        </Button>
      </div>
    </Toast>
  );
}
