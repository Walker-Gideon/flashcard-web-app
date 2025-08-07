import Toast from "./Toast";
import Input from "./Input";
import Button from "./Button";

export default function Model({
  value,
  onChange,
  name,
  type,
  placeholder,
  btnFirstText,
  btnSecondText,
  onClickFirst,
  onClickSecond,
  btnClass,
  animation,
  required,
}) {
  return (
    <Toast
      model={true}
      animation={animation}
      classname={"flex items-center justify-center flex-col"}
    >
      <div className="medium:max-w-md mt-10 w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-800">
        <Input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          classname={
            "w-full placeholder:text-slate-900  dark:placeholder:text-white dark: dark:text-white"
          }
        />

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
            classname={"primaryButton px-6 medium:px-8"}
            onClick={onClickSecond}
          >
            {btnSecondText}
          </Button>
        </div>
      </div>
    </Toast>
  );
}
