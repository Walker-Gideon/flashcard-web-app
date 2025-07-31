export default function MainContentImage({ image, index }) {
  return (
    <div
      className={`${index === 1 ? `md:order-1` : ``} ${index === 3 ? `md:order-1` : ``}`}
    >
      {/* <img src={image} alt="image" /> */}
      <div className="h-60 w-full rounded-2xl bg-slate-500"></div>
    </div>
  );
}
