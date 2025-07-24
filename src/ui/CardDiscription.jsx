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
        className={`${classnameFirst ? `${classnameFirst}` : `text-2xl font-bold text-slate-900 dark:text-white`}`}
      >
        {textOne}
      </p>
      <p
        className={`${classnameSecond ? `${classnameSecond}` : `text-sm text-slate-500 dark:text-slate-400`}`}
      >
        {textTwo}
      </p>
    </div>
  );
}
