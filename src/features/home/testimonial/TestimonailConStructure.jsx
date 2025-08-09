export default function TestimonailConStructure({ text, name, place }) {
  return (
    <div className="h-32">
      <div className="text-center text-sm font-medium md:text-base">
        <p>
          <span className="text-xl font-bold md:text-2xl">“</span>
          {text}
          <span className="text-xl font-bold md:text-2xl">”</span>
        </p>

        <p>
          — <span className="text-base font-semibold">{name}</span>.,{" "}
          <span className="text-sm md:text-base">{place}</span>
        </p>
      </div>
    </div>
  );
}
