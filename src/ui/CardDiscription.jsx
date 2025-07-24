export default function CardDiscription({
  textOne,
  textTwo,
  classOverall,
  classnameFirst,
  classnameSecond,
}) {
  return (
    <div className={` ${classOverall}`}>
      <p
        className={`${classnameFirst ? `${classnameFirst}` : `medium:text-xl text-lg font-bold text-slate-900 dark:text-white`}`}
      >
        {textOne}
      </p>
      <p
        className={`${classnameSecond ? `${classnameSecond}` : `medium:text-sm text-xs text-slate-500 dark:text-slate-400`}`}
      >
        {textTwo}
      </p>
    </div>
  );
}
