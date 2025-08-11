import Button from "./Button";
import Toast from "./Toast";

export default function Notify({
  classname,
  btnClass,
  btnFirstText,
  onClickFirst,
  btnSecondText,
  onClickSecond,
  message,
  animation,
}) {
  return (
    <Toast
      top="top-50 medium:top-10"
      animation={animation}
      duration={0.7}
      notify={true}
      classname={classname}
    >
      <div className="">
        <h1 className={``}>{message}</h1>

        <div className="mt-4 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            classname={`button px-5 medium:px-7 text-[0.8rem] py-[7px]  ${btnClass ? `${btnClass}` : `dark:text-white dark:border-stone-100 border-slate-400`}`}
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
      </div>
    </Toast>
  );
}
