export default function MainContentImage({ image, index }) {
  return (
    <div
      className={`object-cover ${index === 1 ? `md:order-1` : ``} ${index === 3 ? `md:order-1` : ``}`}
    >
      <img
        src={image}
        alt="image"
        className="h-80 w-full rounded-2xl object-scale-down shadow-md shadow-slate-600"
      />
    </div>
  );
}
